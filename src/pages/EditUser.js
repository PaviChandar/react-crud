import React, { useState,useEffect } from 'react';
import { withStyles,makeStyles } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import { ClassNames } from '@emotion/react';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { getSingleUser, updateUser } from '../redux/action';

const useStyles = styled((theme) => ({
    root: {
        marginTop : 300,
        "& > *": {
            margin : theme.spacing(1),
            width : "25px",
        },
    },
}));


const EditUser = () => {
    const classes = useStyles();
    const [state, setState] = useState({
        name : "",
        email : "",
        contact : "",
        address : "",
    });

    const [error, setError] = useState("");       //no empty field
    let {id} = useParams();
    const {user} = useSelector((state) => state.data);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const {name, email, contact, address} = state;

    useEffect(() => {
        dispatch(getSingleUser(id));
    }, []);

    useEffect(() => {
        if(user) {
            setState({ ...user});        //already filled in for user to edit
        }
    }, [user]);

    const handleInputChange = (e) => {
        let {name, value} = e.target;
        setState({...state, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !address || !email || !contact) {
            setError("Please enter data in all input fields");
        } else {
            dispatch(updateUser(state, id));
            navigate("/");
            setError("");
        }

    }

    return (
        <div>
            <Button style={{width : "100px", marginTop:"20px"}} variant='contained' color='secondary' 
             onClick={() => navigate("/")}>
                Go Back</Button>
            <h2>Edit User</h2>
            {error && <h3 style={{color : "red"}}>{error}</h3>}
            <form className={classes.root} noValidate autoComplete='off' onSubmit={handleSubmit}>
                <TextField id="standard-basic" label="Name" value={name || ""} name="name"
                         type="text" onChange={handleInputChange}/> <br /><br />
                <TextField id="standard-basic" label="Email" value={email || ""} name="email"
                         type="email" onChange={handleInputChange}/> <br /><br />
                <TextField id="standard-basic" label="Contact" value={contact || ""} name="contact"
                         type="number"  onChange={handleInputChange}/> <br /><br />
                <TextField id="standard-basic" label="Address" value={address || ""} name="address"
                         type="text"  onChange={handleInputChange} /> <br /><br />
                <Button style={{width : "100px"}} variant='contained' color='primary' type="submit">
                    Update</Button>
            </form>
        </div>
    );
}

export default EditUser;