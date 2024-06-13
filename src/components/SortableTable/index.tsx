import { Column, TableData } from '@customTypes/table';
import { useState } from 'react';
import Body from './Body';
import Head from './Head';
import './SortableTable.css';

function SortableTable({
  columns,
  data,
  caption,
}: {
  caption?: string;
  columns: Column[];
  data: TableData;
}) {
  const [tableData, setTableData] = useState();

  return (
    <>
      {caption && <caption className='m-1.5 text-2xl'>{caption}</caption>}
      <table className='table'>
        <Head columns={columns} />
        <Body columns={columns} data={data} />
      </table>
    </>
  );
}

export default SortableTable;
