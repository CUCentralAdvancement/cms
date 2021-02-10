import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getSession } from 'next-auth/client';
import AdminLayout from '../components/layout/AdminLayout';
import { defaultUser, UserSelect } from '../data/types';
import prisma from '../prisma/prisma';
interface ProfileProps {
  user: UserSelect;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <AdminLayout>
      <div className="container mx-auto mt-4 p-3">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl" data-testid="user-name">{`Welcome ${user.name}!`}</h1>
          <img data-testid="user-image" src={user.image} alt="profile pic" />
        </div>
        <h2 className="my-3">Spaces</h2>
      </div>
    </AdminLayout>
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
