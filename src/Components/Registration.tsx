import React, { Component } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

interface Formdata {
  name: string,
  email : string,
  password: string
}
interface LoginState {
  name: string;
  email: string;
  password: string;
  submitted: boolean;
  values: Formdata[]
}

class Registration extends Component<{}, LoginState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      submitted: false,
     values: this.getLocalStorageData(),
    };
  }
  componentDidMount() {
    const values = this.getLocalStorageData();
    if (values.length > 0) {
      this.setState({ values, submitted: true });
    }
  }

  getLocalStorageData = (): Formdata[] => {
    const data = localStorage.getItem('formData');
    return data ? JSON.parse(data) : [];
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({...this.state, [name]: value });
  };



  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { name, email, password} = this.state;
    const Newdata : Formdata = {name,email,password}
    this.setState((prevState) =>({
      values:[...prevState.values,Newdata],
      submitted: true,
      name: "",
      email: "",
      password: "",
    }), () => {
      localStorage.setItem('formData', JSON.stringify(this.state.values));
    })
  };

  render() {
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
            Registration Form
          </Typography>
          <form onSubmit={this.handleSubmit} noValidate>
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
              value={this.state.name}
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
              value={this.state.email}
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
              value={this.state.password}
              onChange={this.handleInputChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </form>
          {this.state.submitted && (
                <Box sx={{ marginTop: '2rem' }}>
                {this.state.values.map((data,index)=>(
                <Box key={index}>
                <Typography>Full Name: {data.name}</Typography>
                <Typography>Email: {data.email}</Typography>
                <Typography>Password: {data.password}</Typography>
                </Box>
                ))}
            </Box>
        )}
    </Box>

      </Container>
    );
  }
}

export default Registration;
