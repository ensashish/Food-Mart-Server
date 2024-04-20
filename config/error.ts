export const createError = (status:number, message:string)=>{
    let error:any = new Error();
    error.status = status;
    error.message = message; 
    return error;
};