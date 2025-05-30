import React, { useState, useMemo } from "react";
import { format } from "date-fns";

export interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  headerComponent?: React.ReactNode;
  cellRenderer?: (value: any, row: T) => React.ReactNode;
  filterRenderer?: (
    onChange: (value: any) => void,
    value: any
  ) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  dateFormat?: string;
  theme?: boolean;
}

function Datagrid01<T extends Record<string, any>>({
  data,
  columns,
  dateFormat = "MM/dd/yyyy",
  theme = false,
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [filters, setFilters] = useState<Record<string, any>>({});

  const handleSort = (key: keyof T) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      return columns.every((col) => {
        const val = filters[col.key as string];
        if (!val) return true;
        if (typeof row[col.key] === "string") {
          return row[col.key].toLowerCase().includes(val.toLowerCase());
        } else if (typeof row[col.key] === "number") {
          return row[col.key] === Number(val);
        } else if (
          row[col.key] &&
          Object.prototype.toString.call(row[col.key]) === "[object Date]"
        ) {
          return format(row[col.key], dateFormat) === val;
        }
        return true;
      });
    });
  }, [data, filters, columns, dateFormat]);

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal < bVal) return sortAsc ? -1 : 1;
      if (aVal > bVal) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortAsc]);

  return (
    <div
      className={`rounded-lg border p-2 ${
        theme
          ? "bg-[var(--solid-bg)] text-[var(--solid-text)]"
          : "bg-white text-black"
      }`}
    >
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key as string}
                className="px-4 py-2 text-left border-b cursor-pointer"
                onClick={() => col.sortable && handleSort(col.key)}
              >
                <div className="flex items-center justify-between">
                  <span>{col.label}</span>
                  {sortKey === col.key && (sortAsc ? "▲" : "▼")}
                </div>
              </th>
            ))}
          </tr>
          <tr>
            {columns.map((col) => (
              <td key={col.key as string} className="px-4 py-1 border-b">
                {col.filterable &&
                  (col.filterRenderer ? (
                    col.filterRenderer(
                      (v) => handleFilterChange(col.key as string, v),
                      filters[col.key as string]
                    )
                  ) : (
                    <input
                      type="text"
                      className="w-full px-2 py-1 border rounded"
                      value={filters[col.key as string] || ""}
                      onChange={(e) =>
                        handleFilterChange(col.key as string, e.target.value)
                      }
                    />
                  ))}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, i) => (
            <tr key={i} className="border-b hover:bg-gray-100">
              {columns.map((col) => (
                <td key={col.key as string} className="px-4 py-2">
                  {col.cellRenderer
                    ? col.cellRenderer(row[col.key], row)
                    : row[col.key] &&
                      Object.prototype.toString.call(row[col.key]) ===
                        "[object Date]"
                    ? format(row[col.key], dateFormat)
                    : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Datagrid01;

// ALT
// (row[col.key] as any) instanceof Date
// ALT
