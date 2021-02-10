import React from 'react';
import Link from 'next/link';
import { Link as LinkType } from '../../data/types';
import { useSession } from 'next-auth/client';
interface AdminHeaderProps {
  primaryLinks: Array<LinkType>;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ primaryLinks }) => {
  const [session] = useSession();
  return (
    <header className="p-1 flex flex-col md:flex-row justify-between items-center bg-black text-white">
      <div>
        {primaryLinks &&
          primaryLinks.map((el, index) => {
            return (
              <NavLink key={index} href={el.href}>
                {el.label}
              </NavLink>
            );
          })}
      </div>
      <div className="flex justify-between">
        <Link href="/">
          <a>
            <img className="mr-3 pt-2 h-12 rounded-full" src={session.user.image} alt="profile" />
          </a>
        </Link>
        <Link href="/api/auth/signout">
          <button className="bg-gold p-2 text-white rounded" data-testid="logout-button">
            Log Out
          </button>
        </Link>
      </div>
    </header>
  );
};

export default AdminHeader;
interface NavLinkProps {
  href: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  return (
    <Link href={href}>
      <a className="p-4 text-white no-underline text-base">{children}</a>
    </Link>
  );
};
