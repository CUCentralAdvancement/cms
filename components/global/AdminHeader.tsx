import React from 'react';
import Link from 'next/link';
import { Flex, Box, Button } from 'theme-ui';
import { Link as LinkType } from '../../data/types';
import { signOut, useSession } from 'next-auth/client';
interface AdminHeaderProps {
  primaryLinks: Array<LinkType>;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ primaryLinks }) => {
  const [session] = useSession();
  return (
    <Flex
      as="header"
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        variant: 'styles.header',
        backgroundColor: '#000',
        color: '#fff',
        p: 1,
        flexDirection: ['column', 'row'],
      }}
    >
      <Box>
        {primaryLinks &&
          primaryLinks.map((el, index) => {
            return (
              <NavLink key={index} href={el.href}>
                {el.label}
              </NavLink>
            );
          })}
      </Box>
      <Flex sx={{ justifyContent: 'space-between' }}>
        <Link href="/">
          <a>
            <img
              style={{ marginRight: '12px', paddingTop: '6px' }}
              height="50px"
              src={session.user.image}
              alt="profile"
            />
          </a>
        </Link>
        <Link href="/api/auth/signin">
          <Button data-testid="logout-button">Log Out</Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default AdminHeader;
interface NavLinkProps {
  href: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  return (
    <Link href={href}>
      <a
        style={{
          padding: '1rem',
          color: '#fff',
          textDecoration: 'none',
          fontSize: 20,
        }}
      >
        {children}
      </a>
    </Link>
  );
};
