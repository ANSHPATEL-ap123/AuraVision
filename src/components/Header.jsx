import { Sparkles } from 'lucide-react';

// Using the new branding: AuraVision
export default function Header({ isOnline }) {

  return (
    <header className="flex items-center gap-3 px-6 py-4 border-b border-border">
      <div className="flex items-center gap-3">
        {/* Logo mark */}
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 glow-accent">
          <Sparkles className="w-5 h-5 text-accent-light" />
        </div>

        <div>
          <h1 className="text-lg font-bold tracking-tight text-text-primary">
            Aura
            <span className="text-accent-light glow-text">Vision</span>
          </h1>
          <p className="text-[11px] font-medium text-text-tertiary tracking-wide uppercase">
            AI-Powered Image Enhancement
          </p>
        </div>
      </div>

      {/* Status pill */}
      <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-tertiary border border-border text-xs text-text-secondary">
        {/* Success green if online, Red if offline */}
        <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]' : 'bg-red-500'}`} />
        {isOnline ? 'System Online' : 'Offline'}
      </div>
    </header>
  );
}