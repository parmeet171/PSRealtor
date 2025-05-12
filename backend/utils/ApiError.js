class ApiError extends Error{
    constructor(status , message = "Something went wrong"  , errors= [] , stack = "" ) {
        super(message) ;
        this.status = status ;  
        this.errors= errors; 
        this.message = message ; 
        this.success = false;  
        this.data = null ; 
        if(stack) 
        {
            this.stack = stack ; 
            
        }
        else{
            
            this.stack = Error.captureStackTrace(this , this.constructor);
        }
    }

}
export default ApiError; 