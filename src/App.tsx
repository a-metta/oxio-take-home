import Modal from '@components/Modal';
import UserForm from '@components/UserForm';
import { UsersData } from '@customTypes/users';
import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './App.css';

type ContextType = { users: UsersData | null };

function App() {
  const [data, setData] = useState<UsersData>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log('effect');
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response: Response) => response.json())
      .then((data: UsersData) => {
        console.log(data);
        setData(data);
      })
      .catch((error: Error) => console.error(error));
  }, []);

  return (
    <div>
      <nav>
        <ul className='flex flex-auto flex-row justify-center'>
          <li>
            <Link to={`table`}>Table</Link>
          </li>
          <li className='ml-4'>
            <Link to={`chart`}>Chart</Link>
          </li>
        </ul>
        <button type='button' onClick={() => setIsModalOpen(true)}>
          Add User
        </button>
      </nav>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h1>Add User</h1>
        <div className='py-6'>
          <UserForm
            handleSubmit={(newUser) => {
              setData([
                ...data,
                {
                  ...newUser,
                  id: `${data.length + 1}`,
                },
              ]);
              setIsModalOpen(false);
            }}
          />
        </div>
      </Modal>
      <div>
        <Outlet context={{ users: data } satisfies ContextType} />
      </div>
    </div>
  );
}

export default App;
