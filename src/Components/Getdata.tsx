import React, { Component } from 'react'
import {Container,TextField, Button, Box, Typography} from '@mui/material';

export default class Getdata extends Component {
  render() {
    return (
        <Container component="main" maxWidth= "lg">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          marginTop="5rem"
        >
       <Typography>Get data data</Typography>
       <TextField id="outlined-basic" label="Enter data here" variant="outlined" />
       {/* <Button sx={{marginTop : 2}}variant="contained">Submit</Button> */}
       </Box>
      </Container>
    )
  }
}
