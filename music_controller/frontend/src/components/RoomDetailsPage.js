import React from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';

import { styled, Typography } from '@mui/material';
import { Stack } from '@mui/system';

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
  let { roomCode } = useParams();
  const { data, isValidating } = useSWR(`/get-room?code=${roomCode}`);

  if (isValidating) return <div>Loading...</div>;

  return (
    <Container>
      <StyledStack justifyContent="center" space={2} alignItems="center">
        <Typography variant="h3">{data?.code}</Typography>
        <Typography>Votes: {data?.votes_to_skip}</Typography>
        <Typography>
          Guest Can Pause: {data?.guest_can_pause.toString()}
        </Typography>
        <Typography>Host: {data?.is_host.toString()}</Typography>
      </StyledStack>
    </Container>
  );
};

export default CreateRoomPage;
