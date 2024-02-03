const response = (res, statusCode = 200, success = false, message = '', data = {}) => {
    try {
        res.status(statusCode)
        res.json({
            success,
            message,
            data,
        })
    
        res.end()
        
    } catch (error) {
        console.log(error.message);
        
    }
}

export default response;