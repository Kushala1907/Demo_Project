//import joi
const Joi=require('joi')

const joiValidator=(req,res,next)=>{
    const schema = Joi.object().keys({
        name:Joi.string().optional().label('John'),
        password:Joi.string().min(8).optional().messages({
            'string.min': 'Password must be at least 8 characters long',
          }).label('Password'),
        day: Joi.string().valid('monday','tuesday','wednesday','thursday','friday','saturday','sunday'),
        email:Joi.string().email({
            minDomainSegments:2,
            tlds:{allow:["com","in"]}
        }).messages({
            'string.email': 'Enter a valid Email Id'
          }).label('john@gmail.com')
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