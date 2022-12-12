import React from 'react';
import { userDetails } from '../../slice/Auth/AuthSlice';
import { useSelector,useDispatch } from 'react-redux';
import { Container, Stack } from '@mui/system';
import { Button, Typography } from '@mui/material';
import { logout } from '../../slice/Auth/AuthSlice';

const Success = () => 
{
    const {details} = useSelector((state) => state.details);
    const dispatch = useDispatch();

  return (
    <Container maxWidth="sm">
    <Typography
      component="h1"
      variant="h2"
      align="center"
      color="text.primary"
      gutterBottom
    >
      Your Registration is Successfull.
    </Typography>
    <Typography variant="h5" align="center" color="text.secondary" paragraph>Name : {details.detail.name}</Typography>
    <Typography variant="h5" align="center" color="text.secondary" paragraph>Email : {details.detail.email}</Typography>
    <Typography variant="h5" align="center" color="text.secondary" paragraph>Mobile Number : {details.detail.mobile_no}</Typography>
    <Typography variant="h5" align="center" color="text.secondary" paragraph>Age : {details.detail.age}</Typography>
    <Typography variant="h5" align="center" color="text.secondary" paragraph>Schedule : {details.detail.schedule}</Typography>
    
    <Button fullWidth type="button" onClick={(e) => dispatch(logout())} variant="contained" sx={{ mt: 3, ml: 1 }}>Logout</Button>
  </Container>
  )
}

export default Success;