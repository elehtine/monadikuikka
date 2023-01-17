import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Radar from './Radar';
import NDZ from './NDZ';


const App = () => (
  <Container maxWidth="sm">
    <Box sx={{ my: 4 }}>
      <Radar />
      <NDZ />
    </Box>
  </Container>
);

export default App;
