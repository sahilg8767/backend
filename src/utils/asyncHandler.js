const asyncHandler =(func)=> async(req, res, next)=>{
    //this is a high order function which takes a function as an argument and returns a function
    //we make it async and pass (req, res, next) and this next is for middleware

    //high order func are written as:
    /*
    const func_name= (func_name) => () =>{}
    */ 

        try{
            await fn(req, res, next); //we await the function passed as argument
        }
        catch (error){
            //either user pass error code so error.code or otherwise we will use 500 code and also we send a json flag
            res.status(error.code || 500).json({
                success:false,
                message:error.message
            })
        }

}
export default asyncHandler;