const router = require('express').Router();

const User = require('../module/User');

const bcrypt  = require('bcryptjs');


router.post('/login',async (req,res) =>
{
    let user = await User.findOne({email : req.body.email});
    if(user)
    {
        const isActive = await bcrypt.compare(req.body.password,user.password);
        if(!isActive){
            res.statusCode = 400; 
            return res.json({message:'something went wrong!'});
        }

        res.statusCode = 200; 
        return res.json({
            userId:user.id,
            email:user.email,
            isRegister:user.isRegister
        });
    }  
    
    res.statusCode = 400; 
    return res.json({
        message:'user not found!'
    });
   
})


router.post('/register',async (req,res) =>
{
    const user = await User.findOne({email:req.body.email}) ;
    console.log(user);
    if(user) {
        res.statusCode = 401; 
        return res.json({'message':'user is already created!'});
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.body.password,salt);
    try{
        const user = await User.create({
            email:req.body.email,
            password:hashPassword,
        })
        console.log(user);
        
        if(!user){
            res.statusCode = 401; 
            return res.json({'message':'something went wrong'});
        }
        
        res.statusCode = 200; 
        return res.json({
            userId:user.id,
            email:user.email,
            isRegister:user.isRegister
        });
        
    } catch (err){
        res.statusCode = 401; 
        return res.json(err);
    }
})


router.post('/user-details', async (req,res) =>
{
    try{
        const user = await User.findById(req.body.userId);
        console.log(user);
        if(!user){
            res.statusCode = 400; 
            throw Error('Something went wrong!');
        }

        res.statusCode = 200; 
        return res.json({
            userId:user.id,
            email:user.email,
            isRegister:user.isRegister
        });

    } catch (err){
        res.statusCode = 400; 
        return res.json(err);
    }
})

module.exports = router;