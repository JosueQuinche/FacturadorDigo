import { Request, Response } from "express";
import { Local } from "../entities/localEntitie";

class LocalController {
constructor() {}

async create(req: Request, res: Response) {
    try {
    const { address, comercial_number, primary } = req.body;

    if (!address || !comercial_number || primary === undefined) {
        throw new Error("Todos los campos son necesarios");
    }

    const register = await Local.save(req.body);
    res.status(201).json(register);
    } catch (err) {
    if (err instanceof Error) {
        res.status(500).json({ message: err.message });
    }
    }
}

async read(req: Request, res: Response) {
    try {
    const data = await Local.find();
    res.status(200).json(data);
    } catch (err) {
    if (err instanceof Error) {
        res.status(500).json({ message: "Hubo un error al obtener los datos" });
    }
    }
}

async read_detail(req: Request, res: Response) {
    const { id } = req.params;
    try {
    const register = await Local.findOneBy({ id: Number(id) });
    if (!register) {
        throw new Error("Local no registrado");
    }
    res.status(200).json(register);
    } catch (err) {
    if (err instanceof Error) {
        res.status(500).json({ message: err.message });
    }
    }
}

async update(req: Request, res: Response) {
    const { id } = req.params;
    try {
    const register = await Local.findOneBy({ id: Number(id) });
    if (!register) {
        throw new Error("Local no registrado");
    }
    await Local.update({ id: Number(id) }, req.body);
    const registerUpdate = await Local.findOneBy({ id: Number(id) });
    res.status(200).json(registerUpdate);
    } catch (err) {
    if (err instanceof Error) {
        res.status(500).json({ message: err.message });
    }
    }
}

async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
    const register = await Local.findOneBy({ id: Number(id) });
    if (!register) {
        throw new Error("Local no registrado");
    }
    await Local.delete({ id: Number(id) });
    res.status(204).send();
    } catch (err) {
    if (err instanceof Error) {
        res.status(500).json({ message: err.message });
    }
    }
}
}

export default new LocalController();
