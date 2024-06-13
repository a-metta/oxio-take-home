import SortableTable from '@components/SortableTable';
import { useUsers } from '@hooks/useUsers';

function TableView() {
  const { users } = useUsers();

  return (
    <div className='p-12'>
      <h1>Sortable Table View</h1>
      {!!users && (
        <div className='mt-8'>
          <SortableTable
            data={users}
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'phone', label: 'Phone' },
            ]}
          />
        </div>
      )}
    </div>
  );
}

export default TableView;
