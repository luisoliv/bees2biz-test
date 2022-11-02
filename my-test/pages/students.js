import { useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useApiRequest } from '../hooks/useApiRequest';

export const Students = () => {
  const [students, setStudents] = useState([]);
  const { getData } = useApiRequest();

  useEffect(() => {
    getAllStudents();
  }, []);

  useEffect(() => {
    if (students) {
      console.log('$ DEBUG students', students);
    }
  }, [students]);

  const getAllStudents = async () => {
    const list = await getData(process.env.NEXT_PUBLIC_API_URL);
    setStudents(list);
  };

  //styles
  const tableStyles = {
    minWidth: '400px',
    width: '80vw',
    margin: 'auto',
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table style={tableStyles}>
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <b>City</b>
              </TableCell>
              <TableCell align="right">
                <b>Student</b>
              </TableCell>
              <TableCell align="right">
                <b>Industry</b>
              </TableCell>
              <TableCell align="right">
                <b>Interests</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.length > 0 &&
              students.map((student) => (
                <TableRow
                  key={student.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">{student.City}</TableCell>
                  <TableCell align="right">{student.Student}</TableCell>
                  <TableCell align="right">{student.Industry}</TableCell>
                  <TableCell align="right">{student.Interests}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Students;
