import * as Auth from '../services/auth.service.js'

export async function register(req, res, next) {
    try {
        const result = await Auth.register(req.body);
        res.status(201).json(result);
    } catch (error) {next(e)}
}

export async function login(req, res, next) {
    try {
        const result = await Auth.login(req.body);
        res.json(result);
    } catch (error) {next(e)}
}

export async function me(req, res, next) {
    try {
        const data = await Auth.me(req.user.sub);
        res.json({ user: data})
    } catch (error) {next(e)}
}