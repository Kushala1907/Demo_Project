//import joi
const Joi=require('joi')

const joiValidatorAddImage=(req,res,next)=>{
    const schema = Joi.object().keys({
        image_url:Joi.any().required('Image-url is required').label('url'),
        day: Joi.string().required('day is required').valid('monday','tuesday','wednesday','thursday','friday','saturday','sunday').label('Day'),
        
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
module.exports=joiValidatorAddImage;