import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Grid, TextField } from '@mui/material';

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
    }
  };

  const handleChange = (event, field) => {
    let newValues = {
      ...formValues,
      [field]: event.target.value,
    };

    setFormValues(newValues);
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
          router.push('/students');
        }
      } else {
        //UPDATE
        const res = await patchData(
          process.env.NEXT_PUBLIC_API_URL + '/' + formValues.id,
          formValues,
        );
        if (res.id) {
          router.push('/students');
        }
      }
    }
  };

  //styles
  const tableStyles = {
    minWidth: '400px',
    width: '60vw',
    margin: 'auto',
    marginTop: '5%',
  };

  return (
    <div style={tableStyles}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6} style={{ border: '1px solid'}}>
            <TextField
              id="standard-basic"
              label="Name"
              value={formValues.Student}
              variant="standard"
              onChange={(event) => handleChange(event, 'Student')}
              error={errors.Student.length > 0}
              helperText={errors.Student}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="standard-basic"
              label="City"
              value={formValues.City}
              variant="standard"
              onChange={(event) => handleChange(event, 'City')}
              error={errors.City.length > 0}
              helperText={errors.City}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="standard-basic"
              label="Industry"
              value={formValues.Industry}
              variant="standard"
              onChange={(event) => handleChange(event, 'Industry')}
              error={errors.Industry.length > 0}
              helperText={errors.Industry}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="standard-basic"
              label="Interests"
              value={formValues.Interests}
              variant="standard"
              onChange={(event) => handleChange(event, 'Interests')}
              error={errors.Interests.length > 0}
              helperText={errors.Interests}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default StudentForm;
