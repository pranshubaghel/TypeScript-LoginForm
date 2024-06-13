import React from 'react';
import './App.css';
import {Container,Box} from '@mui/material';
// import Sidebar from './Components/Sidebar';
// import ForgetPassword from './Components/ForgetPassword';

import Registration from './Components/Registration';
import Login from './Components/Login';

function App() {
  return (
    <Container component="main" maxWidth="lg">
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-around"
      minHeight="100vh"
    >
      <Registration />
      <Login />
    </Box>
  </Container>
  );
}

export default App;
