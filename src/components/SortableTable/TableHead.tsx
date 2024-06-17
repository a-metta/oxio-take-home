import { Column } from '@customTypes/table';
import { useSortableTableReturnType } from '@hooks/useSortableTable';
import { Key } from 'react';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa6';

function TableHead<Type>({
  columns,
  handleSort,
  sortColumn,
  sortDirection,
}: {
  columns: Column<Type>[];
} & Omit<useSortableTableReturnType<Type>, 'sortedData'>) {
  const icon = <FaSort />;
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.key as Key}
            onClick={() => handleSort(column.key)}
            className='cursor-pointer'
            scope='col'
            {...((column.key as Key) === sortColumn && {
              'aria-sort': sortDirection === 'asc' ? 'ascending' : 'descending',
            })}
          >
            <div className='flex justify-center align-middle'>
              {column.label}
              <div className='ml-3 mt-1'>
                {(column.key === sortColumn &&
                  (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)) ||
                  icon}
              </div>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHead;
