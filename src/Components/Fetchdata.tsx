import React, { ChangeEvent, Component } from 'react'
import {Container,TextField, Button, Box, Typography} from '@mui/material';

interface State {
    inputdata : string;
    submiitedData: string [];
}

export default class Fetchdata extends Component <{}, State> {
    constructor(props:{}) {
        super(props);
        this.state = {
          inputdata: "",
          submiitedData: []
        }
    };
    handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({inputdata: event.target.value})
    }

    handleSubmit = () => {
        this.setState(prevState => ({
            inputdata : "",
            submiitedData: [...prevState.submiitedData, prevState.inputdata]
        }));
    }
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
       <Typography>Fetch data</Typography>
       <TextField id="outlined-basic" label="Enter data here" variant="outlined" 
         value={this.state.inputdata}
        onChange={this.handleInputChange}/>

       <Button sx={{marginTop : 2}}variant="contained" onClick={this.handleSubmit}>Submit</Button>
         {this.state.submiitedData.map((data, index) => (
            <Typography key={index}>Submited Data {index+1} : {data}</Typography>
         ))}
             </Box>
      </Container>
    )
  }
}


