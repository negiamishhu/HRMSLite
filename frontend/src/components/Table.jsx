import { HiOutlineInbox } from 'react-icons/hi';

// eslint-disable-next-line no-unused-vars
export default function Table({ columns, data, loading, emptyMessage = 'No data available', emptyIcon: EmptyIcon = HiOutlineInbox }) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="animate-pulse">
          <div className="h-14 bg-slate-50 border-b border-gray-100" />
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 border-b border-gray-50 last:border-0">
              <div className="flex items-center px-6 py-4 gap-4">
                <div className="h-10 w-10 bg-gray-100 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-100 rounded-full w-3/4" />
                  <div className="h-2 bg-gray-50 rounded-full w-1/2" />
                </div>
                <div className="h-8 bg-gray-100 rounded-lg w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-2xl mb-6">
          <EmptyIcon className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No Data Found</h3>
        <p className="text-gray-400 max-w-sm mx-auto">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-gray-100">
              {columns.map((column, idx) => (
                <th
                  key={column.key}
                  className={`px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider ${idx === 0 ? 'pl-6' : ''}`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((row, rowIndex) => (
              <tr
                key={row.id || rowIndex}
                className="hover:bg-indigo-50/30 transition-all duration-200 group"
              >
                {columns.map((column, colIdx) => (
                  <td
                    key={column.key}
                    className={`px-6 py-4 ${colIdx === 0 ? 'pl-6' : ''}`}
                  >
                    <div className="text-sm text-gray-700 font-medium">
                      {column.render ? column.render(row) : row[column.key]}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Table Footer */}
      <div className="px-6 py-3 bg-slate-50 border-t border-gray-100">
        <p className="text-xs text-slate-500">
          Showing <span className="font-semibold text-slate-700">{data.length}</span> {data.length === 1 ? 'record' : 'records'}
        </p>
      </div>
    </div>
  );
}
