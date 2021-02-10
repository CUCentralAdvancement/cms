import { SelectColumnFilter } from '../../components/tables/Filters';
import Link from 'next/link';

export const defaultColumns = [
  {
    Header: 'Allocation Code',
    accessor: 'allocation_code',
    filter: 'fuzzyText',
  },
  {
    Header: 'Title',
    accessor: 'title',
    filter: 'fuzzyText',
  },
  {
    Header: 'Author',
    accessor: 'author',
    filter: 'fuzzyText',
  },

  {
    Header: 'Campus',
    accessor: 'campus',
    Filter: SelectColumnFilter,
    filter: 'includes',
  },
  {
    Header: 'Active',
    accessor: 'active',
    Filter: SelectColumnFilter,
    filter: 'includes',
  },
  {
    Header: 'Updated At',
    accessor: 'updated_at',
    disableFilters: true,
  },
  {
    Header: 'Operations',
    accessor: 'id',
    disableFilters: true,
    disableSortBy: true,
    // eslint-disable-next-line
    Cell: ({ cell: { value } }) => (
      <Link as={`content/${value}/edit`} href={`./content/[id]/edit`}>
        <a>Edit</a>
      </Link>
    ),
  },
];
