import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Card, CardContent, Grid, TextField } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';

import { useApiRequest } from '../../hooks/useApiRequest';

const StudentForm = () => {
  const router = useRouter();
  const { getData, postData, patchData } = useApiRequest();
  const initialValues = {
    City: '',
    Student: '',
    Industry: '',
    Interests: '',
  };
  const [cardLabel, setCardLabel] = useState('');
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);

  useEffect(() => {
    if (router.query.id && router.query.id !== 'create') {
      getStudentData();
    } else {
      setFormValues(initialValues);
    }
  }, [router.query.id]);

  const getStudentData = async () => {
    const response = await getData(
      process.env.NEXT_PUBLIC_API_URL + '/' + router.query.id,
    );
    if (response.id) {
      setFormValues(response);
      setCardLabel('Updating ' + response.Student.split(' ')[0] + "'s info.");
    }
  };

  const handleChange = (event, field) => {
    let newValues = {
      ...formValues,
      [field]: event.target.value,
    };

    setFormValues(newValues);
  };

  const handleBack = () => {
    router.push('/students');
  };

  const showSuccess = () => {
    Swal.fire({
      title: 'Success',
      text:
        "The student's data was " + (formValues.id ? 'updated.' : 'created.'),
      icon: 'success',
      buttons: true,
      dangerMode: true,
    }).then(() => {
      router.push('/students');
    });
  };

  const showError = () => {
    Swal.fire({
      title: 'Oops',
      text: 'An network error has happened, please try again later.',
      icon: 'error',
      buttons: true,
      dangerMode: true,
    }).then(() => {});
  };

  const checkValues = () => {
    let hasErrors = false;
    let newErrorValues = { ...errors };

    if (formValues.City.length < 4) {
      newErrorValues.City = 'Must be at least 4 characters long';
      hasErrors = true;
    }
    if (formValues.City.length > 32) {
      newErrorValues.City = 'Max. 32 characters long';
      hasErrors = true;
    }

    if (formValues.Student.length < 4) {
      newErrorValues.Student = 'Must be at least 4 characters long';
      hasErrors = true;
    }

    if (formValues.Industry.length < 2) {
      newErrorValues.Industry = 'Must be at least 2 characters long';
      hasErrors = true;
    }
    if (formValues.Industry.length > 20) {
      newErrorValues.Industry = 'Max. 20 characters long';
      hasErrors = true;
    }

    if (formValues.Interests.length > 20) {
      newErrorValues.Interests = 'Max. 20 characters long';
      hasErrors = true;
    }

    if (!hasErrors) {
      setErrors(initialValues);
    } else {
      setErrors(newErrorValues);
    }

    return hasErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const hasErrors = checkValues();
    if (!hasErrors) {
      if (!formValues.id) {
        //CREATE
        const res = await postData(process.env.NEXT_PUBLIC_API_URL, formValues);
        if (res.id) {
          showSuccess();
        } else {
          showError();
        }
      } else {
        //UPDATE
        const res = await patchData(
          process.env.NEXT_PUBLIC_API_URL + '/' + formValues.id,
          formValues,
        );
        if (res.id) {
          showSuccess();
        } else {
          showError();
        }
      }
    }
  };

  //styles
  const tableStyles = {
    minWidth: '400px',
    width: '40vw',
    margin: 'auto',
    marginTop: '5%',
  };

  return (
    <div style={tableStyles}>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                  {formValues.id ? cardLabel : 'Adding a new student'}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="standard-basic"
                  label="Name"
                  value={formValues.Student}
                  variant="standard"
                  onChange={(event) => handleChange(event, 'Student')}
                  error={errors.Student.length > 0}
                  helperText={errors.Student}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="standard-basic"
                  label="City"
                  value={formValues.City}
                  variant="standard"
                  onChange={(event) => handleChange(event, 'City')}
                  error={errors.City.length > 0}
                  helperText={errors.City}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="standard-basic"
                  label="Industry"
                  value={formValues.Industry}
                  variant="standard"
                  onChange={(event) => handleChange(event, 'Industry')}
                  error={errors.Industry.length > 0}
                  helperText={errors.Industry}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="standard-basic"
                  label="Interests"
                  value={formValues.Interests}
                  variant="standard"
                  onChange={(event) => handleChange(event, 'Interests')}
                  error={errors.Interests.length > 0}
                  helperText={errors.Interests}
                  sx={{ width: '100%' }}
                />
              </Grid>

              <Grid item xs={8} style={{ marginTop: '25px' }} />

              <Grid item xs={2} style={{ marginTop: '25px' }}>
                <Button
                  color={'secondary'}
                  type="button"
                  variant="contained"
                  sx={{ width: 'auto', marginRight: '10px' }}
                  onClick={handleBack}
                >
                  <div style={{ marginTop: '2px', marginRight: '5px' }}>
                    Back
                  </div>
                  <ArrowBack fontSize={'small'} />
                </Button>
              </Grid>

              <Grid item xs={2} style={{ marginTop: '25px' }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: 'auto' }}
                >
                  <div style={{ marginTop: '2px', marginRight: '5px' }}>
                    Send
                  </div>
                  <ArrowForward fontSize={'small'} />
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentForm;
