import { useQuery } from 'react-query';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { getNDZViolateDrones } from '../services/birdnest';

const NDZ = () => {
  const { isLoading, isError, data, error } = useQuery('ndz', getNDZViolateDrones);

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return error;
  }

  const drones = data.data;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Serial Number</TableCell>
            <TableCell align="right">x-coordinate</TableCell>
            <TableCell align="right">y-coordinate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drones.map((drone, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {drone.serial}
              </TableCell>
              <TableCell align="right">{drone.x}</TableCell>
              <TableCell align="right">{drone.y}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NDZ;
