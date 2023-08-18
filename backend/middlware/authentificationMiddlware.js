const jwt = require('jsonwebtoken')

const authentificateToken = async (req, res, next ) => {
    const token = req.cookies.token; 

    if(!token) {
        return res.sendStatus(401)
    }

    try {
        const user = await getUserFromToken(token);
        const userSecretKey = user.secretKey;

        jwt.verify(token, userSecretKey, (err, decodedToken) => {
            if(err) {
                return res.sendStatus(403);
            }
        
        req.user = decodedToken;
        next;
        });
    } 
    catch(error ){
        console.error(error)
        return res.sendStatus(500);
    }
}

module.exports = authentificateToken;