import {
  Button,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { joinRoom } from '../../services/api/room';

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

const RoomJoinPage = () => {
  const [roomCode, setRoomCode] = useState('');
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  const handleSubmit = () => {
    const result = {
      code: roomCode,
    };

    joinRoom(result)
      .then(function (response) {
        // handle success
        navigate(`/room/${roomCode}`);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const handleChange = (e) => {
    setRoomCode(e.target.value);
  };

  return (
    <Container>
      <Paper elevation={3}>
        <StyledStack spacing={2}>
          <Typography variant="h4">Join a Room</Typography>
          <TextField
            id="outlined-basic"
            label="Enter a Room Code"
            variant="outlined"
            onChange={handleChange}
            value={roomCode}
          />
          <Stack direction="row" spacing={1} justifyContent="end">
            <Button variant="outlined" onClick={handleGoBack}>
              Back
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Enter Room
            </Button>
          </Stack>
        </StyledStack>
      </Paper>
    </Container>
  );
};

export default RoomJoinPage;
