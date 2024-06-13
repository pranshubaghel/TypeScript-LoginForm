import React, { Component, ChangeEvent } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

interface State {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
  step: number;
  error: string;
}

export default class ForgetPassword extends Component<{}, State> {
  state: State = {
    email: '',
    otp: '',
    password: '',
    confirmPassword: '',
    step: 1,
    error: ''
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  handleSubmit = () => {
    const { email, otp, password, confirmPassword, step } = this.state;
    if (step === 1) {
      if (!email) {
        this.setState({ error: 'Email is required' });
        return;
      }
      console.log("OTP sent to:", email);
      this.setState({ step: 2, error: '' });
    } else if (step === 2) {
      if (!otp) {
        this.setState({ error: 'OTP is required' });
        return;
      }
      console.log("OTP entered:", otp);
      this.setState({ step: 3, error: '' });
    } else if (step === 3) {
      if (!password || !confirmPassword) {
        this.setState({ error: 'Both password fields are required' });
        return;
      }
      if (password !== confirmPassword) {
        this.setState({ error: "Passwords do not match" });
        return;
      }
      console.log("Password has been reset to:", password);
      this.setState({ step: 4, error: '' });
      setTimeout(() => {
        this.setState({
          email: '',
          otp: '',
          password: '',
          confirmPassword: '',
          step: 1
        });
      }, 3000); // Adjust timeout value as needed
    }
  };
    
  

  render() {
    const { email, otp, password, confirmPassword, step, error } = this.state;

    return (
      <Container maxWidth="sm">
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <PermIdentityOutlinedIcon fontSize="large" />
          <Typography component="h1" variant="h5">
            {step === 1 ? 'Forget Password' : step === 2 ? 'Verify OTP' : step === 3 ? 'Set Password' : 'Success'}
          </Typography>
          <Box sx={{ mt: 1 }}>
            {step === 1 && (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={this.handleChange}
              />
            )}
            {step === 2 && (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="otp"
                label="OTP"
                name="otp"
                autoFocus
                value={otp}
                onChange={this.handleChange}
              />
            )}
            {step === 3 && (
              <>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="New Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={this.handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={this.handleChange}
                />
              </>
            )}
            {error && <Typography color="error">{error}</Typography>}
            {step === 4 && (
              <Typography variant="body1">
                Your password has been successfully reset.
              </Typography>
            )}
            {step < 4 && (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
              >
                {step === 1 ? 'Send OTP' : step === 2 ? 'Verify OTP' : 'Set Password'}
              </Button>
            )}
          </Box>
        </Box>
    </Container>
    );
  }
}
// import React, { Component } from 'react'
// import { Button, TextField, Container, Typography, Box } from '@mui/material';

// interface State {
//   email: string;
//   otp: string;
//   password: string;
//   confirmpassword : string;
//   step : number;
//   error : string;
// }

// export default class ForgetPassword extends Component<{}, State> {
// constructor(props : {}){
//   super(props);
//   this.state = {
//     email : '',
//     otp : '',
//     password : '',
//     confirmpassword: '',
//     step : 1,
//     error : ''

//   }

// }

//   render() {
//     return (
//     <Box
//     sx={eewgr}
//       <TextField id="outlined-basic" label="email" variant="outlined" />
    
//     </Box>
//   );
// }
// }
  
