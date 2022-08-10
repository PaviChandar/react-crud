import React, { useState } from 'react';
import { withStyles,makeStyles } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import { ClassNames } from '@emotion/react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/action';

const useStyles = styled((theme) => ({
    root: {
        marginTop : 300,
        "& > *": {
            margin : theme.spacing(1),
            width : "25px",
        },
    },
}));


const AddUser = () => {
    const classes = useStyles();
    const [state, setState] = useState({
        name : "",
        email : "",
        contact : "",
        address : "",
    });

    const [error, setError] = useState("");       //no empty field

    let navigate = useNavigate();
    let dispatch = useDispatch();
    const {name, email, contact, address} = state;

    const handleInputChange = (e) => {
        let {name, value} = e.target;
        setState({...state, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !address || !email || !contact) {
            setError("Please enter data in all input fields");
        } else {
            dispatch(addUser(state));
            navigate("/");
            setError("");
        }

    }

    return (
        <div>
            <Button style={{width : "100px", marginTop:"20px"}} variant='contained' color='secondary' 
             onClick={() => navigate("/")}>
                Go Back</Button>
            <h2>Add User</h2>
            {error && <h3 style={{color : "red"}}>{error}</h3>}
            <form className={classes.root} noValidate autoComplete='off' onSubmit={handleSubmit}>
                <TextField id="standard-basic" label="Name" value={name} name="name"
                         type="text" onChange={handleInputChange}/> <br /><br />
                <TextField id="standard-basic" label="Email" value={email} name="email"
                         type="email" onChange={handleInputChange}/> <br /><br />
                <TextField id="standard-basic" label="Contact" value={contact} name="contact"
                         type="number"  onChange={handleInputChange}/> <br /><br />
                <TextField id="standard-basic" label="Address" value={address} name="address"
                         type="text"  onChange={handleInputChange} /> <br /><br />
                <Button style={{width : "100px"}} variant='contained' color='primary' type="submit">
                    Submit</Button>
            </form>
        </div>
    );
}

export default AddUser;