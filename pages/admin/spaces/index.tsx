import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getSession } from 'next-auth/client';
import AdminLayout from '../../../components/global/AdminLayout';
import prisma from '../../../prisma/prisma';
import { Space } from '../../../data/types';
import Link from 'next/link';

interface SpacesAdminProps {
  spaces: Array<Space>;
}

const SpacesAdmin: React.FC<SpacesAdminProps> = ({ spaces }) => {
  return (
    <>
      <AdminLayout>
        <div className="conatiner mx-auto mt-4 p-3">
          <div className="flex flex-row justify-between items-center mb-3">
            <h1 data-testid="spaces-admin-heading">Spaces Admin</h1>
            <Link href="/admin/spaces/create">
              <a>
                <button className="shadow text-lg" data-testid="create-space-button">
                  Create Space +
                </button>
              </a>
            </Link>
          </div>
          <div className="container mx-auto grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {spaces.map((space) => {
              return (
                <div
                  className="p-2 shadow rounded"
                  key={space.id}
                  data-testid={`card-${space.key}`}
                >
                  <img
                    className="object-cover"
                    src={space.image?.src}
                    alt={space.image?.file_name}
                  />
                  <div className="flex flex-row justify-between items-center mt-2 p-1">
                    <h2>{space.label}</h2>
                    <Link as={`/admin/spaces/${space.key}/edit`} href="/admin/spaces/[space]/edit">
                      <a>
                        <button className="p-3 bg-blue-600 rounded shadow text-white">Edit</button>
                      </a>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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

  const spaces = await prisma.space.findMany({ include: { image: true } });

  return { props: { spaces } };
};
