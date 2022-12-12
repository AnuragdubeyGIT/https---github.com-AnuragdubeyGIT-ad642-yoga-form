const router = require('express').Router();
const Register = require('../module/Register');
const User = require('../module/User');
const Payment = require('../module/Payment');


router.post('/register-user',async (req,res) =>{

    let user = await User.findById(req.body.userId);
    if(user){
        try{
            let details = await Register.findOne({userId: user.userId});
            if(details){
                res.statusCode = 400;
                return res.json({
                    message:'user is already register of it'
                });
            }
            if(req.body.age < 18){
                res.statusCode = 400;
                return res.json({
                    message:'Age should be 18 or greater'
                });
            }
    
            const detail = await Register.create({
                userId:user.id,
                name:req.body.name,
                email:req.body.email,
                mobile_no:req.body.mobile_no,
                age:req.body.age,
                schedule:req.body.schedule
            })
            if(!detail) throw Error('something wents Wrongs!');
            await User.findByIdAndUpdate(user.id , {isRegister:true});
            res.statusCode = 200;
            return res.json({detail,'payment':''});
        } catch (err){
            console.log(err);
            return res.json(err);
        }
    }

    res.statusCode  = 400;
    return res.json({
        message:'user send error!'
    });
})


router.post('/register-details',async (req,res) =>{
    const user = await User.findById(req.body.userId);
    console.log(user);
    if(!user){
        res.statusCode = 400;
        res.json({
            message:'something wents wrong'
        })
    }
    const details = await Register.findOne({userId:user.id});
    if(user && details){
        try{
            const payment = await Payment.findOne({registerId : details.id});
            res.statusCode = 200;
            return res.json({details,payment});
        } catch(err){
            res.statusCode = 400;
            return res.json(err);
        }
    }
    return res.json({message:'user is not found or details not found!'}).status(400);
})

router.post('/payment',async (req,res) =>{
    console.log(req.body);
    const user = await User.findById(req.body.userId);
    if(user){
        const details = await Register.findOne({userId:user.id,id:req.body.registerId});
        res.statusCode = 400;
        if(!details) throw Error('registration not done at.');
        try{
           const payment = await Payment.create({
            userId:user.id,
            registerId:req.body.registerId,
            paymentAmount:req.body.paymentAmount,
            paymentStatus:'Success'
           })
           if(!payment) throw Error('something wents wrong!');
           res.statusCode = 200;
           return res.json({details,payment});
        } catch(err){
            res.statusCode = 400;
            return res.json(err);
        }
    }
    
    res.statusCode = 400;
    return res.json({
        message:'user is not found!'
    });
    
})


module.exports = router;