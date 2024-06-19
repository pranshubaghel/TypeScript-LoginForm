import React, { Component } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
// import userEvent from '@testing-library/user-event';

interface ForgetPasswordState {
  email: string;
  showOTP: boolean;
  otp: string;
  generatedOTP: string;
  setpassword: string;
  confirmpassword: string;
  otpverified: boolean;

}

class ForgetPassword extends Component<{}, ForgetPasswordState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      email: '',
      showOTP: false,
      otp: '',
      generatedOTP: '',
      setpassword: '',
      confirmpassword: '',
      otpverified: false,

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
      this.setState({ showOTP: true, otpverified: false, generatedOTP: otp });
    } else {
      alert('Email does not match!');
    }
  }

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
    const { otp, generatedOTP } = this.state;

    if (otp === generatedOTP) {
      alert('OTP matches! You can now proceed to reset your password.');
      this.setState({ otp: '', otpverified: true ,showOTP:false});
    } else {
      alert('Incorrect OTP. Please try again.');
      this.setState({ otp: '' });
    }
  };

  handlepasswordreset = () => {
    const { setpassword, confirmpassword, email } = this.state;

    if (setpassword === confirmpassword) {
      const data = localStorage.getItem('formData');
      const values = data ? JSON.parse(data) : [];
      const Updatedvalues = values.map((user: { email: string, name: string, password: string }) => {
        if (user.email === email) {
          return { ...user, password: setpassword };
        }
        return user;
      });

      localStorage.setItem('formData', JSON.stringify(Updatedvalues));

      alert("password reset succesfully");
      this.setState({
        email: '',
        showOTP: false,
        otp: '',
        generatedOTP: '',
        otpverified: false,
        setpassword: '',
        confirmpassword: '',

      })
    } else {
      alert("password do not match. pls try again")
    }
  }
 

  render() {
    const { email, showOTP, otp, otpverified, setpassword, confirmpassword } = this.state;

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

          {otpverified && (
            <>
              <TextField
                variant='outlined'
                margin='normal'
                required fullWidth
                name='setpassword'
                id='setpassword'
                type='password'
                label="set password"
                value={setpassword}
                onChange={this.handleInputChange}

              />
              <TextField
                variant='outlined'
                margin='normal'
                required fullWidth
                name='confirmpassword'
                id='confirmpassword'
                type='password'
                label="confirm password"
                value={confirmpassword}
                onChange={this.handleInputChange}

              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.handlepasswordreset}

              >Submit</Button>

            </>
          )}
        </Box>
      </Container>
    );
  }
}

export default ForgetPassword;
// import { TextField, Button, Container, Typography, Box } from '@mui/material';

// interface ForgetPasswordState {
//   email: string;
//   showOTP: boolean;
//   otp: string;
//   generatedOTP: string;
//   setpassword: string;
//   confirmpassword: string;
//   otpverified: boolean;
// }

// class ForgetPassword extends Component<{}, ForgetPasswordState> {
//   constructor(props: {}) {
//     super(props);
//     this.state = {
//       email: '',
//       showOTP: false,
//       otp: '',
//       generatedOTP: '',
//       setpassword: '',
//       confirmpassword: '',
//       otpverified: false,
//     };
//   }

//   handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     this.setState((prevState) => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   handleForgetPassword = () => {
//     const { email } = this.state;
//     const data = localStorage.getItem('formData');
//     const values = data ? JSON.parse(data) : [];
//     const emailExists = values.some((data: { email: string }) => data.email === email);

//     if (emailExists) {
//       const otp = this.generateOtp();
//       console.log("Email matches. Generating OTP:", otp);
//       this.setState({ showOTP: true, otpverified: false, generatedOTP: otp });
//     } else {
//       alert('Email does not match!');
//     }
//   }

//   generateOtp = () => {
//     const digits = '0123456789';
//     let OTP = '';
//     const len = digits.length;
//     for (let i = 0; i < 4; i++) {
//       OTP += digits[Math.floor(Math.random() * len)];
//     }
//     console.log("OTP is", OTP)
//     return OTP;
//   };

//   handleOTPSubmit = () => {
//     const { otp, generatedOTP } = this.state;

//     if (otp === generatedOTP) {
//       alert('OTP matches! You can now proceed to reset your password.');
//       this.setState({ otp: '', otpverified: true, showOTP: false });
//     } else {
//       alert('Incorrect OTP. Please try again.');
//       this.setState({ otp: '' });
//     }
//   };

//   handlePasswordReset = () => {
//     const { setpassword, confirmpassword, email } = this.state;

//     if (setpassword === confirmpassword) {
//       const data = localStorage.getItem('formData');
//       const values = data ? JSON.parse(data) : [];
//       const updatedValues = values.map((user: { email: string, name: string, password: string }) => {
//         if (user.email === email) {
//           return { ...user, password: setpassword };
//         }
//         return user;
//       });

//       localStorage.setItem('formData', JSON.stringify(updatedValues));

//       alert("Password reset successfully");
//       this.setState({
//         email: '',
//         showOTP: false,
//         otp: '',
//         generatedOTP: '',
//         otpverified: false,
//         setpassword: '',
//         confirmpassword: '',
//       });
//     } else {
//       alert("Passwords do not match. Please try again.");
//     }
//   }

//   render() {
//     const { email, showOTP, otp, otpverified, setpassword, confirmpassword } = this.state;

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
//             Forget Password
//           </Typography>
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Enter your email"
//             name="email"
//             autoComplete="email"
//             value={email}
//             onChange={this.handleInputChange}
//           />
//           <Button
//             fullWidth
//             variant="contained"
//             color="primary"
//             onClick={this.handleForgetPassword}
//           >
//             Submit
//           </Button>
//           {showOTP && (
//             <Box>
//               <TextField
//                 variant="outlined"
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="otp"
//                 label="Enter OTP"
//                 name="otp"
//                 autoComplete="otp"
//                 value={otp}
//                 onChange={this.handleInputChange}
//               />
//               <Button
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//                 onClick={this.handleOTPSubmit}
//               >
//                 Verify OTP
//               </Button>
//             </Box>
//           )}
//           {otpverified && (
//             <Box>
//               <TextField
//                 variant="outlined"
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="setpassword"
//                 label="Set Password"
//                 type="password"
//                 id="setpassword"
//                 value={setpassword}
//                 onChange={this.handleInputChange}
//               />
//               <TextField
//                 variant="outlined"
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="confirmpassword"
//                 label="Confirm Password"
//                 type="password"
//                 id="confirmpassword"
//                 value={confirmpassword}
//                 onChange={this.handleInputChange}
//               />
//               <Button
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//                 onClick={this.handlePasswordReset}
//               >
//                 Reset Password
//               </Button>
//             </Box>
//           )}
//         </Box>
//       </Container>
//     );
//   }
// }

// export default ForgetPassword;

