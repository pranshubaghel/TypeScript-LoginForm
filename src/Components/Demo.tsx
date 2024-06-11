import { Box, Button, TextField, Typography } from '@mui/material';
import React, { Component, ChangeEvent } from 'react';

interface FormData {
    fullName: string;
    email: string;
    password: string;
}

interface State {
    fullName: string;
    email: string;
    password: string;
    showData: boolean;
    values: FormData[];
}

export default class SignIn extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            fullName: '',
            email: '',
            password: '',
            showData: true,
            values: [],
        };
    }

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        } as unknown as Pick<State, keyof State>);
    };

    // handleSubmit = () => {
    //     this.setState({ showData: true });
    //     console.log(this.state);
    // };

    handleSubmit = () => {
        const { fullName, email, password } = this.state;
        const newEntry: FormData = { fullName, email, password }
        this.setState((prevState) => ({
            values: [...prevState.values, newEntry],
            showData: true,
            fullName: '',
            email: '',
            password: '',
        }), () => {
            


            this.saveToLocalStorage();


        });

    }

   
   

    componentDidMount() {
        // Check local storage and set values
        const users = localStorage.getItem('users');
        // console.log( users && JSON.parse(users))
            this.setState((prev)=>{ 
                return {...prev, values: users? JSON.parse(users) : [] }
            } , ()=>console.log(this.state.values))
    }


    saveToLocalStorage = (): void => {
        const usersJSON = JSON.stringify(this.state.values);
        localStorage.setItem('users', usersJSON);
    };


    handleButtonClick = () => {
        this.handleSubmit();
    
    }


    render() {
        return (
            <Box sx={{ height: 'auto', width: '20%', border: '2px solid red', padding: '4rem' }}>
                <TextField
                    margin="normal"
                    label="Full Name"
                    name="fullName"
                    value={this.state.fullName}
                    onChange={this.handleChange}
                />
                <TextField
                    margin="normal"
                    label="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                />
                <TextField
                    margin="normal"
                    label="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    type="password"
                />
                <Button variant="contained" onClick={this.handleButtonClick} >Sign In</Button>

                {this.state.showData && (
                    <Box sx={{ marginTop: '2rem' }}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '2rem' }}>Data Sumbitted</Typography>
                        {this.state.values.map((entry, index) => (
                            <Box key={index}>

                                <Typography>Full Name: {entry.fullName}</Typography>
                                <Typography>Email: {entry.email}</Typography>
                                <Typography>Password: {entry.password}</Typography>
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>



        );
    }
}