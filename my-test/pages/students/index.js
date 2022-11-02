import { useEffect, useState } from 'react';
import orderBy from 'lodash/orderBy';
import { TablePagination } from '@mui/material';

import SortedTable from '../../Components/Table';
import { useApiRequest } from '../../hooks/useApiRequest';

export const Students = () => {
  const [students, setStudents] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderByColumnName, setOrderByColumnName] = useState('City');

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (columnName) => {
    setOrderByColumnName(columnName);
    const invertOrder = order === 'asc' ? 'desc' : 'asc'
    setOrder(orderByColumnName === columnName ? invertOrder : 'asc')
  }

  const fields = [
    'City',
    'Student',
    'Industry',
    'Interests',
  ];

  //styles
  const tableStyles = {
    minWidth: '400px',
    width: '80vw',
    margin: 'auto',
    marginTop: '5%',
  };

  return (
    <div style={tableStyles}>
      <SortedTable
        data={orderBy(students, orderByColumnName, order).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
        handleSort={handleSort}
        labels={fields}
      />
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={students.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Students;
