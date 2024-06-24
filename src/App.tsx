import React, { Component } from 'react'
// import Fetchdata from './Components/Fetchdata'
import ToDoList from './Components/ToDoList'
// import Getdata from './Components/Getdata'

export default class App extends Component {
  render() {
    return (
      <div>
        {/* <Fetchdata/> */}
        {/* <Getdata/> */}
        <ToDoList />
      </div>
    )
  }
}


// import React, { Component } from 'react';
// import { Container, Box } from '@mui/material';
// import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
// import RegistrationForm from './Components/RegistrationForm';
// import LoginPage from './Components/LoginPage';
// import ResetPassword from './Components/ResetPassword';

// export default class App extends Component {
//   render() {
//     return (
//       <Router>
//         <Container component="main" maxWidth="lg">
//           <Box
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//             justifyContent="space-around"
//             minHeight="100vh"
//           >
//             <ul style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', listStyleType: 'none', padding: 0 }}>
//               <li><Link to='/loginpage'>Login Page</Link></li>
//               <li><Link to='/registrationform'>Registration Form</Link></li>
             
//             </ul>

//             <Routes>
//               <Route path='/registrationform' element={<RegistrationForm />} />
//               <Route path='/loginpage' element={<LoginPage />} />
//               <Route path='/forgetpassword' element={<ResetPassword />} />
//             </Routes>
//           </Box>
//         </Container>
//       </Router>
//     );
//   }
// }





