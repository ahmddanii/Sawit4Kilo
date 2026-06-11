import React from 'react';
import StatusBadge from './StatusBadge';

const LogDataTable = ({ data }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse" style={{ tableLayout: 'fixed' }}>
          <thead>
            <tr className="bg-gray-50/70 border-b border-gray-100">
              <th className="w-12 px-6 py-3 text-xs font-bold tracking-widest uppercase text-gray-400">No</th>
              <th className="w-24 px-6 py-3 text-xs font-bold tracking-widest uppercase text-gray-400">ID Node</th>
              <th className="px-6 py-3 text-xs font-bold tracking-widest uppercase text-gray-400">Waktu</th>
              <th className="w-24 px-6 py-3 text-xs font-bold tracking-widest uppercase text-gray-400">pH</th>
              <th className="w-28 px-6 py-3 text-xs font-bold tracking-widest uppercase text-gray-400">TDS</th>
              <th className="w-32 px-6 py-3 text-xs font-bold tracking-widest uppercase text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((row, index) => {
              const isPhDanger = row.ph < 4.5 || row.ph > 9.0;
              const isTdsDanger = row.tds > 800;
              const isRowDanger = row.status !== 'AMAN';

              return (
                <tr
                  key={row.id || index}
                  className={`transition-colors duration-100 hover:bg-gray-50/70 cursor-default ${isRowDanger ? 'bg-red-50/20' : ''}`}
                >
                  <td className="px-6 py-3.5 text-sm text-gray-400 font-medium">{index + 1}</td>
                  <td className="px-6 py-3.5 text-sm font-bold text-gray-900">{row.nodeId}</td>
                  <td className="px-6 py-3.5 text-sm text-gray-500 font-medium">{row.timestamp}</td>
                  <td className={`px-6 py-3.5 text-sm font-bold ${isPhDanger ? 'text-red-500' : 'text-emerald-600'}`}>
                    {row.ph}
                  </td>
                  <td className={`px-6 py-3.5 text-sm font-bold ${isTdsDanger ? 'text-red-500' : 'text-emerald-600'}`}>
                    {row.tds}
                    <span className="ml-1 text-xs font-normal text-gray-400">ppm</span>
                  </td>
                  <td className="px-6 py-3.5">
                    <StatusBadge status={row.status} />
                  </td>
                </tr>
              );
            })}
            {data.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-16 text-center text-sm text-gray-400">
                  Tidak ada data log yang sesuai filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogDataTable;
