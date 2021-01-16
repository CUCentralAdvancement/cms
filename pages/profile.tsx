import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useSession, getSession } from 'next-auth/client';
import { Box } from '@cu-advancement/component-library';
import AdminLayout from '../components/global/AdminLayout';
import { defaultUser, User } from '../data/types';
import prisma from '../lib/prisma';

interface ProfileProps {
  user: User;
  sesh: string;
  ush: string;
}

const Profile: React.FC<ProfileProps> = ({ user, sesh, ush }) => {
  const [session, loading] = useSession();

  if (typeof window !== 'undefined' && loading) return null;
  console.log(sesh);
  console.log(ush);

  return (
    <>
      <AdminLayout>
        <Box sx={{ maxWidth: '600px', mx: 'auto', mt: 4, p: 3, bg: 'gray' }}>
          <img src={user.image} alt="profile pic" />
          <ul>
            <li>{`Name --- ${user.name}`}</li>
            <li>{`Email --- ${user.email}`}</li>
          </ul>
        </Box>
      </AdminLayout>
    </>
  );
};

export default Profile;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ProfileProps>> => {
  const session = await getSession(context);
  const user = session?.user ?? defaultUser;

  const sesh = JSON.stringify(await prisma.session.findMany());
  const ush = JSON.stringify(await prisma.user.findMany());

  return { props: { user, sesh, ush } };
};
