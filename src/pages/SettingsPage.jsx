import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { SensorContext } from '../context/SensorContext';
import { Settings01, User01, Server03, VolumeMax, Sliders01, Bell01, AlertCircle, X } from '@untitledui/icons';
import ProfileSettings from '../components/settings/ProfileSettings';
import ESP32Settings from '../components/settings/ESP32Settings';
import AudioSettings from '../components/settings/AudioSettings';
import ThresholdSettings from '../components/settings/ThresholdSettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import AboutSettings from '../components/settings/AboutSettings';
import DeveloperSettings from '../components/settings/DeveloperSettings';

const tabs = [
  { id: 'profile', label: 'Profil', icon: User01, group: 'PROFIL' },
  { id: 'esp32', label: 'Pengaturan ESP32', icon: Server03, group: 'PERANGKAT' },
  { id: 'audio', label: 'Audio & Alarm', icon: VolumeMax, group: 'PERANGKAT' },
  { id: 'threshold', label: 'Threshold', icon: Sliders01, group: 'PERANGKAT' },
  { id: 'notification', label: 'Notifikasi', icon: Bell01, group: 'SISTEM' },
  { id: 'about', label: 'Tentang', icon: AlertCircle, group: 'SISTEM' },
  { id: 'developer', label: 'Developer', icon: User01, group: 'LAINNYA' },
];

const SettingsPage = ({ isOpen, onClose }) => {
  const { systemStatus } = useContext(SensorContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setIsVisible(true));
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) handleClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsVisible(false);
      onClose();
    }, 200);
  };

  if (!isOpen && !isClosing) return null;

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'esp32':
        return <ESP32Settings />;
      case 'audio':
        return <AudioSettings />;
      case 'threshold':
        return <ThresholdSettings />;
      case 'notification':
        return <NotificationSettings />;
      case 'about':
        return <AboutSettings />;
      case 'developer':
        return <DeveloperSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  const groupedTabs = tabs.reduce((acc, tab) => {
    if (!acc[tab.group]) acc[tab.group] = [];
    acc[tab.group].push(tab);
    return acc;
  }, {});

  const opacity = isClosing ? 'opacity-0' : 'opacity-100';
  const scale = isClosing ? 'scale-95' : 'scale-100';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${opacity}`}
        onClick={handleClose}
      />

      <div className={`relative w-full max-w-[900px] h-[90vh] md:h-[85vh] bg-white rounded-[16px] border border-[#EAECF0] shadow-xl flex flex-col md:flex-row overflow-hidden transition-all duration-200 ${opacity} ${scale}`}>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-[32px] h-[32px] rounded-[8px] bg-[#F7F8FA] border border-[#EAECF0] flex items-center justify-center cursor-pointer hover:bg-[#F5F5F5] transition-colors"
        >
          <X size={16} strokeWidth={2} className="text-[#8C9BAF]" />
        </button>

        {/* Mobile View: Dropdown Header */}
        <div className="md:hidden border-b border-[#EAECF0] p-5 bg-white shrink-0 flex flex-col gap-3">
          <div className="flex items-center gap-2 pr-8 mb-1">
            <Settings01 size={18} strokeWidth={2} className="text-[#09090B]" />
            <span className="text-[15px] font-bold text-[#09090B]">Pengaturan</span>
          </div>
          <div className="relative w-full z-50">
            <Listbox value={activeTab} onChange={setActiveTab}>
              <div className="relative mt-1">
                <Listbox.Button className="flex h-10 w-full items-center justify-between rounded-md border border-[#E4E4E7] bg-white px-3 py-2 text-sm font-medium text-[#09090B] ring-offset-white focus:outline-none focus:ring-2 focus:ring-[#18181B] focus:ring-offset-2 cursor-pointer shadow-sm">
                  <span className="block truncate">
                    {tabs.find(t => t.id === activeTab)?.label}
                  </span>
                  <span className="pointer-events-none flex items-center opacity-50">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#09090B]">
                      <path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819L7.43179 8.56819C7.60753 8.74393 7.89245 8.74393 8.06819 8.56819L10.5682 6.06819C10.7439 5.89245 10.7439 5.60753 10.5682 5.43179C10.3924 5.25605 10.1075 5.25605 9.93179 5.43179L7.75 7.61358L5.56819 5.43179C5.39245 5.25605 5.10753 5.25605 4.93179 5.43179Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-[60] mt-1 max-h-[50vh] w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-md border border-[#E4E4E7] focus:outline-none">
                    {Object.entries(groupedTabs).map(([group, items], groupIdx) => (
                      <div key={group}>
                        {groupIdx > 0 && <div className="h-px bg-[#F4F4F5] my-1 mx-2" />}
                        <div className="px-8 py-1.5 text-xs font-semibold text-[#71717A]">
                          {group}
                        </div>
                        {items.map((tab) => (
                          <Listbox.Option
                            key={tab.id}
                            className={({ active }) =>
                              `relative cursor-default select-none py-1.5 pl-8 pr-2 outline-none rounded-sm mx-1 ${
                                active ? 'bg-[#F4F4F5] text-[#09090B]' : 'text-[#09090B]'
                              }`
                            }
                            value={tab.id}
                          >
                            {({ selected }) => (
                              <>
                                <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                  {tab.label}
                                </span>
                                {selected ? (
                                  <span className="absolute left-2 top-0 bottom-0 flex items-center justify-center">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                                      <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59193L7.39799 11.0919C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90812C10.7907 3.61927 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                    </svg>
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </div>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>

        {/* Desktop View: Sidebar */}
        <div className="hidden md:flex w-[240px] shrink-0 border-r border-[#EAECF0] p-4 overflow-y-auto flex-col">
          <div className="flex items-center gap-2 mb-6 px-3">
            <Settings01 size={18} strokeWidth={2} className="text-[#202020]" />
            <span className="text-[15px] font-bold text-[#202020]">Pengaturan</span>
          </div>

          {Object.entries(groupedTabs).map(([group, items]) => (
            <div key={group} className="mb-4">
              <div className="text-[10px] font-bold tracking-[0.07em] uppercase text-[#B9C8D7] px-3 mb-2">
                {group}
              </div>
              <div className="flex flex-col gap-1">
                {items.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        w-full flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-[13px] transition-all duration-150 text-left
                        ${isActive
                          ? 'bg-[#F5F5F5] text-[#202020] font-bold'
                          : 'text-[#8C9BAF] font-medium hover:bg-[#F7F8FA] hover:text-[#202020]'}
                      `}
                    >
                      <Icon size={16} strokeWidth={2} className={isActive ? 'text-[#202020]' : 'text-[#B9C8D7]'} />
                      {tab.label}
                      {isActive && (
                        <svg className="w-4 h-4 ml-auto text-[#202020]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
