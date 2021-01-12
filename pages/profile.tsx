import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import auth0 from '../utils/auth0';
import { Box } from '@cu-advancement/component-library';
import AdminLayout from '../components/global/AdminLayout';
import { IClaims } from '@auth0/nextjs-auth0/dist/session/session';
import { User, defaultUser } from '../data/types';

interface ProfileProps {
  user: User | IClaims;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  console.log(user);
  return (
    <>
      <AdminLayout>
        <Box sx={{ maxWidth: '600px', mx: 'auto', mt: 4, p: 3, bg: 'gray' }}>
          <img src={user.picture} alt="profile pic" />
          <ul>
            <li>{`Name --- ${user.name}`}</li>
            <li>{`Email --- ${user.email}`}</li>
            <li>{`Sub --- ${user.sub}`}</li>
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
  // Check for cookie and use that if there?
  // console.log(req.cookies['a0:session']);

  let user: User = defaultUser;

  // Only do on client-side.
  if (typeof window === 'undefined') {
    // Get Auth0 session and redirect to login if no user.
    const session = await auth0.getSession(context.req);
    if (!session || !session.user) {
      context.res.writeHead(302, {
        Location: '/api/login',
      });
      context.res.end();
    }

    user = session?.user;
    // Set cookie for next request?
  }

  // Grab user info from db.
  // if (user.email) {
  //   const db = require('../data/db').instance;
  //   db.query();
  // }

  return { props: { user } };
};
