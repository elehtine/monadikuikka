import { useQuery } from 'react-query';

import { getDrones } from './services/birdnest';

const Drone = ({ drone }) => (
  <circle cx={drone.x / 1000} cy={drone.y / 1000} r='5' fill='red' />
);

const Radar = () => {
  const { isLoading, isError, data, error } = useQuery('drones', getDrones);

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return error;
  }

  const drones = data.data;

  return (
    <svg viewBox='0 0 500 500'>
      <circle cx='250' cy='250' r='100' stroke='black' fill='none'/>
      {
        drones.map((drone, index) => (
          <Drone key={index} drone={drone} />
        ))
      }
    </svg>
  );
};

export default Radar;
