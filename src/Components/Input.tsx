import React, { ChangeEvent, Component } from 'react'
import { TextField, Button, Typography, Container } from '@mui/material';

interface State {
    inputValue: string;
    submittedValue: string;
}


export default class Input extends Component<{},State> {
   state: State = {
        inputValue : "",
        submittedValue : ""
    }

    handleinputchange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({inputValue: event.target.value})
    }

    handlesubmit = () => {
        this.setState({submittedValue: this.state.inputValue,
        inputValue : ''

        });
         
    }
    render() {
        return (
            <Container>
                <TextField id="outlined-basic"
                    label="enter data"
                    variant="outlined"
                    fullWidth
                    value = {this.state.inputValue}
                    onChange={this.handleinputchange}
                    margin="normal" />
                <Button variant="contained" onClick={this.handlesubmit}>Submit</Button>
                {this.state.submittedValue && (
                      <Typography variant="h6" style={{ marginTop: '20px' }}>
                     submitteddata: {this.state.submittedValue}
                    </Typography>
                )}
            </Container>

        )
    }
}
