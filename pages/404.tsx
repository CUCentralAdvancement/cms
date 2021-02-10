import Link from 'next/link';
import AdminLayout from '../components/layout/AdminLayout';

const Custom404: React.FC = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col items-center max-w-screen-sm mt-4 p-3 mx-auto">
        <h1 className="mb-3">You&apos;re Wrong! No page exists.</h1>
        <Link href="/">
          <a>
            <button className="p-3">Go Home, Silly!</button>
          </a>
        </Link>
      </div>
    </AdminLayout>
  );
};

export default Custom404;
