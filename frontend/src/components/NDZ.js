import { useQuery } from 'react-query';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { getViolatePilots } from '../services/birdnest';

const NDZ = () => {
  const {
    isLoading,
    isError,
    data,
    error,
  } = useQuery('ndz', getViolatePilots, { refetchInterval: 2000 });

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return error;
  }

  const pilots = data.data;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Closest Distance (meters)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pilots.map((pilot, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {`${pilot.firstName} ${pilot.lastName}`}
              </TableCell>
              <TableCell>{pilot.email}</TableCell>
              <TableCell align="right">{pilot.phoneNumber}</TableCell>
              <TableCell align="right">{Math.round(pilot.distance)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NDZ;
