import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getSession } from 'next-auth/client';
import { Box, Heading, Flex, Grid } from '@cu-advancement/component-library';
import AdminLayout from '../components/global/AdminLayout';
import { defaultUser, UserSelect } from '../data/types';
import prisma from '../lib/prisma';
interface ProfileProps {
  user: UserSelect;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
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
            <Heading as="h1">{`Welcome ${user.name}!`}</Heading>
            <img src={user.image} alt="profile pic" />
          </Flex>
          <Heading sx={{ my: 3 }} as="h2">
            Spaces
          </Heading>
          <Grid gap={2} columns={[1, 2, 4]} sx={{ maxWidth: 1280, mx: 'auto' }}>
            {/* {user.spaces.map((el) => {
              return <span key={el}>{spaceConfig[el].label}</span>;
            })} */}
          </Grid>
        </Box>
      </AdminLayout>
    </>
  );
};

export default Profile;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ProfileProps>> => {
  let user = defaultUser;
  const session = await getSession(context);

  if (session?.accessToken) {
    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });
    user = { ...session.user, ...dbUser };
  }

  return { props: { user } };
};
