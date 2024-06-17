import React, { Component } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

interface ForgetPasswordState {
  email: string;
  showOTP: boolean;
  otp: string;
}

class ForgetPassword extends Component<{}, ForgetPasswordState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      email: '',
      showOTP: false,
      otp: '',
      
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  handleForgetPassword = () => {
    const { email } = this.state;
    const data = localStorage.getItem('formData');
    const values = data ? JSON.parse(data) : [];
    const emailExists = values.some((data: { email: string }) => data.email === email);

    if (emailExists) {
      const otp = this.generateOtp();
      console.log("Email matches. Generating OTP:", otp);
      this.setState({ showOTP: true, otp });
    } else {
      alert('Email does not match!');
    }
  };

  generateOtp = () => {
    const digits = '0123456789';
    let OTP = '';
    const len = digits.length;
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * len)];
    }
    console.log("OTP is", OTP)
    return OTP;
  };

  handleOTPSubmit = () => {
    const { otp } = this.state;
    alert(`OTP submitted: ${otp}`);
  };

  render() {
    const { email, showOTP, otp } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          marginTop="5rem"
        >
          <Typography component="h1" variant="h5">
            Forget Password
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Enter your email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={this.handleInputChange}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.handleForgetPassword}
          >
            Submit
          </Button>
          {showOTP && (
            <>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="otp"
                label="Enter OTP"
                name="otp"
                autoComplete="one-time-code"
                value={otp}
                onChange={this.handleInputChange}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.handleOTPSubmit}
              >
                Submit OTP
              </Button>
            </>
          )}
        </Box>
      </Container>
    );
  }
}

export default ForgetPassword;
