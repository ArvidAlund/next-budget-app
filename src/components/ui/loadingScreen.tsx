export default function LoadingScreen() {
  return (
    <div className="w-full h-dvh min-h-screen flex flex-col justify-center items-center bg-[#0B0748] text-white select-none">
      {/* Animated spinner */}
      <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin" />

      {/* Text */}
      <p className="mt-6 text-[clamp(1rem,2.5vw,2rem)] tracking-wide opacity-80">
        Laddar...
      </p>
    </div>
  );
}
