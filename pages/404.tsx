import Link from 'next/link';
import { Heading, Button, Flex } from '@cu-advancement/component-library';
import AdminLayout from '../components/global/AdminLayout';

const Custom404: React.FC = () => {
  return (
    <AdminLayout>
      <Flex
        sx={{
          maxWidth: '600px',
          mx: 'auto',
          mt: 4,
          p: 3,
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Heading sx={{ mb: 3 }}>You&apos;re Wrong! No page exists.</Heading>
        <Link href="/">
          <a>
            <Button variant="button.secondary">Go Home, Silly!</Button>
          </a>
        </Link>
      </Flex>
    </AdminLayout>
  );
};

export default Custom404;
