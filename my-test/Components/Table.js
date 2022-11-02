import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableContainer from '@mui/material/TableContainer';

export const SortedTable = (props) => {
  const { data, labels, handleSort, order, orderByColumnName } = props;

  const arrowStyles = {
    marginBottom: -4,
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {labels.map((label, index) => (
              <TableCell
                key={index}
                align={index === 0 ? 'left' : 'right'}
                style={{ maxWidth: '100px' }}
              >
                <TableSortLabel
                  active={orderByColumnName === label}
                  direction={orderByColumnName === label ? order : 'desc'}
                  onClick={() => handleSort(label)}
                >
                  <b>{label}</b>
                </TableSortLabel>
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
                <TableCell
                  key={index}
                  align={index === 0 ? 'left' : 'right'}
                  style={{ maxWidth: '100px' }}
                >
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
