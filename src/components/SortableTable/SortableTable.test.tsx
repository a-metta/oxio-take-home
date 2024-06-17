import { render, screen } from '@testing-library/react';
import SortableTable from './SortableTable';

type TestData = { id: string; name: string; age: number; location: string };

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age' },
  { key: 'location', label: 'Location' },
  { key: 'id', label: 'ID' },
] as { key: keyof TestData; label: string }[];

const data = [
  { id: '112812', name: 'John Doe', age: 30, location: 'USA' },
  { id: '183282', name: 'Jane Doe', age: 25, location: 'Canada' },
];

describe('SortableTable', () => {
  beforeEach(() => {
    render(<SortableTable<TestData> {...{ columns, data }} />);
  });

  test('renders table data correctly', () => {
    data.forEach((item) => {
      const nameElement = screen.getByText(item.name);
      const ageElement = screen.getByText(item.age.toString());
      const locationElement = screen.getByText(item.location);
      const idElement = screen.getByText(item.id);

      expect(nameElement).toBeInTheDocument();
      expect(ageElement).toBeInTheDocument();
      expect(locationElement).toBeInTheDocument();
      expect(idElement).toBeInTheDocument();
    });
  });
});
