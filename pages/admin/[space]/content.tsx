import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { Box } from '@cu-advancement/component-library';
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

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ContentOverviewProps>> {
  // Get space from context.
  const space = String(context.params?.space);

  const content: Array<ContentItem> = [
    { id: 1, title: 'Story One' },
    { id: 2, title: 'Story Two' },
    { id: 3, title: 'Story Three' },
  ];
  return { props: { content, space } };
}
