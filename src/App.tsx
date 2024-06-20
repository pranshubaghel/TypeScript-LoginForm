
// import React from 'react';
// import './App.css';
// import { Container, Box } from '@mui/material';
// import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
// import ForgetPassword from './Components/ForgetPassword';
// import Registration from './Components/Registration';
// import Login from './Components/Login';

// function App() {
//   return (
//     <Router>
//       <Container component="main" maxWidth="lg">
//         <Box
//           display="flex"
//           flexDirection="column"
//           alignItems="center"
//           justifyContent="space-around"
//           minHeight="100vh"
//         >
//           <ul style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', listStyleType: 'none', padding: 0 }}>
//             <li><Link to='/loginpage'>LOGINPAGE</Link></li>
//             <li><Link to='/registrationform'>Registartion form</Link></li>
//           </ul>

//           <Routes>
//             <Route path='/registrationform' element={<Registration />} />
//             <Route path='/loginpage' element={<Login />} />
//             <Route path='/forgetpassword' element={<ForgetPassword />} />
//           </Routes>
//         </Box>
//       </Container>
//     </Router>
//   );
// }

// export default App;

import React, { Component } from 'react'
// import ForgetPassword from './Components/ForgetPassword'
// import Registration from './Components/Registration'
import RegistrationForm from './Components/RegistrationForm'
import LoginPage from './Components/LoginPage'
import ResetPassword from './Components/ResetPassword'

export default class App extends Component {
  render() {
    return (
      <div>
        {/* <ForgetPassword/> */}
        <RegistrationForm/>
        <LoginPage/>
        <ResetPassword/>
            </div>
    )
  }
}




