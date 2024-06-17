import React, { Component } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

interface Formdata {
  name: string;
  email: string;
  password: string;
}

interface LoginState {
  name: string;
  email: string;
  password: string;
  submitted: boolean;
  values: Formdata[];
  errors: {
    name?: string;
    email?: string;
    password?: string;
  };
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
      errors: {},
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
    this.setState({...this.state ,[name] : value });
  };

  validateForm = (): boolean => {
    const { name, email, password } = this.state;
    const errors: { [key: string]: string } = {};

    if (!name) errors.name = "Name is required";
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!this.validateForm()) {
      return;
    }

    const { name, email, password, values } = this.state;
    const newdata: Formdata = { name, email, password };

    const dataExists = values.some(
      (data) => data.name === name && data.email === email && data.password === password
    );

    if (dataExists) {
      alert("This data already exists");
      return;
    }

    this.setState(
      (prevState) => ({
        values: [...prevState.values, newdata],
        submitted: true,
        name: '',
        email: '',
        password: '',
        errors: {},
      }),
      () => {
        localStorage.setItem('formData', JSON.stringify(this.state.values));
      }
    );
  };

  render() {
    const { name, email, password, errors } = this.state;

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
              value={name}
              onChange={this.handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
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
              error={!!errors.email}
              helperText={errors.email}
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
              error={!!errors.password}
              helperText={errors.password}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Submit
            </Button>
          </form>
          {this.state.submitted && (
            <Box sx={{ marginTop: '2rem' }}>
              {this.state.values.map((data, index) => (
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
// import React, { Component } from 'react';
// import { TextField, Button, Container, Typography, Box } from '@mui/material';

// interface Formdata {
//   name: string;
//   email: string;
//   password: string;
// }

// interface RegistrationState {
//   name: string;
//   email: string;
//   password: string;
//   submitted: boolean;
//   values: Formdata[];
//   errors: {
//     name?: string;
//     email?: string;
//     password?: string;
//   };
//   forgetEmail: string;
//   forgetEmailMatched: boolean;
// }

// class Registration extends Component<{}, RegistrationState> {
//   constructor(props: {}) {
//     super(props);
//     this.state = {
//       name: '',
//       email: '',
//       password: '',
//       submitted: false,
//       values: this.getLocalStorageData(),
//       errors: {},
//       forgetEmail: '',
//       forgetEmailMatched: false,
//     };
//   }

//   componentDidMount() {
//     const values = this.getLocalStorageData();
//     if (values.length > 0) {
//       this.setState({ values, submitted: true });
//     }
//   }

//   getLocalStorageData = (): Formdata[] => {
//     const data = localStorage.getItem('formData');
//     return data ? JSON.parse(data) : [];
//   };

//   handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     this.setState((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   validateForm = (): boolean => {
//     const { name, email, password } = this.state;
//     const errors: { [key: string]: string } = {};

//     if (!name) errors.name = 'Name is required';
//     if (!email) errors.email = 'Email is required';
//     if (!password) errors.password = 'Password is required';

//     this.setState({ errors });
//     return Object.keys(errors).length === 0;
//   };

//   handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     if (!this.validateForm()) {
//       return;
//     }

//     const { name, email, password, values } = this.state;
//     const newdata: Formdata = { name, email, password };

//     const dataExists = values.some(
//       (data) => data.name === name && data.email === email && data.password === password
//     );

//     if (dataExists) {
//       alert('This data already exists');
//       return;
//     }

//     this.setState(
//       (prevState) => ({
//         values: [...prevState.values, newdata],
//         submitted: true,
//         name: '',
//         email: '',
//         password: '',
//         errors: {},
//       }),
//       () => {
//         localStorage.setItem('formData', JSON.stringify(this.state.values));
//       }
//     );
//   };

//   handleForgetPassword = () => {
//     const { forgetEmail, values } = this.state;
//     const dataExists = values.some((data) => data.email === forgetEmail);

//     if (dataExists) {
//       alert('Email matched!'); // Replace with your forget password logic
//       this.setState({ forgetEmailMatched: true });
//     } else {
//       alert('Email does not match!');
//       this.setState({ forgetEmailMatched: false });
//     }
//   };

//   render() {
//     const { name, email, password, errors, submitted, values, forgetEmail, forgetEmailMatched } = this.state;

//     return (
//       <Container component="main" maxWidth="xs">
//         <Box
//           display="flex"
//           flexDirection="column"
//           alignItems="center"
//           justifyContent="center"
//           minHeight="100vh"
//           marginTop="5rem"
//         >
//           <Typography component="h1" variant="h5">
//             Registration Form
//           </Typography>
//           <form onSubmit={this.handleSubmit} noValidate>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="name"
//               label="Name"
//               name="name"
//               autoComplete="name"
//               autoFocus
//               value={name}
//               onChange={this.handleInputChange}
//               error={!!errors.name}
//               helperText={errors.name}
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email"
//               name="email"
//               autoComplete="email"
//               value={email}
//               onChange={this.handleInputChange}
//               error={!!errors.email}
//               helperText={errors.email}
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               value={password}
//               onChange={this.handleInputChange}
//               error={!!errors.password}
//               helperText={errors.password}
//             />
//             <Button type="submit" fullWidth variant="contained" color="primary">
//               Submit
//             </Button>
//           </form>

//           {/* Forget Password Section */}
//           <Box mt={4}>
//             <Typography component="h2" variant="h6">
//               Forget Password
//             </Typography>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="forgetEmail"
//               label="Enter your email"
//               name="forgetEmail"
//               autoComplete="email"
//               value={forgetEmail}
//               onChange={this.handleInputChange}
//             />
//             <Button
//               fullWidth
//               variant="contained"
//               color="primary"
//               onClick={this.handleForgetPassword}
//             >
//               Submit
//             </Button>
//             {forgetEmailMatched && (
//               <Typography color="primary" mt={2}>
//                 Email matched! Proceed with password reset logic.
//               </Typography>
//             )}
//           </Box>

//           {/* Submitted Data Section */}
//           {submitted && (
//             <Box mt={4}>
//               {values.map((data, index) => (
//                 <Box key={index} my={1}>
//                   <Typography>Full Name: {data.name}</Typography>
//                   <Typography>Email: {data.email}</Typography>
//                   <Typography>Password: {data.password}</Typography>
//                 </Box>
//               ))}
//             </Box>
//           )}
//         </Box>
//       </Container>
//     );
//   }
// }

// export default Registration;
 
