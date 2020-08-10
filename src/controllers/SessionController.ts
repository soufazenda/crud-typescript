import {Request, Response} from 'express'
import bcrypt from 'bcrypt';
import User from '../schemas/User'
const jwt = require("jsonwebtoken");

class SessionController {
    public async login(req: Request, res: Response): Promise<Response> {
        const user = await User.findOne({email: req.body.email})

        if (!user) {
            return res.status(401).json({error: true, message: "Esse email ainda não está cadastrado"})
        }

        const authorized = await bcrypt.compare(req.body.password, user.password);

        if (!authorized) {
            return res.status(401).json({error: true, message: "Senha incorreta"});
        }

        const access_token = await jwt.sign({ id: user._id }, process.env.APP_SECRET);

        return res.status(200).json({access_token: access_token, issued_at: new Date()})
    }

    public async logout(req: Request, res: Response): Promise<Response> {
        const users = await User.find()

        return res.json(users)
    }
}

export default new SessionController()