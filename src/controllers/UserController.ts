import {Request, Response} from 'express'
import bcrypt from 'bcrypt';
import User from '../schemas/User'

class UserController {
    public async index(req: Request, res: Response): Promise<Response> {
        const users = await User.find()

        return res.json(users)
    } 

    public async create(req: Request, res: Response): Promise<Response> {
        // Verifica se os campos obrigatórios foram enviados
        if(!req.body.email || !req.body.firstName || !req.body.lastName || !req.body.password) {
            return res.json({error: true, message: "Campos incompletos"})
        }

        // Verifica se o email já existe na base de dados
        const exists = User.findOne({email: req.body.email});

        if (exists) {
            return res.json({error: true, message: "Email já cadastrado"})
        }

        const hashPassword = await bcrypt.hash(req.body.password, 8);

        delete req.body.password;

        Object.assign(req.body, {password: hashPassword});

        // Cria o novo usuário        
        const user = await User.create(req.body)

        return res.json(user)
    }

    public async read(req: Request, res: Response): Promise<Response> {
        const user = User.findOne({email: req.body.email});
        if (!user) {
            return res.json({error: true, message: "Usuário não encontrado"})
        }

        return res.json(user)
    }

    public async update(req: Request, res: Response): Promise<Response> {
        // Deve receber um objeto com o _id e as novas informações
        if (!req.body._id) {
            return res.json({error: true, message: "Usuário não encontrado"})
        }

        const user = req.body;
        delete user._id

        const updatedData = await User.findOneAndUpdate(req.body._id, user)

        return res.json({error: false, message: "Usuário editado com sucesso!"})
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        // Deve receber um _id
        const user = await User.findOneAndDelete(req.body._id)

        console.log(user);

        return res.json(user)
    }

}

export default new UserController()