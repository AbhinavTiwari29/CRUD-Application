import React, {useState} from 'react';
import { FormControl, FormGroup, Input, InputLabel, Typography, styled, Button} from '@mui/material';
import { addUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const Container=styled(FormGroup)`
width: 50%;
margin: 5% auto 0 auto;
& > div {
    margin-top: 25px;
}
`;

const defaultValues = {
    name : "",
    username : "",
    email : "",
    phone : ""
}

const AddUser = () => {

    const [user, setUser]=useState(defaultValues);

    const navigate= useNavigate();


    const onValueChange= (e) => {
        // console.log(e.target.name,e.target.value);
        setUser({...user, [e.target.name ]: e.target.value})
        // console.log(user);
    }

    const addUserDetails = async () => {
        if (user.name===""||user.email===""||user.username===""||user.phone===""){
            Swal.fire("All fields are mandatory");

        }
        else if(isNaN(user.phone)){
            Swal.fire("Only enter number for Phone");

        }
        else {
        await addUser(user);
        navigate('/all');
        }
    }

    return (
        <div>
            <Container>
                <Typography variant='h5'>Add User</Typography>
                <FormControl>
                    <InputLabel>Name</InputLabel>
                    <Input onChange={(e)=> onValueChange(e)} name="name"/>
                </FormControl>
                <FormControl>
                    <InputLabel>Username</InputLabel>
                    <Input onChange={(e)=> onValueChange(e)} name="username"/>
                </FormControl>
                <FormControl>
                    <InputLabel>Email</InputLabel>
                    <Input  onChange={(e)=> onValueChange(e)} name="email"/>
                </FormControl>
                <FormControl>
                    <InputLabel>Phone</InputLabel>
                    <Input onChange={(e)=> onValueChange(e)} name="phone"/>
                </FormControl>
                <FormControl>
                <Button variant="contained" onClick={() => addUserDetails()}>Add User</Button>
                </FormControl>
            </Container>

        </div>
    )
}

export default AddUser;