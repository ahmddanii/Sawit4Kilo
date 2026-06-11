import React, { memo } from 'react';
import { Bell01, ChevronDown, AlertTriangle, CheckCircle, Circle } from '@untitledui/icons';

const Header = memo(({
  // Dashboard-specific props
  selectedNode,
  onNodeChange,
  systemStatus,
  userName = 'Admin',
  // Per-page customization props
  title,
  subtitle,
  icon: Icon,
  // Show/hide sections
  showNodeSelector = false,
  showStatusBadge = true,
}) => {
  const isDanger = systemStatus === 'BAHAYA';

  // Default: greeting mode (Dashboard)
  const isGreetingMode = !title;

  return (
    <header
      id="header-bar"
      className="bg-white border-b border-[#B9C8D7]/30 flex items-center justify-between px-8 py-5 shrink-0"
    >
      {/* ── Left: Page Title / Greeting ── */}
      <div className="flex items-center gap-3">
        {/* Icon (shown when title prop is given) */}
        {Icon && (
          <div className="w-9 h-9 rounded-xl bg-[#F5F5F5] border border-[#B9C8D7]/40 flex items-center justify-center shrink-0">
            <Icon size={18} strokeWidth={2} className="text-[#202020]" />
          </div>
        )}

        <div className="flex flex-col justify-center">
          {isGreetingMode ? (
            <>
              <h2 className="text-[16px] font-bold text-[#202020] leading-tight">
                Welcome back, {userName?.split(' ')[0] || 'Admin'}!
              </h2>
              <p className="text-[13px] font-normal text-[#B9C8D7] mt-1 leading-tight">
                Monitoring KIDECO Mining Water Quality
              </p>
            </>
          ) : (
            <>
              <h1 className="text-[16px] font-bold text-[#202020] leading-tight tracking-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="text-[13px] font-normal text-[#B9C8D7] mt-1 leading-tight">
                  {subtitle}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* ── Right: Actions ── */}
      <div className="flex items-center gap-3">

        {/* Status Badge */}
        {showStatusBadge && systemStatus && (
          <div
            className={`
              flex items-center gap-[6px] px-[12px] py-[6px] rounded-[20px] border text-[12px] font-bold
              ${isDanger
                ? 'bg-[#FF4628]/10 border-[#FF4628]/20 text-[#FF4628]'
                : 'bg-[#B9C8D7]/10 border-[#B9C8D7]/30 text-[#202020]'}
            `}
          >
            {isDanger ? (
              <AlertTriangle size={14} strokeWidth={2} />
            ) : (
              <CheckCircle size={14} strokeWidth={2} />
            )}
            {isDanger && (
              <div className="w-[6px] h-[6px] rounded-full bg-[#FF4628] animate-ping ml-[2px]" />
            )}
            {isDanger ? 'Bahaya — Air Asam' : 'Aman — Normal'}
          </div>
        )}

        {/* Node Selector (Dashboard only) */}
        {showNodeSelector && (
          <div className="relative flex items-center h-[36px]">
            <div className="absolute left-[12px] pointer-events-none text-[#B9C8D7] flex items-center">
              <Circle size={10} fill="currentColor" strokeWidth={0} />
            </div>
            <select
              id="node-selector"
              value={selectedNode}
              onChange={(e) => onNodeChange(e.target.value)}
              className="appearance-none bg-white border border-[#B9C8D7]/40 rounded-[8px] h-full pl-[30px] pr-[32px] text-[12px] font-normal text-[#202020] cursor-pointer outline-none transition-all focus:border-[#FF4628] hover:bg-[#F5F5F5]"
            >
              <option value="KDC01">KDC01 — Kolam Pengendap 1</option>
              <option value="KDC02">KDC02 — Kolam Pengendap 2</option>
            </select>
            <div className="absolute right-[12px] pointer-events-none text-[#B9C8D7] flex items-center">
              <ChevronDown size={15} strokeWidth={2} />
            </div>
          </div>
        )}

        {/* Bell Icon Button */}
        <button
          className="w-[36px] h-[36px] rounded-[8px] bg-white border border-[#B9C8D7]/40 flex items-center justify-center cursor-pointer relative text-[#B9C8D7] transition-colors hover:bg-[#F5F5F5]"
        >
          <Bell01 size={18} strokeWidth={1.5} />
          {isDanger && (
            <span className="absolute top-[8px] right-[8px] w-[5px] h-[5px] bg-[#FF4628] rounded-full" />
          )}
        </button>
      </div>
    </header>
  );
});

Header.displayName = 'Header';
export default Header;
