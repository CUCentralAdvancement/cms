import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Router from 'next/router';
import { getSession, Session } from 'next-auth/client';
import { Box, Heading, Flex, Button } from 'theme-ui';
import AdminLayout from '../../../../components/global/AdminLayout';
interface EditSpaceFormProps {
  admin: boolean;
  space: string;
}

const CreateSpaceForm: React.FC<EditSpaceFormProps> = ({ admin, space }) => {
  if (!admin) {
    console.log('need to do something');
  }

  return (
    <>
      <AdminLayout>
        <Box sx={{ maxWidth: '600px', mx: 'auto', mt: 4, p: 3 }}>
          {/* {message && <Message>{message}</Message>} */}
          <Flex sx={{ flexDirection: 'column' }}>
            <Heading sx={{ my: 3 }} as="h1">
              {`Are you sure you want to delete the "${space}" space?`}
            </Heading>
            <Flex
              sx={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Button onClick={() => deleteSpace(space)}>Delete</Button>
              <Button onClick={() => Router.back()}>Cancel</Button>
            </Flex>
          </Flex>
        </Box>
      </AdminLayout>
    </>
  );
};

export default CreateSpaceForm;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<EditSpaceFormProps>> => {
  const adminEmails: string = process.env.ADMIN_EMAILS;
  const session: Session = await getSession(context);
  const space = String(context.params.space);

  // User needs to have their email listed as an admin.
  if (!adminEmails.includes(session?.user?.email)) {
    context.res.writeHead(302, {
      Location: '/',
    });
    context.res.end();
    return { props: { admin: false, space } };
  }

  return { props: { admin: true, space } };
};

async function deleteSpace(space: string): Promise<void> {
  try {
    const result = await fetch(`http://localhost:3000/api/space/${space}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    const deletedSpace = await result.json();
    console.log(deletedSpace);
    await Router.push('/admin/spaces');
  } catch (error) {
    console.error(error);
  }
}
