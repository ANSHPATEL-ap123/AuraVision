import React from 'react';

const Sidebar = ({ onEnhance, isLoading }) => {
  // We define these locally so they never come up as 'undefined'
  const upscaleFactors = [
    { label: '2x', scale: 2 },
    { label: '4x', scale: 4, best: true },
    { label: '8x', scale: 8 },
  ];

  return (
    <aside className="w-72 shrink-0 bg-bg-secondary border-r border-border flex flex-col h-full overflow-y-auto">
      <div className="p-6 flex flex-col gap-8">

        {/* Upscale Section */}
        <section>
          <label className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-4 block">
            Upscale Factor
          </label>
          <div className="grid grid-cols-3 gap-2">
            {upscaleFactors.map((factor) => (
              <button
                key={factor.scale}
                className={`py-2 text-sm rounded-lg border transition-all ${factor.scale === 4
                  ? 'bg-accent/10 border-accent text-accent'
                  : 'border-border hover:border-text-secondary text-text-secondary'
                  }`}
              >
                {factor.label}
                {factor.best && (
                  <span className="block text-[10px] font-bold uppercase mt-0.5">Best</span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Action Button */}
        <button
          onClick={onEnhance}
          disabled={isLoading}
          className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg ${isLoading
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] active:scale-[0.98]'
            }`}
        >
          {isLoading ? 'ENHANCING...' : '✨ ENHANCE IMAGE'}
        </button>

      </div>
    </aside>
  );
};

export default Sidebar;