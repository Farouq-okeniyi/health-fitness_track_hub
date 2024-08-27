const  CustomError = require(".././Utility/CustomError")

const devErrors = (res,error)=>{
    res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
    stackTrace: error.stack,
    error:error
})

}

const prodErrors = (res,error)=>{
if(error.isOperational){
    res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
    })

}else{
    res.status(500).json({
        status:'error',
        message:'Something went wrong please try again later    '
    })
}

}

const validateErrorHandler = (err) => {
    const errors = Object.values(err.errors).map((val) => val.message);
    const errorMessage = errors.join('. ');
    const msg = `Invalid input: ${errorMessage}`;
    return new CustomError(msg, 422);
};

const duplicateErrorHadler = (err)=>{
    if(err.keyValue.email){
        let msg = `${err.keyValue.email} is already in use, Please use another email`
       
        return new CustomError(msg, 422)
    }
}
const castErrorHandler = (err)=>{
    const msg = `Invalid valid ${err.path} for field ${err.value}`
    return new CustomError(msg, 422)
}
module.exports= (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    console.log(error.statusCode)
    error.status = error.status || 422;

    if(process.env.NODE_ENV === 'development'){
             devErrors(res, error)
    }else if(process.env.NODE_ENV==='production'){
        console.log(error.name)
        if(error.code === 11000) error = duplicateErrorHadler(error)
        
        if(error.name === 'CastError') error =  castErrorHandler(error)

        if(error.name === 'ValidationError') error =  validateErrorHandler(error)

        prodErrors(res, error)
    }
}
