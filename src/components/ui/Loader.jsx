export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 gap-6">
      <div className="flex gap-3 relative">
        {/* Glow effect background */}
        <div className="absolute inset-0 -m-4 bg-primary/20 blur-xl animate-pulse-glow rounded-full"></div>
        
        <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(255,78,141,0.5)] animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(255,78,141,0.5)] animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(255,78,141,0.5)] animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      {text && <p className="text-sm text-muted font-medium tracking-wide animate-pulse">{text}</p>}
    </div>
  );
}
