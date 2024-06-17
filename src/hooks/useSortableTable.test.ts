import { act, renderHook } from '@testing-library/react';
import { useSortableTable } from './useSortableTable';

describe('useSortableTable', () => {
  type TestData = { id: number; name: string; age: number };
  const data = [
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Jane', age: 30 },
    { id: 3, name: 'Bob', age: 35 },
  ];

  test('should return unsorted data by default', () => {
    const { result } = renderHook(() =>
      useSortableTable<TestData>({
        data,
        columns: [
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Name' },
          { key: 'age', label: 'Age' },
        ],
      }),
    );

    expect(result.current.sortedData).toEqual(data);
    expect(result.current.sortColumn).toBeUndefined();
    expect(result.current.sortDirection).toBeUndefined();
  });

  test('should sort data in ascending order when handleSort is called', () => {
    const { result } = renderHook(() =>
      useSortableTable<TestData>({
        data,
        columns: [
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Name' },
          { key: 'age', label: 'Age' },
        ],
      }),
    );

    act(() => {
      result.current.handleSort('name');
    });

    expect(result.current.sortedData).toEqual([
      { id: 3, name: 'Bob', age: 35 },
      { id: 2, name: 'Jane', age: 30 },
      { id: 1, name: 'John', age: 25 },
    ]);
    expect(result.current.sortColumn).toBe('name');
    expect(result.current.sortDirection).toBe('asc');
  });

  it('should sort data in descending order when handleSort is called twice', () => {
    const { result } = renderHook(() =>
      useSortableTable<TestData>({
        data,
        columns: [
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Name' },
          { key: 'age', label: 'Age' },
        ],
      }),
    );

    act(() => {
      result.current.handleSort('name');
    });

    act(() => {
      result.current.handleSort('name');
    });

    expect(result.current.sortedData).toEqual(data);
    expect(result.current.sortColumn).toBe('name');
    expect(result.current.sortDirection).toBe('desc');
  });
});
