import React from 'react';
import { useSession } from 'next-auth/client';
import { Box, Flex, Button, Heading, Link, ThemeProvider } from 'theme-ui';
import AdminHeader from './AdminHeader';
import Footer from './Footer';
import FadeIn from './FadeIn';
interface AdminLayoutProps {
  mainBg?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, mainBg }) => {
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
            <AdminHeader primaryLinks={[{ href: '/admin/spaces', label: 'Spaces' }]} />
          </Box>
          <Box
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
};

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
      <Heading as="h1" sx={{ my: 5, p: 2 }}>
        Hello, and welcome to the CMS!
      </Heading>
      <Link href="/api/auth/signin">
        <Button sx={{ p: 3 }}>Login!!</Button>
      </Link>
    </Flex>
  );
};

const theme = {
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#CFB87C',
    secondary: '#000000',
    muted: '#f6f6f9',
    gray: '#dddddf',
    lightGray: '#FEFEFE',
    highlight: 'hsla(205, 100%, 40%, 0.125)',
    error: 'red',
    link: '#298FCE',
    white: '#fff',
  },
  fonts: {
    body: '"Helvetica Neue", system-ui, sans-serif',
    heading: '"Helvetica Neue", system-ui, sans-serif',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    light: 200,
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  breakpoints: ['40em', '56em', '64em'],
  sizes: {
    avatar: 48,
  },
  radii: {
    default: 1,
    circle: 99999,
  },
  shadows: {
    card: '0 2px 6px rgba(0,0,0,.15)',
  },
  // rebass variants
  text: {
    heading: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
    },
    display: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      fontSize: [5, 6, 7],
    },
    caps: {
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
    italic: {
      'font-style': 'italic',
    },
  },
  cards: {
    primary: {
      p: 2,
      bg: 'background',
      boxShadow: 'card',
      border: '1px solid #ccc',
    },
  },
  variants: {
    avatar: {
      width: 'avatar',
      height: 'avatar',
      borderRadius: 'circle',
    },

    link: {
      color: 'primary',
    },
    nav: {
      fontSize: 1,
      fontWeight: 'bold',
      display: 'inline-block',
      p: 2,
      color: 'inherit',
      textDecoration: 'none',
      ':hover,:focus,.active': {
        color: 'primary',
      },
    },
  },
  button: {
    primary: {
      fontSize: 2,
      fontWeight: 'bold',
      color: 'background',
      bg: 'primary',
      borderRadius: 'default',
      ':hover': {
        cursor: 'pointer',
        opacity: 0.8,
      },
    },
    outline: {
      variant: 'buttons.primary',
      color: 'primary',
      bg: 'transparent',
      boxShadow: 'inset 0 0 2px',
    },
    secondary: {
      variant: 'buttons.primary',
      color: 'background',
      bg: 'secondary',
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
    },
  },
};
