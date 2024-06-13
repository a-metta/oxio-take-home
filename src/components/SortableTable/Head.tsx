import { Column } from '@customTypes/table';

function Head({ columns }: { columns: Column[] }) {
  return (
    <thead>
      <tr>
        {columns.map(({ label, key }, index) => (
          <th key={index + key + label}>{label}</th>
        ))}
      </tr>
    </thead>
  );
}
export default Head;
