//import joi
const Joi=require('joi')

const joiValidator=(req,res,next)=>{
    const schema = Joi.object().keys({
        name:Joi.string().optional('Name is required').label('Name'),
        
        email:Joi.string().email({
            minDomainSegments:2,
            tlds:{allow:["com","in"]}
        }).required('email is required').messages({
            'string.email': 'Enter a valid Email Id'
          }).label('Email'),
          password:Joi.string().min(8).required('Email is required').messages({
            'string.min': 'Password must be at least 8 characters long',
          }).label('Password'),
    }).unknown(true)
    const {error}=schema.validate(req.body,{ abortEarly:false});
    if(error){
        res.status(200).send({error:error})
    }
    else{
        next();
    }
}

//export
module.exports=joiValidator;