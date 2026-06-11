import React, { useState, useContext, useRef, useEffect } from 'react';
import { SensorContext } from '../../context/SensorContext';
import { VolumeMax, VolumeX, Loading01 } from '@untitledui/icons';

const AudioToggleSwitch = () => {
  const { audioToggleState, setAudioToggleState, systemStatus } = useContext(SensorContext);
  const [isMutating, setIsMutating] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/alarm.mp3');
    audioRef.current.loop = true;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    if (audioToggleState && systemStatus === 'BAHAYA') {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [audioToggleState, systemStatus]);

  const handleToggle = () => {
    if (isMutating) return;
    setIsMutating(true);
    setTimeout(() => {
      setAudioToggleState((prev) => !prev);
      setIsMutating(false);
    }, 800);
  };

  return (
    <div className="flex items-center justify-between mt-2 mb-2 w-full">
      <div className="flex items-center gap-2">
        <div className="w-[30px] h-[30px] rounded-[7px] bg-[#F7F8FA] border border-[#EAECF0] flex items-center justify-center shrink-0">
          {audioToggleState ? (
            <VolumeMax size={15} strokeWidth={2} className="text-[#B9C8D7]" />
          ) : (
            <VolumeX size={15} strokeWidth={2} className="text-[#B9C8D7]" />
          )}
        </div>
        <div>
          <div className="text-[13px] font-bold text-[#202020] leading-tight">Audio buzzer</div>
          <div className="text-[11px] font-normal text-[#B9C8D7] mt-[2px]">
            {isMutating ? 'Memproses...' : audioToggleState ? 'Aktif' : 'Nonaktif (muted)'}
          </div>
        </div>
      </div>

      {/* Toggle Button matching reference HTML */}
      <button
        onClick={handleToggle}
        disabled={isMutating}
        role="switch"
        aria-checked={audioToggleState}
        className={`
          w-[38px] h-[21px] rounded-[11px] relative shrink-0 transition-colors duration-200 outline-none
          ${isMutating ? 'opacity-70 cursor-wait' : 'cursor-pointer'}
          ${audioToggleState ? 'bg-[#16A34A]' : 'bg-[#E5E7EB]'}
        `}
      >
        <span
          className={`
            absolute top-[2px] left-[2px] w-[17px] h-[17px] rounded-full bg-white shadow-sm transition-transform duration-200 flex items-center justify-center
            ${audioToggleState ? 'translate-x-[17px]' : 'translate-x-0'}
          `}
        >
          {isMutating && <Loading01 size={10} className="animate-spin text-[#B9C8D7]" />}
        </span>
      </button>
    </div>
  );
};

export default AudioToggleSwitch;
