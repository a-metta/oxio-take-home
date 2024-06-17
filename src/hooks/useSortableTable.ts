import { SortDirection, SortableTable } from '@customTypes/table';
import { useEffect, useState } from 'react';

export type useSortableTableReturnType<T> = {
  sortedData: T[];
  sortColumn: keyof T | undefined;
  sortDirection: SortDirection | undefined;
  handleSort: (column: keyof T) => void;
};

export function useSortableTable<T>({
  data,
}: SortableTable<T>): useSortableTableReturnType<T> {
  const [sortedData, setSortedData] = useState<T[]>([]);
  const [sortColumn, setSortColumn] = useState<keyof T | undefined>(undefined);
  const [sortDirection, setSortDirection] = useState<SortDirection | undefined>(
    undefined,
  );

  useEffect(() => {
    if (sortColumn && !!data) {
      const sorted = [...data].sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];

        if (valueA < valueB) {
          return sortDirection === 'asc' ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      });

      setSortedData(sorted);
    } else {
      setSortedData(data);
    }
  }, [data, sortColumn, sortDirection]);

  const handleSort = (column: keyof T) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return {
    sortedData,
    sortColumn,
    sortDirection,
    handleSort,
  };
}
