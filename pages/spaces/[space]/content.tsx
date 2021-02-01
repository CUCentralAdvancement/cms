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
  space: string;
}

const ContentOverview: React.FC<ContentOverviewProps> = ({ content, space }) => {
  return (
    <>
      <AdminLayout>
        <Box sx={{ maxWidth: '600px', mx: 'auto', mt: 4, p: 3, bg: 'gray' }}>
          <h1>{`Content Overview for the ${space} space`}</h1>
          <ul>{content && content.map((item) => <li key={item.id}>{item.title}</li>)}</ul>
        </Box>
      </AdminLayout>
    </>
  );
};

export default ContentOverview;

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ContentOverviewProps>> {
  // Get space from context.
  const space = String(context.params?.space);
  // const contentTypes = sp.getContentTypes(space);

  const content = await prisma.post.findMany({});
  return { props: { content, space } };
}

// const sp = {
//   getContentTypes: (space: string) => {
//     console.log(space);
//     return ['post'];
//   },
// };
