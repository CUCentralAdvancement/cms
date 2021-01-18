import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getSession } from 'next-auth/client';
import { Box, Heading, Flex, Grid } from 'theme-ui';
import AdminLayout from '../../../components/global/AdminLayout';
import prisma from '../../../lib/prisma';
import { Space } from '../../../data/types';

interface SpacesAdminProps {
  spaces: Array<Space>;
}

const SpacesAdmin: React.FC<SpacesAdminProps> = ({ spaces }) => {
  return (
    <>
      <AdminLayout>
        <Box sx={{ maxWidth: '1280px', mx: 'auto', mt: 4, p: 3 }}>
          <Flex
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Heading as="h1">Spaces Admin</Heading>
            {/* <img src={user.image} alt="profile pic" /> */}
          </Flex>
          <Grid gap={2} columns={[1, 2, 4]} sx={{ maxWidth: 1280, mx: 'auto' }}>
            {spaces.map((space) => {
              return <span key={space.id}>{space.label}</span>;
            })}
          </Grid>
        </Box>
      </AdminLayout>
    </>
  );
};

export default SpacesAdmin;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<SpacesAdminProps>> => {
  const adminEmails: string = process.env.ADMIN_EMAILS;
  const session = await getSession(context);

  // User needs to have their email listed as an admin.
  if (!adminEmails.includes(session?.user?.email)) {
    context.res.writeHead(403, {
      Location: '/',
    });
    context.res.end();
    return;
  }

  const spaces = await prisma.space.findMany();

  return { props: { spaces } };
};
