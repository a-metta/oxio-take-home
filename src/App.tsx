import Modal from '@components/Modal';
import UserForm from '@components/UserForm';
import { UsersData } from '@customTypes/users';
import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './App.css';

type ContextType = { users: UsersData | null };

function App() {
  const [data, setData] = useState<UsersData>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response: Response) => response.json())
      .then((data: UsersData) => {
        setData(data);
      })
      .catch((error: Error) => console.error(error));
  }, []);

  return (
    <div>
      <nav
        role='navigation'
        className='flex flex-auto flex-row justify-between align-middle'
      >
        <ul className='mr-10 flex'>
          <li>
            <Link to={`table`}>Table</Link>
          </li>
          <li className='ml-4'>
            <Link to={`map`}>Map</Link>
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
      <main role='main'>
        {location.pathname === '/' && (
          <>
            <h1 className='mt-8 text-center text-4xl'>
              Welcome to Alessandro's Oxio Take Home
            </h1>
            <p className='mt-8 text-center text-2xl'>
              Click on the links above to view Users Data using a Table view or
              Geographical data using Google Maps API
              <br />
              You may also add a new user by clicking the "Add User" button
            </p>
          </>
        )}
        <Outlet context={{ users: data } satisfies ContextType} />
      </main>
    </div>
  );
}

export default App;
