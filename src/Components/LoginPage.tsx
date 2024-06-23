import React, { Component, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

interface UserData {
  name: string;
  email: string;
  password: string;
}

interface State {
  name: string;
  email: string;
  password: string;
  errors: {
    name: string;
    email: string;
    password: string;
  };
}

class LoginPage extends Component<{}, State> {
  state: State = {
    name: '',
    email: '',
    password: '',
    errors: {
      name: '',
      email: '',
      password: ''
    }
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({...this.state, [name]: value });
  };

  validateForm = () => {
    const { name, email, password } = this.state;
    const errors = {
      name: name ? '' : 'Name is required',
      email: email ? '' : 'Email is required',
      password: password ? '' : 'Password is required'
    };
    this.setState({ errors });
    return !errors.name && !errors.email && !errors.password;
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (this.validateForm()) {
      const { name, email, password } = this.state;
      const savedData = localStorage.getItem('userData');
      if (savedData) {
        const registeredUsers: UserData[] = JSON.parse(savedData);
        const userExists = registeredUsers.some(
          user => user.name === name && user.email === email && user.password === password
        );
        if (userExists) {
          alert('user already exists');
          this.setState({
            name: '',
            email: '',
            password: ''
          })
        } else {
          alert('user does not match');
          this.setState({
            name: '',
            email: '',
            password: ''
          })
        }
      } else {
        alert('This data does not match');
      }
    }
  };

  render() {
    const { name, email, password, errors } = this.state;

    return (
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Login Page
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={name}
            onChange={this.handleInputChange}
            error={!!errors.name}
            helperText={errors.name}
            variant="outlined"
          />
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
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={this.handleInputChange}
            error={!!errors.password}
            helperText={errors.password}
            variant="outlined"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
        <Box width="100%" marginLeft={28} marginTop={2}>
          <li><Link to='/forgetpassword'>ResetPassword</Link></li>
          </Box>
      </Container>
      
    );
  }
}

export default LoginPage;
