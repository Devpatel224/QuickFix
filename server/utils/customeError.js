
module.exports = function customeError(statusCode,message){
    const error = new Error(message);
    error.statusCode = statusCode;
     
    return error;
}