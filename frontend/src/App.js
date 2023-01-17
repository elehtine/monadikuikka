import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Radar from './components/Radar';
import NDZ from './components/NDZ';


const App = () => (
  <Container maxWidth="sm">
    <Box sx={{ my: 4 }}>
      <Radar />
      <NDZ />
    </Box>
  </Container>
);

export default App;
