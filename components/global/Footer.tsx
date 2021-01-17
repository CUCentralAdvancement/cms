import React from 'react';
import { Box, Grid } from 'theme-ui';

const Footer: React.FC = () => (
  <Box sx={{ bg: '#000', p: 4 }} as="footer">
    <Grid gap={2} columns={[1, 2, 4]} sx={{ maxWidth: 1280, mx: 'auto' }}></Grid>
  </Box>
);

export default Footer;
