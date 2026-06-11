import React from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Check, ChevronDown } from '@untitledui/icons';

const acidityOptions = [
  { id: 'ALL',      name: 'Semua Status' },
  { id: 'ACIDIC',   name: 'Asam Kritis' },
  { id: 'NEUTRAL',  name: 'Normal' },
  { id: 'ALKALINE', name: 'Basa / Warning' },
];

const AcidityFilterDropdown = ({ value, onChange }) => {
  const selected = acidityOptions.find((opt) => opt.id === value) || acidityOptions[0];

  return (
    <div className="relative w-full z-10">
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer h-10 rounded-lg bg-white border border-slate-200 pl-3 pr-8 text-left shadow-sm outline-none transition-all focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 text-sm font-medium text-slate-700">
            <span className="block truncate">{selected.name}</span>
            <span className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none text-slate-400">
              <ChevronDown size={14} strokeWidth={2.5} aria-hidden="true" />
            </span>
          </Listbox.Button>

          <Transition
            as={React.Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white p-1 shadow-lg border border-slate-100 outline-none z-20">
              {acidityOptions.map((option) => (
                <Listbox.Option
                  key={option.id}
                  value={option.id}
                  className="list-none m-0 p-0"
                >
                  {({ active, selected }) => (
                    <li
                      className={`
                        relative cursor-pointer select-none pl-8 pr-4 py-2 rounded-md text-sm transition-colors duration-100
                        ${active ? 'bg-slate-50' : ''}
                        ${selected ? 'font-semibold text-slate-900' : 'font-medium text-slate-600'}
                      `}
                    >
                      <span className="block truncate">{option.name}</span>
                      {selected && (
                        <span className="absolute inset-y-0 left-2.5 flex items-center text-slate-900">
                          <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                        </span>
                      )}
                    </li>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default AcidityFilterDropdown;
