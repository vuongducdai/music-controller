import { Button, ButtonGroup, Stack, styled, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

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

const HomePage = () => {
  const navigate = useNavigate();

  const redirectToJoinPage = () => {
    navigate('/join');
  };

  const redirectToCreatePage = () => {
    navigate('/create');
  };

  return (
    <Container>
      <StyledStack spacing={2} justifyContent={'center'} alignItems="center">
        <Typography variant="h4">House Party</Typography>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button onClick={redirectToJoinPage}>Join a Room</Button>
          <Button onClick={redirectToCreatePage} color="secondary">
            Create a Room
          </Button>
        </ButtonGroup>
      </StyledStack>
    </Container>
  );
};

export default HomePage;
