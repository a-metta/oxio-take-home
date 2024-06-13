import { Column, TableData } from '@customTypes/table';
import { ReactNode } from 'react';

function Body({ columns, data }: { columns: Column[]; data: TableData }) {
  return (
    <tbody>
      {data.map((dataObj, rowIndex) => (
        <tr key={dataObj.id}>
          {columns.map(({ key, label }, columnIndex) => (
            <td key={rowIndex + columnIndex + key} data-label={label}>
              {dataObj[key] as ReactNode}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default Body;
