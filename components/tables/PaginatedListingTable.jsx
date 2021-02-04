import React from 'react';
import { useTable, usePagination } from 'react-table';

import makeData from '../../data/makeTableData';

const ThTrStyles = {
  margin: 0,
  padding: '0.5rem',
  borderBottom: '1px solid black',
  borderRight: '1px solid black',
  width: '1%',
};

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  // Render the UI for your table
  return (
    <>
      <div
        style={{
          display: 'block',
          maxWidth: '100%',
          overflowX: 'scroll',
          overflowY: 'hidden',
          borderRight: '1px solid black',
          borderBottom: '1px solid black',
          borderTop: '2px solid black',
          borderLeft: '2px solid black',
          backgroundColor: '#bebfb9',
        }}
      >
        <table {...getTableProps()} style={{ width: '100%', borderSpacing: 0 }}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  // Add the sorting props to control sorting. For this example
                  // we can add them into the header props
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                    {/* Add a sort direction indicator */}
                    {/* <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span> */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  style={i % 2 == 0 ? { backgroundColor: '#fff' } : { backgroundColor: '#f3f4ee' }}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        style={ThTrStyles}
                        {...cell.getCellProps({
                          className: cell.column.collapse ? 'collapse' : '',
                        })}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      </div>
      <div style={{ padding: '1.25rem 0.75rem' }}>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

function PaginatedListingTable() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Search',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
          {
            Header: 'Age',
            accessor: 'age',
            collapse: true,
          },
          {
            Header: 'Visits',
            accessor: 'visits',
            collapse: true,
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
            collapse: true,
          },
        ],
      },
    ],
    []
  );

  const data = React.useMemo(() => makeData(100), []);

  return <Table columns={columns} data={data} />;
}

export default PaginatedListingTable;
