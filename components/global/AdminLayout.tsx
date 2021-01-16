import React from 'react';
// import Head from "next/head";
import { signIn, useSession } from 'next-auth/client';
import { ThemeProvider } from 'theme-ui';
import { Box, Flex, Button, Heading, theme } from '@cu-advancement/component-library';
import AdminHeader from './AdminHeader';
import Footer from './Footer';
import FadeIn from './FadeIn';
interface AdminLayoutProps {
  mainBg?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = React.forwardRef(({ children, mainBg }, ref) => {
  const [session] = useSession();

  return (
    <ThemeProvider
      theme={{
        ...theme,
        fontSizes: [12, 14, 16, 18, 20, 24, 32, 48, 64, 96],
      }}
    >
      {!session && <LoginPrompt />}
      {session && (
        <Flex sx={{ flexDirection: 'column', height: '100vh' }}>
          <Box sx={{ flexShrink: 0 }}>
            <AdminHeader primaryLinks={[{ href: '/admin/content', label: 'Content' }]} />
          </Box>
          <Box
            ref={ref}
            sx={{
              flex: '1 0 auto',
              bg: mainBg ?? 'inherit',
            }}
            as="main"
          >
            <FadeIn duration={0.5}>{children}</FadeIn>
          </Box>
          <Box sx={{ flexShrink: 0 }}>
            <Footer />
          </Box>
        </Flex>
      )}
    </ThemeProvider>
  );
});

AdminLayout.displayName = 'AdminLayout';

export default AdminLayout;

const LoginPrompt: React.FC = () => {
  return (
    <Flex
      sx={{
        maxWidth: '960px',
        mx: 'auto',
        mt: 4,
        flexDirection: 'column',
        fontSize: 4,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <img width="640px" src="/logo.svg" alt="CU Advancement Logo" />
      <Heading sx={{ my: 5, p: 2 }}>Hello, and welcome to the CMS!</Heading>
      <Button sx={{ p: 3 }} onClick={signIn}>
        Login!!
      </Button>
    </Flex>
  );
};
