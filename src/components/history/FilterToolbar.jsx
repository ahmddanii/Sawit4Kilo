import React from 'react';
import AcidityFilterDropdown from './AcidityFilterDropdown';
import ExportButton from './ExportButton';
import { FilterLines, SearchMd } from '@untitledui/icons';
import Button from '../ui/Button';

const FilterToolbar = ({
  dateFrom,
  dateTo,
  acidityFilter,
  onDateFromChange,
  onDateToChange,
  onAcidityChange,
  onApplyFilter,
  dataToExport
}) => {
  return (
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 w-full">
      {/* Left side: Filters grouped horizontally */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 mr-2">
          <FilterLines size={16} className="text-[#B9C8D7]" />
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest hidden sm:block">
            Filter Log
          </span>
        </div>

        <input
          id="filter-date-from"
          type="date"
          value={dateFrom}
          onChange={(e) => onDateFromChange(e.target.value)}
          className="h-10 px-3 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 outline-none shadow-sm transition-all focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 max-w-[140px]"
          title="Dari Tanggal"
        />

        <span className="text-slate-400 text-sm">—</span>

        <input
          id="filter-date-to"
          type="date"
          value={dateTo}
          onChange={(e) => onDateToChange(e.target.value)}
          className="h-10 px-3 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 outline-none shadow-sm transition-all focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 max-w-[140px]"
          title="Hingga Tanggal"
        />

        <div className="w-[160px]">
          <AcidityFilterDropdown value={acidityFilter} onChange={onAcidityChange} />
        </div>

        <Button
          id="filter-apply"
          variant="primary"
          iconLeading={<SearchMd />}
          onClick={onApplyFilter}
          className="h-10 !rounded-lg"
        >
          Cari
        </Button>
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center gap-3">
        <ExportButton
          variant="secondary"
          label="Unduh CSV"
          data={dataToExport}
          fileName={`kideco_amdal_${new Date().toISOString().slice(0, 10)}`}
        />
        <ExportButton
          variant="primary"
          label="Unduh Excel"
          data={dataToExport}
          fileName={`kideco_amdal_${new Date().toISOString().slice(0, 10)}`}
        />
      </div>
    </div>
  );
};

export default FilterToolbar;
