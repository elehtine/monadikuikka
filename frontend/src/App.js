import {
  useQuery,
} from 'react-query';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { getDrones } from './services/birdnest';
import Radar from './Radar';


const App = () => {
  const { isLoading, isError, data, error } = useQuery('drones', getDrones);

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return error;
  }

  const drones = data.data;

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Radar drones={drones} />
        Hello World!
      </Box>
    </Container>
  );
};

export default App;
