import React,{ useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { withStyles, makeStyles } from '@material-ui/core';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {useDispatch, useSelector} from "react-redux";
import { deleteUsers, loadUsers, searchUser } from '../redux/action';
import {useNavigate} from 'react-router-dom';


const useButtonStyles = makeStyles((theme) => ({
    root: {
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center',
        '& > *' : {
            margin : theme.spacing(1),
        },
    },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
// function createData(
//     name: string,
//     email: string,
//     contact: number,
//     address: string,
//     action: string,
//   ) {
//     return { name, email, contact, address, action };
//   }
//   const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
//   ];



  const useStyles = makeStyles({
      table: {
          marginTop: 300,
          minWidth: 900,
      },
  })

const Home = () => {
    const classes = useStyles();
    const buttonStyles = useButtonStyles();
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const {users} = useSelector(state => state.data)
    const [posts,setPosts] = useState([]);
    useEffect(() => {
        dispatch(loadUsers());
    }, []);
    useEffect(() => {
        setPosts(users)
    },[users])
    const handleDelete = (id) => {
        if(window.confirm("Are you sure that you want to delete the user?")) {
            dispatch(deleteUsers(id));
        }
    }

    //  const [loading, setLoading] = useState(false);

    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {              //re-rendering
      const array=users.filter((value) => {
        console.log("value : ",value)
        console.log(searchTitle)
        if(searchTitle === "") {
            return value;
        // } else if(value.name.toLowerCase().includes(searchTitle.toLowerCase())) {
        } else if(value.name.toLowerCase().includes(searchTitle.toLowerCase()) || 
        value.email.toLowerCase().includes(searchTitle.toLowerCase()) ||
        value.contact.toLowerCase().includes(searchTitle.toLowerCase())) {
            console.log("matched ",value)
            return value;   //email,contact-check
        }
    })
    setPosts(array)
}, [searchTitle]);

    return(
        <div>
            <div className={buttonStyles.root}>
                <Button variant='contained' color='primary' onClick={() => navigate("/addUser")}>
                    Add User </Button>

                    <input type="text" placeholder="Search..." 
                     onChange={(e) => setSearchTitle(e.target.value)} />
            </div>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Contact</StyledTableCell>
                <StyledTableCell align="center">Address</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
          {posts && posts.map((user) => (
            <StyledTableRow key={user.id}>
              <StyledTableCell component="th" scope="row">
                {user.name}
              </StyledTableCell>
              <StyledTableCell align="center">{user.email}</StyledTableCell>
              <StyledTableCell align="center">{user.contact}</StyledTableCell>
              <StyledTableCell align="center">{user.address}</StyledTableCell>
              <StyledTableCell align="center">
                  <div className={buttonStyles.root}>
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button style={{marginRight:'5px'}} color="primary" 
                     onClick={() => navigate(`/editUser/${user.id}`)}>EDIT</Button>
                <Button color="secondary" onClick={() => handleDelete(user.id)}>DELETE</Button>
              </ButtonGroup>
              </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    )
}

export default Home;