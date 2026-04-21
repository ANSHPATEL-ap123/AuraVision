import { Loader2 } from 'lucide-react';

export default function ProgressBar() {
  return (
    <div className="animate-slide-in-up w-full max-w-xl mb-6">
      <div className="glass-strong rounded-2xl p-6">
        {/* Status header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <Loader2 className="w-5 h-5 text-accent-light animate-spin" />
            <div className="absolute inset-0 w-5 h-5 rounded-full bg-accent/20 animate-ping" />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">
              ✨ Enhancing your image...
            </p>
            <p className="text-[11px] text-text-tertiary mt-0.5">
              This may take 15–60 seconds depending on image size
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="progress-bar-track h-2">
          <div className="progress-bar-fill progress-indeterminate h-2" />
        </div>
      </div>
    </div>
  );
}
