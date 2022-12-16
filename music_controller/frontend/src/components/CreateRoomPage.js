import React from 'react';
import Paper from '@mui/material/Paper';
import { Controller, useForm } from 'react-hook-form';

import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { createRoom } from '../../services/api/room';
import { useHistory, useNavigate } from 'react-router-dom';

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  width: '500px',
  display: 'flex',
  padding: '20px',
}));

const CreateRoomPage = () => {
  const defaultFormValues = { guest_can_pause: '', votes_to_skip: '' };
  const navigate = useNavigate();

  const { control, handleSubmit, watch, formState, reset } = useForm({
    defaultValues: defaultFormValues,
  });

  const redirectToHomePage = () => {
    navigate('/');
  };

  const onSubmit = async (formValues) => {
    createRoom(formValues)
      .then(function (response) {
        navigate(`/room/${response.data.code}`);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  return (
    <Container>
      <Paper elevation={3}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledStack spacing={2}>
            <Typography variant="h4">Create a Room</Typography>

            <Controller
              name="guest_can_pause"
              render={({ field }) => (
                <>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Guest control of playback state:
                  </FormLabel>
                  <RadioGroup aria-label="gender" {...field}>
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Play/Pause"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No control"
                    />
                  </RadioGroup>
                </>
              )}
              control={control}
            />

            <Controller
              name="votes_to_skip"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  inputProps={{ type: 'number' }}
                  variant="outlined"
                  label={'Votes required to skip song'}
                  {...field}
                />
              )}
            />

            <Button variant="contained" type="submit">
              Create
            </Button>
            <Button variant="outlined" onClick={redirectToHomePage}>
              Back
            </Button>
          </StyledStack>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateRoomPage;
