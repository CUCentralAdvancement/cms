import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Router from 'next/router';
import { getSession, Session } from 'next-auth/client';
import AdminLayout from '../../../../components/layout/AdminLayout';
interface DeleteSpaceFormProps {
  admin: boolean;
  space: string;
}

const DeleteSpaceForm: React.FC<DeleteSpaceFormProps> = ({ admin, space }) => {
  if (!admin) {
    console.log('need to do something');
  }

  return (
    <>
      <AdminLayout>
        <div className="container mx-auto mt-4 p-3">
          <div className="flex flex-col">
            <h1 className="my-3">{`Are you sure you want to delete the "${space}" space?`}</h1>
            <div className="flex flex-row justify-between items-center">
              <button data-testid="delete-space-button" onClick={() => deleteSpace(space)}>
                Delete
              </button>
              <button onClick={() => Router.back()}>Cancel</button>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default DeleteSpaceForm;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<DeleteSpaceFormProps>> => {
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
