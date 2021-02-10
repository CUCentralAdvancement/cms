import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/client';
import AdminHeader from './AdminHeader';
import Footer from './Footer';
interface AdminLayoutProps {
  mainBg?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, mainBg }) => {
  const [session] = useSession();

  if (!session) {
    return <LoginPrompt />;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-shrink-0">
        <AdminHeader
          primaryLinks={[
            { href: '/admin/spaces', label: 'Spaces' },
            { href: '/spaces/fund_admin/content', label: 'Content' },
          ]}
        />
      </div>
      <main style={mainBg ? { backgroundColor: mainBg } : null} className="flex-auto bg-yellow-50">
        <div className="transition-opacity duration-500 ease-in">{children}</div>
      </main>
      <div className="flex-shrink-0">
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;

const LoginPrompt: React.FC = () => {
  return (
    <div className="flex flex-col justify-between items-center text-lg max-w-4xl mx-auto mt-4">
      <img width="640px" src="/logo.svg" alt="CU Advancement Logo" />
      <h1 className="my-5 p-2 text-2xl">Hello, and welcome to the CMS!</h1>
      <Link href="/api/auth/signin">
        <button className="p-3 bg-gold text-white rounded shadow">Login!!</button>
      </Link>
    </div>
  );
};
