import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { Box } from 'theme-ui';
import prisma from '../../../prisma/prisma';
import AdminLayout from '../../../components/global/AdminLayout';

interface ContentItem {
  title: string;
  id: number;
}
interface ContentOverviewProps {
  content: Array<ContentItem>;
}

const ContentOverview: React.FC<ContentOverviewProps> = ({ content }) => {
  return (
    <>
      <AdminLayout>
        <Box sx={{ maxWidth: '600px', mx: 'auto', mt: 4, p: 3, bg: 'gray' }}>
          <h1>{`Content Overview for the "Fund Admin" space`}</h1>
          <ul>{content && content.map((item) => <li key={item.id}>{item.title}</li>)}</ul>
        </Box>
      </AdminLayout>
    </>
  );
};

export default ContentOverview;

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<ContentOverviewProps>
> {
  const content = await prisma.fund.findMany({});
  return { props: { content } };
}

// const sp = {
//   getContentTypes: (space: string) => {
//     console.log(space);
//     return ['post'];
//   },
// };
