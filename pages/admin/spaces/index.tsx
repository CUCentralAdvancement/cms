import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getSession } from 'next-auth/client';
import { Box, Heading, Flex, Grid, Card, Image, AspectRatio, Button } from 'theme-ui';
import AdminLayout from '../../../components/global/AdminLayout';
import prisma from '../../../lib/prisma';
import { Space } from '../../../data/types';
import Link from 'next/link';

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
              mb: 3,
            }}
          >
            <Heading data-testid="spaces-admin-heading" as="h1">
              Spaces Admin
            </Heading>
            <Link href="/admin/spaces/create">
              <a>
                <Button data-testid="create-space-button" sx={{ fontSize: 4, boxShadow: 'card' }}>
                  Create Space +
                </Button>
              </a>
            </Link>
          </Flex>
          <Grid gap={2} columns={[1, 2, 3]} sx={{ maxWidth: 1280, mx: 'auto' }}>
            {spaces.map((space) => {
              return (
                <Card key={space.id} data-testid={`card-${space.key}`}>
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={space.image}
                      sx={{
                        objectFit: 'cover',
                      }}
                    />
                  </AspectRatio>
                  <Flex
                    sx={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mt: 2,
                      p: 1,
                    }}
                  >
                    <Heading as="h2">{space.label}</Heading>
                    <Link as={`/admin/spaces/${space.key}/edit`} href="/admin/spaces/[space]/edit">
                      <a>
                        <Button>Edit</Button>
                      </a>
                    </Link>
                  </Flex>
                </Card>
              );
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
