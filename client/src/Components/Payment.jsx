import React, { useState,useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useSelector,useDispatch } from 'react-redux';
import {toast} from 'react-toastify';
import { completePayment,resetDetailsReset } from '../slice/Register/RegsisterSlice';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Payment = () => 
{
  const {details,isPayment,isFail,message} = useSelector((state) => state.details);

  const {user} = useSelector((state) => state.user);

  const disptach = useDispatch();

  const navigate = useNavigate();

  console.log(details);

  useEffect(() =>{
    if(isFail){
      toast(message);
    }
    if(isPayment){
      toast('payment is successful');
      navigate(`/success/${details.detail.id}`);
    }
    disptach(resetDetailsReset());
  },[disptach,details,isPayment,isFail,message,navigate]);


  const [paymentData,setPaymentData] = useState({
    userId:user.userId,
    registerId:details.detail._id,
    paymentAmount:500
  }); 

  const CompletePayment = (e) => {
    disptach(completePayment(paymentData));
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Make Payment
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            type="number"
            id="number"
            label="Enter Amount"
            variant="standard"
            value={paymentData['paymentAmount']}
            onChange={(e) =>{
              setPaymentData((initData) =>({
                ...initData,
                [e.target.name]:e.target.value
              }))
            }}
          />
        </Grid>
      </Grid>
      <Button fullWidth onClick={CompletePayment} variant="contained" sx={{ mt: 3, ml: 1 }}>Complete Payment</Button>
    </React.Fragment>
  );
}


export default Payment;