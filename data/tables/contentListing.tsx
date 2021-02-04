import { SelectColumnFilter } from '../../components/tables/Filters';

export const defaultColumns = [
  {
    Header: 'Title',
    accessor: 'title',
    filter: 'fuzzyText',
  },
  {
    Header: 'Type',
    accessor: 'type',
    Filter: SelectColumnFilter,
    filter: 'includes',
  },
  {
    Header: 'Author',
    accessor: 'author',
    filter: 'fuzzyText',
  },
  {
    Header: 'Published',
    accessor: 'published',
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
    accessor: 'operations',
    disableFilters: true,
    disableSortBy: true,
    Cell: ({ cell: { value } }) => <a href={`${value}/edit`}>Edit</a>,
  },
];
