const Drone = ({ drone }) => (
  <circle cx={drone.x / 1000} cy={drone.y / 1000} r='5' fill='red' />
);

const Radar = ({ drones }) => (
  <svg viewBox='0 0 500 500'>
    <circle cx='250' cy='250' r='100' stroke-width='2' stroke='black' fill='none'/>
    {
      drones.map(drone => (
        <Drone drone={drone} />
      ))
    }
  </svg>
);

export default Radar;
