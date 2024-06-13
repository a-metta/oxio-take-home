import { UsersData } from '@customTypes/users';
import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './App.css';

type ContextType = { users: UsersData | null };

function App() {
  const [data, setData] = useState<UsersData>([]);

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
        <ul className='flex flex-auto flex-row justify-evenly'>
          <li>
            <Link to={`table`}>Table</Link>
          </li>
          <li>
            <Link to={`chart`}>Chart</Link>
          </li>
        </ul>
      </nav>
      <div>
        <Outlet context={{ users: data } satisfies ContextType} />
      </div>
    </div>
  );
}

export default App;
