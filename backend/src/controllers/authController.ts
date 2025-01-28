import { Request, Response } from "express";
import { Auth } from "../entities/authEntitie";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "clave_super_secreta"; // Secret for JWT

class authController {
    constructor() {}

    // Crear un usuario
    async create(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            // Validar entrada
            if (!email || !password) {
                throw new Error("Email y Contraseña son requeridos");
            }

            // Verificar si el usuario ya existe
            const existingUser = await Auth.findOne({ where: { email: email } });
            if (existingUser) {
                throw new Error("Correo ya existe, ingrese uno nuevo");
            }

            // Guardar usuario con la contraseña en texto plano
            const newUser = Auth.create({ email: email, password: password });
            const savedUser = await Auth.save(newUser);

            res.status(201).json(savedUser);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                res.status(500).json({ message: err.message });
            }
        }
    }

    // Obtener todos los usuarios
    async read(req: Request, res: Response) {
        try {
            const data = await Auth.find();
            res.status(200).json(data);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    // Leer detalle de un usuario
    async read_detail(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const register = await Auth.findOne({ where: { id: Number(id) } });
            if (!register) {
                throw new Error('Usuario no registrado');
            }
            res.status(200).json(register);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    // Actualizar usuario
    async update(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const register = await Auth.findOne({ where: { id: Number(id) } });
            if (!register) {
                throw new Error('Usuario no registrado');
            }
            await Auth.update({ id: Number(id) }, req.body);
            const registerUpdate = await Auth.findOne({ where: { id: Number(id) } });
            res.status(200).json(registerUpdate);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    // Eliminar usuario
    async delete(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const register = await Auth.findOne({ where: { id: Number(id) } });
            if (!register) {
                throw new Error('Usuario no registrado');
            }
            await Auth.delete({ id: Number(id) });
            res.status(204).send();
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    // Login de usuario
    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            if (!email || !password) {
                throw new Error("Email y Contraseña son requeridos");
            }

            // Buscar al usuario por email
            const user = await Auth.findOne({ where: { email: email } });
            if (!user) {
                throw new Error("Usuario no encontrado");
            }

            // Verificar si la contraseña ingresada coincide con la almacenada (sin cifrado)
            if (user.password !== password) {
                throw new Error("Contraseña incorrecta");
            }

            // Crear el JWT Token
            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token });

        } catch (err) {
            console.error(err);
            if (!res.headersSent) {
                if (err instanceof Error) {
                    res.status(500).json({ message: err.message });
                }
            }
        }
    }    
}

export default new authController();
