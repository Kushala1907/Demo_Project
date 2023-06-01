//import joi
const Joi=require('joi')

const joiValidator=(req,res,next)=>{
    const schema = Joi.object().keys({
        name:Joi.string().optional(),
        password:Joi.string().optional(),
        day: Joi.string().valid('monday','tuesday','wednesday','thursday','friday','saturday','sunday'),
        email:Joi.string().email({
            minDomainSegments:2,
            tlds:{allow:["com","in"]}
        })
    }).unknown(true)
    const {error}=schema.validate(req.body,{ abortEarly:false});
    if(error){
        res.status(200).json({error:error})
    }
    else{
        next();
    }
    
}

//export
module.exports=joiValidator;