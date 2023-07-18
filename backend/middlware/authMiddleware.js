const jwt = require('jsonwebtoken');
const CompteCollab = require('../Modele/CompteCollab');


async function requireAuth(req, res, next){
    const token =  req.headers.authorization || req.body.token;

    if(token) {
        try {
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const userId = decodedToken.userId;

            const user = await CompteCollab.findByPk(userId);
            if (user && user.secretKey) {
                const decodedUserToken = jwt.verify(token, user.secretKey)
                req.user = decodedUserToken;
                next();
            }
            else {
                res.status(401).json({error : 'Unauthorized'});
            }
           
        } 
        catch (err){
            res.status(401).json({error : 'Unauthorized'})
        }
    } else {
        res.status(401).json({error : 'Unauthorized'})
    }
}

module.exports = requireAuth;