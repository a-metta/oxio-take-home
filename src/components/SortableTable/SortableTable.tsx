import { Column, TableData, TableDataEntry } from '@customTypes/table';
import { useSortableTable } from '@hooks/useSortableTable';
import './SortableTable.css';
import TableBody from './TableBody';
import TableHead from './TableHead';

function SortableTable<Type extends TableDataEntry>({
  columns,
  data,
  caption,
}: {
  caption?: string;
  columns: Column<Type>[];
  data: TableData;
}) {
  const { sortedData, handleSort, sortColumn, sortDirection } =
    useSortableTable<Type>({
      data: data as Type[],
      columns: columns,
    });
  return (
    <>
      <table className='table'>
        {caption && (
          <caption className='m-1.5 block text-2xl'>{caption}</caption>
        )}
        <TableHead<Type>
          columns={columns}
          handleSort={handleSort}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
        />
        <TableBody<Type> data={sortedData} columns={columns} />
      </table>
    </>
  );
}

export default SortableTable;
