import React,{useState,useEffect} from 'react';
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
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login,reset } from '../../slice/Auth/AuthSlice';
import {toast} from 'react-toastify';

const theme = createTheme();

const Login = () => 
{
  const {user,isLoading,isSuccess,isError,message} = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();


  useEffect(() =>{
    if(isError){
        toast(message);
    }
    if(user){
      navigate('/');
    }
    dispatch(reset());

  },[user,isSuccess,isError,message,dispatch,navigate,reset]);
  
    const [userData,setUserData] = useState({
        email:'',
        password:''
    })

    const HandleChange = (e) =>{
      setUserData((initState) =>({
          ...initState,
          [e.target.name] : e.target.value
      }))
    }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(userData));
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
          <Typography component="h1" variant="h5">
            Login For Yoga Classes Registration
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={HandleChange}
              value={userData['email']}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={HandleChange}
              value={userData['password']}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Register"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}


export default Login;