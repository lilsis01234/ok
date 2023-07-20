const roleMiddlware = (roles) => (req, res, next) => {
    if (!req.userId) {
        return res.status(401).json({message : 'Authentification requise'});
    }

    const userRoles = req.userRole || [];
    const isAllowed = roles.some((role) => userRoles.includes(role));

    if (!isAllowed){
        return res.status(403).json({message : 'Accès réfusé - Rôle insuffisant'})
    }
    next();

}

module.exports = roleMiddlware;