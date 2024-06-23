import React, { Component, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

interface State {
  email: string;
  otp: string;
  generatedOtp: string | null;
  emailValidated: boolean;
  otpValidated: boolean;
  password: string;
  confirmPassword: string;
  errors: {
    email: string;
    otp: string;
    password: string;
    confirmPassword: string;
  };
}

class ResetPassword extends Component<{}, State> {
  state: State = {
    email: '',
    otp: '',
    generatedOtp: null,
    emailValidated: false,
    otpValidated: false,
    password: '',
    confirmPassword: '',
    errors: {
      email: '',
      otp: '',
      password: '',
      confirmPassword: ''
    }
  };

  generateOtp = () => {
    const digits = '0123456789';
    let OTP = '';
    const len = digits.length;
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * len)];
    }
    console.log("Generated OTP:", OTP);
    return OTP;
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  };

  validateEmailForm = () => {
    const { email } = this.state;
    const errors = {
      email: email ? '' : 'Email is required',
      otp: '',
      password: '',
      confirmPassword: ''
    };
    this.setState({ errors });
    return !errors.email;
  };

  validateOtpForm = () => {
    const { otp, generatedOtp } = this.state;
    const errors = {
      email: '',
      otp: otp ? '' : 'OTP is required',
      password: '',
      confirmPassword: ''
    };
    this.setState({ errors });
    return otp === generatedOtp;
  };

  validatePasswordForm = () => {
    const { password, confirmPassword } = this.state;
    const errors = {
      email: '',
      otp: '',
      password: password ? '' : 'Password is required',
      confirmPassword: confirmPassword ? '' : 'Confirm Password is required'
    };
    if (password && confirmPassword && password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    this.setState({ errors });
    return !errors.password && !errors.confirmPassword;
  };

  handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (this.validateEmailForm()) {
      const { email } = this.state;
      const savedData = localStorage.getItem('userData');
      if (savedData) {
        const registeredUsers = JSON.parse(savedData);
        const emailExists = registeredUsers.some((user: { email: string }) => user.email === email);
        if (emailExists) {
          const otp = this.generateOtp();
          this.setState({
            emailValidated: true,
            generatedOtp: otp,
            errors: { email: '', otp: '', password: '', confirmPassword: '' }
          });
        } else {
          alert('Email does not match any registered user.');
        }
      } else {
        alert('No registered users found.');
      }
    }
  };

  handleOtpSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (this.validateOtpForm()) {
      this.setState({ otpValidated: true });
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  handlePasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (this.validatePasswordForm()) {
      const { email, password } = this.state;
      const savedData = localStorage.getItem('userData');
      console.log(savedData)
      if (savedData) {
        const registeredUsers = JSON.parse(savedData);
        const updatedUsers = registeredUsers.map((user: { email: string, password: string }) =>
          user.email === email ? { ...user, password } : user
        );
        localStorage.setItem('userData', JSON.stringify(updatedUsers));
        alert('Password reset successfully!');
        console.log(updatedUsers)
        this.setState({
          email: '',
          otp: '',
          generatedOtp: null,
          emailValidated: false,
          otpValidated: false,
          password: '',
          confirmPassword: '',
          errors: { email: '', otp: '', password: '', confirmPassword: '' }
        });
      }
    }
  };

  render() {
    const { email, otp, emailValidated, otpValidated, password, confirmPassword, errors } = this.state;

    return (
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Reset Password
        </Typography>
        {!emailValidated ? (
          <form onSubmit={this.handleEmailSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={this.handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
              variant="outlined"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Validate Email
            </Button>
          </form>
        ) : !otpValidated ? (
          <form onSubmit={this.handleOtpSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="OTP"
              name="otp"
              type="text"
              value={otp}
              onChange={this.handleInputChange}
              error={!!errors.otp}
              helperText={errors.otp}
              variant="outlined"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Verify OTP
            </Button>
          </form>
        ) : (
          <form onSubmit={this.handlePasswordSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="New Password"
              name="password"
              type="password"
              value={password}
              onChange={this.handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
              variant="outlined"
            />
            <TextField
              fullWidth
              margin="normal"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={this.handleInputChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              variant="outlined"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Reset Password
            </Button>
          </form>
        )}
      </Container>
    );
  }
}

export default ResetPassword;
