import React, { memo } from 'react';
import { Circle } from '@untitledui/icons';

const StatusBar = memo(({ selectedNode, lastTimestamp, systemStatus }) => {
  const isDanger = systemStatus === 'BAHAYA';
  return (
    <div
      id="status-bar"
      className="h-[36px] bg-white border-t border-[#EAECF0] flex items-center justify-between px-6 shrink-0"
    >
      <div className="flex items-center gap-[5px] text-[11px] text-[#16A34A]">
        <Circle size={13} fill="currentColor" strokeWidth={0} className={isDanger ? 'text-[#E8533A]' : 'text-[#16A34A]'} />
        <span className="text-[#16A34A]">Node {selectedNode} terhubung · Tersinkronisasi · {lastTimestamp}</span>
      </div>
      <div className="text-[11px] text-[#9BA3AE]">
        Interval: 1 detik · ISA-101
      </div>
    </div>
  );
});

StatusBar.displayName = 'StatusBar';
export default StatusBar;
