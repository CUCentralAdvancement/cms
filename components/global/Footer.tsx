import React from 'react';
import { Box, Flex, Text, Grid, Menu, LinkButton, Link } from '@cu-advancement/component-library';
import { footerLinks } from '../../data/menus';

const PaddedText: React.FC = ({ children }) => (
  <Text sx={{ pl: [1, 0], pb: [1, 0], fontWeight: [1] }}>{children}</Text>
);

const Footer: React.FC = () => (
  <Box sx={{ bg: '#000', p: 4 }} as="footer">
    <Grid gap={2} columns={[1, 2, 4]} sx={{ maxWidth: 1280, mx: 'auto' }}></Grid>
  </Box>
);

export default Footer;
