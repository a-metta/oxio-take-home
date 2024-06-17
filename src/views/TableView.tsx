import SortableTable from '@components/SortableTable';
import { User } from '@customTypes/users';
import { useUsers } from '@hooks/useUsers';

const usersColumns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'website', label: 'Website' },
  { key: 'company', label: 'Company' },
  { key: 'address', label: 'Address' },
] as { key: keyof User; label: string }[];

function TableView() {
  const { users } = useUsers();

  return (
    <div className='p-12'>
      <h1>Sortable Table View</h1>
      {!!users && (
        <div className='mt-8'>
          <SortableTable
            data={users.map((user) => {
              return {
                ...user,
                company: user.company.name,
                address: `${user.address.city}, ${user.address.street}`,
              };
            })}
            columns={usersColumns}
          />
        </div>
      )}
    </div>
  );
}

export default TableView;
