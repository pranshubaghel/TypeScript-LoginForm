import React, { Component, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

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
  submittedData: UserData[];
}

class RegistrationForm extends Component<{}, State> {
  state: State = {
    name: '',
    email: '',
    password: '',
    errors: {
      name: '',
      email: '',
      password: ''
    },
    submittedData: []
  };

  componentDidMount() {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      try {
        const parsedData: UserData[] = JSON.parse(savedData);
        if (Array.isArray(parsedData)) {
          this.setState({ submittedData: parsedData });
        }
      } catch (e) {
        console.error("Error parsing saved data from localStorage", e);
      }
    }
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  };

  validateForm = () => {
    const { name, email, password, submittedData } = this.state;
    const errors = {
      name: name ? '' : 'Name is required',
      email: email ? '' : 'Email is required',
      password: password ? '' : 'Password is required'
    };

    // Check if email already exists
    const emailExists = submittedData.some(data => data.email === email);
    if (emailExists) {
      errors.email = 'Email already exists';
    }

    this.setState({ errors });
    return !errors.name && !errors.email && !errors.password;
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (this.validateForm()) {
      const { name, email, password, submittedData } = this.state;
      const newUserData: UserData = { name, email, password };

      // Check if email already exists before saving
      const emailExists = submittedData.some(data => data.email === email);
      if (emailExists) {
        alert('Email already exists! Please use a different email.');
        return;
      }

      const updatedSubmittedData = [...submittedData, newUserData];
      localStorage.setItem('userData', JSON.stringify(updatedSubmittedData));
      this.setState({
        submittedData: updatedSubmittedData,
        name: '',
        email: '',
        password: '',
        errors: { name: '', email: '', password: '' }
      });
      alert('Registration Successful!');
    }
  };

  render() {
    const { name, email, password, errors, submittedData } = this.state;

    return (
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Registration Form
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
            Register
          </Button>
        </form>
        {submittedData.length > 0 && (
          <Box mt={4}>
            <Typography variant="h6">Submitted Data:</Typography>
            {submittedData.map((data, index) => (
              <Box key={index} mb={2}>
                <Typography>Name: {data.name}</Typography>
                <Typography>Email: {data.email}</Typography>
                <Typography>Password: {data.password}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </Container>
    );
  }
}

export default RegistrationForm;
