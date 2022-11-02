import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

export const SortedTable = (props) => {
  const { data, labels, handleSort } = props;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {labels.map((label, index) => (
              <TableCell
                key={index}
                align={index === 0 ? 'left' : 'right'}
                onClick={() => handleSort(label)}
              >
                <b>{label}</b>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((element) => (
            <TableRow
              key={element.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {labels.map((label, index) => (
                <TableCell key={index} align={index === 0 ? 'left' : 'right'}>
                  {element[label]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SortedTable;