import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { register,reset } from '../../slice/Auth/AuthSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';


const theme = createTheme();

const UserRegister = () =>
{

  const {user,isSuccess,isError,message} = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();


  useEffect(() =>{
    if(isError){
        toast(message);
    }
    if(user || isSuccess){
      navigate('/');
      console.log('hellow');
    }
    dispatch(reset());
  },[user,isSuccess,isError,message,dispatch,navigate]);


  const [userData,setUserData] = useState({
        email:'',
        password:'',
  })

  const HandleChange = (e) =>{
        setUserData((initState) =>({
            ...initState,
            [e.target.name]:e.target.value
        }));
  }

  const handleSubmit = (e) => 
  {
    e.preventDefault();
    dispatch(register(userData));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5" style={{textAlign:'center'}}>
            Register User To Initiate Yoga Registration
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} action="POST" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={HandleChange}
                  value={userData['email']}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={HandleChange}
                  value={userData['password']}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}


export default UserRegister;