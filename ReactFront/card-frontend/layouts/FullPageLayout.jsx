
import { Box } from '@mui/material';

export default function FullPageLayout({ children }) {
  return (
    <Box sx={{ 
      minHeight: 'calc(100vh - 102px)',  
      width: '100vw',
      paddingTop: 2,  
    }}>
      {children}
    </Box>
  );
}