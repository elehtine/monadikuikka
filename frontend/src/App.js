import {
  useQuery,
} from 'react-query';

import { getDrones } from './services/birdnest';


const App = () => {
  const { isLoading, isError, data, error } = useQuery('drones', getDrones);

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return error;
  }

  return (
    <div>
      {JSON.stringify(data.data)}
    </div>
  );
};

export default App;
