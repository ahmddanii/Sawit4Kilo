import React from 'react';
import { AlertCircle, CheckCircle } from '@untitledui/icons';

const AlertBanner = ({ message, location, isDanger = true }) => {
  return (
    <div className={`border rounded-[10px] p-[16px_20px] mb-[18px] flex items-start justify-between gap-3 ${
      isDanger ? 'bg-[#FEF9F8] border-[#FDDDD6]' : 'bg-[#F0FDF4] border-[#BBF7D0]'
    }`}>
      <div className="flex gap-[12px] items-start">
        <div className={`w-[36px] h-[36px] rounded-[7px] flex items-center justify-center shrink-0 ${
          isDanger ? 'bg-[#FEE8E2]' : 'bg-[#DCFCE7]'
        }`}>
          {isDanger ? (
            <AlertCircle size={18} strokeWidth={2.5} className="text-[#C84B2F]" />
          ) : (
            <CheckCircle size={18} strokeWidth={2.5} className="text-[#166534]" />
          )}
        </div>
        <div>
          <div className={`text-[15px] font-semibold ${isDanger ? 'text-[#9B2617]' : 'text-[#166534]'}`}>
            {isDanger ? `Peringatan kritis: ${message} pada ` : 'Status normal: Kualitas air baik pada '}
            <span className={`underline cursor-pointer ${isDanger ? 'decoration-[#E8533A] text-[#E8533A]' : 'decoration-[#22C55E] text-[#22C55E]'}`}>
              {location}
            </span>
          </div>
          <div className={`text-[13px] mt-[4px] ${isDanger ? 'text-[#C84B2F]' : 'text-[#15803D]'}`}>
            <span className="font-medium">Insight:</span> {
              isDanger 
                ? 'Tingkat keasaman di luar ambang batas aman. Pompa penetralisasi disarankan segera diaktifkan.'
                : 'Semua parameter terpantau dalam rentang toleransi yang aman. Sistem beroperasi optimal.'
            }
          </div>
        </div>
      </div>
      {isDanger && (
        <button className="shrink-0 px-[16px] py-[8px] rounded-[7px] bg-[#E8533A] text-white text-[13px] font-medium cursor-pointer border-none whitespace-nowrap hover:bg-[#C84B2F] transition-colors">
          Ambil tindakan
        </button>
      )}
    </div>
  );
};

export default AlertBanner;
