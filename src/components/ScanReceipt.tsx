"use client"
import { useEffect, useRef, useState } from "react"
import { createWorker, type Worker } from "tesseract.js";
import { AnalyzeOCR } from "@/app/lib/analyzeOCR";

export function ScanReceipt({ onClose }: { onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [worker, setWorker] = useState<Worker | null>(null);
  const [isProcessing, setIsProcessing] = useState(false)
  const [cameraReady, setCameraReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const newWorker = await createWorker("swe")
        setWorker(newWorker)
      } catch (e) {
        console.error("Fel vid initiering av OCR worker:", e)
      }
    }

    init()

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { exact: "environment" },
            width: { ideal: 1280 },
            height: { ideal: 720 },
            aspectRatio: 9 / 16,
          },
        });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            setCameraReady(true);
            videoRef.current?.play();
          };
        }
      } catch (err) {
        console.error("Kunde inte öppna kameran", err);
      }
    };

    startCamera()

    return () => {
      stopCamera()
      if (worker) {
        worker.terminate()
      }
    }
  }, [worker])

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }

  const handleClose = () => {
    stopCamera()
    onClose()
  }

  const takePhoto = async () => {
    if (!videoRef.current || !worker || isProcessing) return

    setIsProcessing(true)

    const video = videoRef.current
    const canvas = document.createElement("canvas")
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const ctx = canvas.getContext("2d")
    if (!ctx) {
      console.error("❌ Kunde inte skapa canvas-kontext")
      setIsProcessing(false)
      return
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    const processImage = async (image: Blob | string) => {
      try {
        const {
          data: { text },
        } = await worker.recognize(image)

        console.log("📸 OCR-resultat:", text)
        await AnalyzeOCR(text)
      } catch (err) {
        console.error("❌ OCR-fel:", err)
      } finally {
        setIsProcessing(false)
        stopCamera()
        onClose()
      }
    }

    canvas.toBlob((blob) => {
      if (blob) {
        processImage(blob)
      } else {
        console.warn("⚠️ Blob kunde inte skapas, använder dataURL istället")
        const dataUrl = canvas.toDataURL("image/jpeg")
        processImage(dataUrl)
      }
    }, "image/jpeg")
  }

  return (
    <div className="fixed inset-0 bg-black z-50 px-4">
      <div className="fixed top-0 left-0 aspect-[9/16] w-full h-full overflow-hidden shadow-lg">
        {!cameraReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
            Startar kamera...
          </div>
        )}
        <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-opacity duration-500 ${cameraReady ? "opacity-100" : "opacity-0"}`}
          playsInline
          muted
          autoPlay
        />
      </div>

      <button
        className="fixed top-5 right-5 px-4 py-2 !bg-white text-black rounded z-60"
        onClick={handleClose}
      >
        Stäng
      </button>

      {!isProcessing && (
        <button
          className="fixed bottom-10 left-1/2 transform -translate-x-1/2 !bg-white w-15 aspect-square rounded-full border-4 !border-gray-300 !shadow-lg"
          onClick={takePhoto}
          aria-label="Ta bild"
        />
      )}

      {isProcessing && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 text-white font-semibold text-xl animate-pulse">
          Analyserar foto...
        </div>
      )}
    </div>
  )
}
