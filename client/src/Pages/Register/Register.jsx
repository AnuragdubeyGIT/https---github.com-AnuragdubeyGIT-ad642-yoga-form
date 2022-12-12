import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { registrationDetails,resetDetailsReset } from '../../slice/Register/RegsisterSlice';
import { logout, userDetails } from '../../slice/Auth/AuthSlice';

// component
import Payment from '../../Components/Payment';
import Form from '../../Components/Form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { useEffect } from 'react';


const steps = ['Register', 'Payment'];

function getStepContent(step,handleNext) {
  switch (step) {
    case 0:
      return <Form handleNext={handleNext}/>;
    case 1:
      return <Payment />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();


const Register = () => 
{

  const {details}  = useSelector((state) => state.details);

  const {user} = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = React.useState(0);

  useEffect(() =>{
    if(user.isRegister){
      dispatch(registrationDetails({userId:user.userId}));
    }
  },[user,dispatch]);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar style={{display:'flex',justifyContent:'space-between'}}>
          <Typography variant="h6" color="inherit" noWrap>
            Yoga Class Registration
          </Typography>
          <>
            <Typography variant="h6" color="inherit" noWrap>
              {user.email}
            </Typography>
            <Button onClick={(e) => dispatch(logout())}>Logout</Button>
          </>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>

        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>


          {user.isRegister ? (
            <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  You Are Register in this Yoga classes
                </Typography>

              </React.Fragment>
          ) : (
            <>
              <Typography component="h1" variant="h4" align="center">
                Register 
              </Typography>
              <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5,pl :10,pr:10 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            <React.Fragment>
              {getStepContent(activeStep,handleNext)}
            </React.Fragment>
            </>
          )}


        </Paper>
      </Container>
    </ThemeProvider>
  );
}


export default Register;