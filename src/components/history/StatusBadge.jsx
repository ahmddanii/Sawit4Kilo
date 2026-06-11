import React, { memo } from 'react';

const StatusBadge = memo(({ status, className = '' }) => {
  let badgeClasses = 'bg-[#F5F5F5] text-[#B9C8D7] border border-[#B9C8D7]/30';
  let label = status;

  if (status === 'AMAN') {
    badgeClasses = 'bg-[#DCFCE7] text-[#166534]';
    label = 'Aman';
  } else if (status === 'ASAM' || status === 'BAHAYA' || status === 'KRITIS') {
    badgeClasses = 'bg-[#FF4628]/10 text-[#FF4628]';
    label = 'Bahaya';
  } else if (status === 'BASA' || status === 'WARNING') {
    badgeClasses = 'bg-[#FEF3C7] text-[#92400E]';
    label = 'Warning';
  } else if (status === 'ONLINE') {
    badgeClasses = 'bg-[#DCFCE7] text-[#166534]';
    label = 'Online';
  } else if (status === 'OFFLINE') {
    badgeClasses = 'bg-[#F5F5F5] text-[#B9C8D7] border border-[#B9C8D7]/30';
    label = 'Offline';
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-[20px] text-[10px] font-bold ${badgeClasses} ${className}`}
    >
      {label}
    </span>
  );
});

StatusBadge.displayName = 'StatusBadge';
export default StatusBadge;
