import Link from 'next/link';
import { Heading, Button } from '@cu-advancement/component-library';
import AdminLayout from '../components/global/AdminLayout';

const Custom404: React.FC = () => {
  return (
    <AdminLayout>
      <Heading>You&apos;re Wrong!</Heading>
      <Link href="/">
        <a>
          <Button variant="button.secondary">Go Home, Silly!</Button>
        </a>
      </Link>
    </AdminLayout>
  );
};

export default Custom404;
