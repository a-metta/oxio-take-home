import { UserContext } from '@customTypes/context';
import { useOutletContext } from 'react-router-dom';

export function useUsers() {
  return useOutletContext<UserContext>();
}
