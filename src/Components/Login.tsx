import React, { Component } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
// import ForgetPassword from './ForgetPassword';
import { Link } from 'react-router-dom';


interface FormData {
  name: string;
  email: string;
  password: string;
}

interface LoginState {
  name: string;
  email: string;
  password: string;
}

class Login extends Component<{}, LoginState> {
  state: LoginState = {
    name: '',
    email: '',
    password: ''
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const savedData = localStorage.getItem('formData');
    let isUserExist: boolean = false;

    if (savedData) {
      const parsedData: FormData[] = JSON.parse(savedData);
      for (let data of parsedData) {
        if (data.name === name && data.email === email && data.password === password) {
          isUserExist = true;
          break;
        }
      }
    }

    alert(isUserExist ? 'This data is already saved' : 'No matching data found');
  };

  render() {
    const { name, email, password } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
          <Typography component="h1" variant="h5">Log In</Typography>
          <form onSubmit={this.handleSubmit} style={{ width: '100%' }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={this.handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={this.handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={this.handleInputChange}
            />
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>Submit</Button>
          </form>
          <Box width="100%" marginLeft={33} marginTop={2}>
          <li><Link to='/forgetpassword'>ForgetPassword</Link></li>
          </Box>
        </Box>
      </Container>
    );
  }
}

export default Login;
