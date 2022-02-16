//Creating token, saving it in the cookie & sending token 
const sendToken = (user, statusCode, res) => {

    //creating JWT token
    const token = user.getJwtToken();

    //options for cookie
    //saving token in cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    //sending token
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user
    })
}

module.exports = sendToken;