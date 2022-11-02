import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import orderBy from 'lodash/orderBy';
import { TablePagination } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';

import SortedTable from '../../Components/Table';
import { useApiRequest } from '../../hooks/useApiRequest';

export const Students = () => {
  const [students, setStudents] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderByColumnName, setOrderByColumnName] = useState('City');
  const [loading, setLoading] = useState(true);

  const { getData, deleteData } = useApiRequest();
  const router = useRouter();

  useEffect(() => {
    getAllStudents().then(() => {
      router.prefetch('/students/create');
    });
  }, []);

  useEffect(() => {
    if (students) {
      console.log('$ DEBUG students', students);
    }
  }, [students]);

  const getAllStudents = async () => {
    setLoading(true);
    const list = await getData(process.env.NEXT_PUBLIC_API_URL);
    setStudents(list);
    setLoading(false);
  };

  const deleteStudent = async (studentId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Once deleted, you will not be able to recover this student's data!",
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const response = await deleteData(
          process.env.NEXT_PUBLIC_API_URL + '/' + studentId,
        );

        if (response.ok || response.status === 200) {
          getAllStudents();
          Swal.fire('Poof! Your student has been deleted!', {
            icon: 'success',
          });
        }
      }
    });
  };

  const editStudent = (studentId) => {
    console.log('$ DEBUG studentId', studentId);
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
    const invertOrder = order === 'asc' ? 'desc' : 'asc';
    setOrder(orderByColumnName === columnName ? invertOrder : 'asc');
  };

  const fields = ['City', 'Student', 'Industry', 'Interests'];

  //styles
  const tableStyles = {
    minWidth: '400px',
    width: '80vw',
    margin: 'auto',
    marginTop: '5%',
  };

  return (
    <div style={tableStyles}>
      {loading ? (
        <div style={{ width: '4vw', margin: 'auto' }}>
          <CircularProgress />
        </div>
      ) : (
        <SortedTable
          data={orderBy(students, orderByColumnName, order).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
          )}
          handleSort={handleSort}
          labels={fields}
          order={order}
          orderByColumnName={orderByColumnName}
          handleDelete={deleteStudent}
          handleEdit={editStudent}
        />
      )}
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
