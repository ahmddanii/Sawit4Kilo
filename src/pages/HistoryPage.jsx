import React, { useContext, useState, useMemo, useCallback } from 'react';
import { SensorContext } from '../context/SensorContext';
import Header from '../components/layout/Header';
import FilterToolbar from '../components/history/FilterToolbar';
import LogDataTable from '../components/history/LogDataTable';
import TablePaginationControl from '../components/history/TablePaginationControl';
import { File02 } from '@untitledui/icons';
import Badge from '../components/ui/Badge';
import MaterialSedimentationChart from '../components/dashboard/MaterialSedimentationChart';
import CircadianRangeChart from '../components/dashboard/CircadianRangeChart';
import SweetSpotScatterChart from '../components/dashboard/SweetSpotScatterChart';

const ITEMS_PER_PAGE = 15;

const HistoryPage = () => {
  const { historyData, systemStatus } = useContext(SensorContext);

  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [acidityFilter, setAcidityFilter] = useState('ALL');

  const [appliedFilters, setAppliedFilters] = useState({
    dateFrom: '',
    dateTo: '',
    acidity: 'ALL',
  });

  const [currentPage, setCurrentPage] = useState(0);

  const handleApplyFilter = useCallback(() => {
    setAppliedFilters({ dateFrom, dateTo, acidity: acidityFilter });
    setCurrentPage(0);
  }, [dateFrom, dateTo, acidityFilter]);

  const [exportMsg, setExportMsg] = useState('');
  const showExportMsg = (format) => {
    setExportMsg(`Berhasil mengekspor data laporan format .${format.toUpperCase()}`);
    setTimeout(() => setExportMsg(''), 4000);
  };

  const filteredData = useMemo(() => {
    return historyData.filter((row) => {
      if (appliedFilters.acidity === 'ACIDIC' && row.status !== 'ASAM') return false;
      if (appliedFilters.acidity === 'NEUTRAL' && row.status !== 'AMAN') return false;
      if (appliedFilters.acidity === 'ALKALINE' && row.ph >= 4.5 && row.ph <= 9.0 && row.tds <= 800) return false;

      if (appliedFilters.dateFrom) {
        if (row.timestamp.slice(0, 10) < appliedFilters.dateFrom) return false;
      }
      if (appliedFilters.dateTo) {
        if (row.timestamp.slice(0, 10) > appliedFilters.dateTo) return false;
      }

      return true;
    });
  }, [historyData, appliedFilters]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <div className="flex flex-col h-full bg-[var(--color-canvas)] overflow-hidden">
      {/* ── Header ── */}
      <Header
        title="Histori Data & Analisis AMDAL"
        subtitle="Query, filter, dan ekspor data sensor untuk keperluan pelaporan lingkungan tambang"
        icon={File02}
        systemStatus={systemStatus}
      />

      {/* Scrollable Content with padding 8 (Negative Space Control) */}
      <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6">
        
        {/* Filter Bar */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5">
          <FilterToolbar
            dateFrom={dateFrom}
            dateTo={dateTo}
            acidityFilter={acidityFilter}
            onDateFromChange={setDateFrom}
            onDateToChange={setDateTo}
            onAcidityChange={setAcidityFilter}
            onApplyFilter={handleApplyFilter}
            dataToExport={filteredData}
          />
        </div>

        {/* Info Row */}
        <div className="flex items-center justify-between px-1">
          <span className="text-sm text-slate-500 font-medium">
            Menampilkan <span className="font-bold text-slate-900">{filteredData.length}</span> entri
            {appliedFilters.acidity !== 'ALL' && (
              <Badge variant="primary" className="ml-2">
                Filter: {appliedFilters.acidity}
              </Badge>
            )}
          </span>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4">
             <MaterialSedimentationChart />
          </div>
          <div className="col-span-12 lg:col-span-4">
             <CircadianRangeChart />
          </div>
          <div className="col-span-12 lg:col-span-4">
             <SweetSpotScatterChart />
          </div>
        </div>

        {/* Table & Pagination Wrapper with max-h */}
        <div className="flex flex-col bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden max-h-[600px]">
          <div className="flex-1 overflow-auto">
            <LogDataTable data={paginatedData} />
          </div>
          {filteredData.length > 0 && (
            <div className="shrink-0 border-t border-slate-100">
              <TablePaginationControl
                totalLogs={filteredData.length}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
