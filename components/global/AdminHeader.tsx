import React from 'react';
import Link from 'next/link';
import { Flex, Box } from '@cu-advancement/component-library';

type Link = {
  href: string;
  label: string;
};

type AdminHeaderProps = {
  primaryLinks: Array<Link>;
};

const AdminHeader: React.FC<AdminHeaderProps> = ({ primaryLinks }) => {
  return (
    <Flex
      as="header"
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        variant: 'styles.header',
        backgroundColor: '#000',
        color: '#fff',
        p: 3,
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
      <Box>
        <NavLink href="/profile">Profile</NavLink>
        <NavLink href="/api/logout">Log Out</NavLink>
      </Box>
    </Flex>
  );
};

export default AdminHeader;

type NavLinkProps = {
  href: string;
};

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
