import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, InputLabel } from '@mui/material';
import { useSelector,useDispatch } from 'react-redux';
import { registerForClass,resetDetailsReset} from '../../slice/Register/RegsisterSlice';
import { useEffect } from 'react';
import {toast} from 'react-toastify';

const Form = ({handleNext}) => 
{
    const {user} = useSelector((state) => state.user);

    const {details,isLoading,isSuccess,isFail,message}  = useSelector((state) => state.details);

    const dispatch = useDispatch();

    useEffect(() =>{
        if(isFail){
            console.log('hheooe');
            toast(message);
        }
        if(details){
            handleNext();
        }
        dispatch(resetDetailsReset());
    },[dispatch,details,isSuccess,isFail,message])


    const [userData,setUserData] = useState({
        userId:user.userId,
        name:'',
        email:user.email,
        mobile_no:'',
        age:0,
        schedule:''
    });

    const HandleChange = (e) =>{
        setUserData((initState) =>({
            ...initState,
            [e.target.name]:e.target.value
        }))
    }; 


    const HandleSubmit = (e) =>{
        e.preventDefault();
        console.log(userData);
        dispatch(registerForClass(userData));
    }


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Regitser for Yoga classes
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            autoFocus
            id="Name"
            label="Name"
            variant="standard"
            name="name"
            fullWidth
            onChange={HandleChange}
            value={userData['name']}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            variant="standard"
            onChange={HandleChange}
            value={userData['email']}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            name="mobile_no"
            id="mobile_no"
            label="Mobile Number"
            variant="standard"
            onChange={HandleChange}
            value={userData['mobile_no']}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            type="number"
            id="age"
            label="Age"
            name="age"
            variant="standard"
            onChange={HandleChange}
            value={userData['age']}
          />
        </Grid>
        <Grid item xs={12} md={6}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Enter Schedule*</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="Schedule"
            name="schedule"
            value={userData['schedule']}
            label="Enter Schedule"
            onChange={HandleChange}
            >
            <MenuItem value={'6-7AM'}>6 AM - 7 AM</MenuItem>
            <MenuItem value={'7-8AM'}>7 AM - 8 AM</MenuItem>
            <MenuItem value={'8-9AM'}>8 AM - 9 AM</MenuItem>
            <MenuItem value={'5-6PM'}>5 PM - 6 PM</MenuItem>
            </Select>
        </FormControl>
        </Grid>
      </Grid>
      <Button  fullWidth onClick={HandleSubmit} variant="contained" sx={{ mt: 3, ml: 1 }}>Register</Button>
    </React.Fragment>
  );
}


export default Form;