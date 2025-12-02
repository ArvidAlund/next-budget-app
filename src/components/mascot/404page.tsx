"use client";

import { useState } from "react";
import Image from "next/image";

export default function Mascot404Page() {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const canShowVideo = false;

  return (
    <div className="w-full h-full flex items-center justify-center fixed top-1/2 left-1/2 z-100 -translate-x-1/2 -translate-y-1/2 user-noselect pointer-events-none">
      {/* Bilden visas tills videon är redo */}
      {!isVideoReady && (
        <Image
          src="/mascot/img/confused.png"
          alt="Loading mascot"
          width={512}
          height={512}
          priority
        />
      )}

      {/* Videon laddas alltid men är osynlig tills den är redo */}
      {canShowVideo && (
        <video
            src="/mascot/video/confused.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={`object-contain mix-blend-multiply ${!isVideoReady ? "hidden" : "block"} aspect-video`}
            width={1024}
            onCanPlayThrough={() => setIsVideoReady(true)}
        />
      )}
      <div className="bg-neutral-700/30 blur-sm w-70 h-6 rounded-[100%] absolute top-[69%] left-[52%] -translate-y-1/2 -translate-x-1/2 -z-10"></div>
    </div>
  );
}
