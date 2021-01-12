import React from 'react';
// import Head from "next/head";
import { ThemeProvider } from 'theme-ui';
import { Box, Flex, theme } from '@cu-advancement/component-library';
import AdminHeader from './AdminHeader';
import Footer from './Footer';
import FadeIn from './FadeIn';

interface AdminLayoutProps {
  mainBg?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = React.forwardRef(({ children, mainBg = 'inherit' }, ref) => {
  return (
    <ThemeProvider
      theme={{
        ...theme,
        fontSizes: [12, 14, 16, 18, 20, 24, 32, 48, 64, 96],
      }}
    >
      <Flex sx={{ flexDirection: 'column', height: '100vh' }}>
        <Box sx={{ flexShrink: 0 }}>
          <AdminHeader primaryLinks={[{ href: '/admin/content', label: 'Content' }]} />
        </Box>
        <Box
          ref={ref}
          sx={{
            flex: '1 0 auto',
            bg: mainBg,
          }}
          as="main"
        >
          <FadeIn duration={0.5}>{children}</FadeIn>
        </Box>
        <Box sx={{ flexShrink: 0 }}>
          <Footer />
        </Box>
      </Flex>
    </ThemeProvider>
  );
});

AdminLayout.displayName = 'AdminLayout';

export default AdminLayout;
