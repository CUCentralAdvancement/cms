import { GetServerSidePropsResult } from 'next';
import { useMemo } from 'react';
import { Box } from 'theme-ui';
import prisma from '../../../prisma/prisma';
import AdminLayout from '../../../components/global/AdminLayout';
import ContentListingTable from '../../../components/tables/ContentEditListingTable';
import { defaultColumns } from '../../../data/tables/contentListing';
import makeData from '../../../data/tables/makeTableData';

interface ContentItem {
  title: string;
  id: number;
}
interface ContentOverviewProps {
  content: Array<ContentItem>;
}

const ContentOverview: React.FC<ContentOverviewProps> = ({ content }) => {
  console.log(content);
  const columns = useMemo(() => defaultColumns, []);
  const data = useMemo(() => makeData(2000), []);

  return (
    <>
      <AdminLayout>
        <Box sx={{ maxWidth: '1260px', mx: 'auto', mt: 4, p: 3 }}>
          <h1>{`Content Overview for the "Fund Admin" space`}</h1>
          <ContentListingTable
            columns={columns}
            data={data}
            initialState={{
              sortBy: [
                {
                  id: 'lastName',
                  asc: true,
                },
              ],
            }}
          />
        </Box>
      </AdminLayout>
    </>
  );
};

export default ContentOverview;

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<ContentOverviewProps>
> {
  const content = await prisma.post.findMany({});
  return { props: { content } };
}
