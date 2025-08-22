import { unauthorized, forbidden } from "../utils/errors";
import { verifyAccessToken } from "../utils/jwt";

export function requireAuth(req, _res, next){
    const header = req.headers.authorization;
    const token = header?.startsWith('Bearer ') ? header.slice(7) : null
    if (!token) return next(unauthorized('Missing Bearer token'));
    try{
        const payload = verifyAccessToken(token);
        req.user = payload;
        next();
    }catch{
        next(unauthorized('Invalid or expired token'));
    }
}

export function requireRole(...role){
    return (req,_res, next) => {
        if (!req.user) return next(unauthorized());
        if (!roles.includes(req.user.role)) return next(forbidden('Insufficient role'));
        next();
    }
}