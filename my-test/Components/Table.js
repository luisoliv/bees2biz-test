import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableContainer from '@mui/material/TableContainer';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const SortedTable = (props) => {
  const {
    data,
    labels,
    handleSort,
    order,
    orderByColumnName,
    handleCreate,
    handleEdit,
    handleDelete,
  } = props;

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

            {(handleEdit || handleDelete) && (
              <TableCell
                align="right"
                style={{ maxWidth: '100px' }}
              ></TableCell>
            )}
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

              {(handleEdit || handleDelete) && (
                <TableCell align="right" style={{ maxWidth: '100px' }}>
                  {handleEdit && (
                    <IconButton
                      aria-label="upload picture"
                      component="label"
                      onClick={() => handleEdit(element.id)}
                    >
                      <EditIcon fontSize={'small'} />
                    </IconButton>
                  )}

                  {handleDelete && (
                    <IconButton
                      aria-label="upload picture"
                      component="label"
                      onClick={() => handleDelete(element.id)}
                    >
                      <DeleteIcon fontSize={'small'} />
                    </IconButton>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SortedTable;
