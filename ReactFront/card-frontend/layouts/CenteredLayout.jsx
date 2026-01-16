import { Box } from '@mui/material';

export default function CenteredLayout({ children }) {
  return (
    <Box
        sx= {{ 
              position: 'relative',
              height: 'calc(100vh - 102px)',
              width: '100vw',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxSizing: 'border-box',
              paddingRight: 4,
          }}

    >
      {children}
    </Box>
  );
}
