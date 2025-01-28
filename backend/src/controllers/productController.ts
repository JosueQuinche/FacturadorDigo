import { Request, Response } from "express";
import { Product } from "../entities/productEntitie";
import { Local } from "../entities/localEntitie";

class ProductController {
    constructor() {}

    async create(req: Request, res: Response) {
        const { name, price, description, localId } = req.body;

        if (!name || !price || !description || !localId) {
            throw new Error("Faltan campos requeridos");
        }

        try {
            const local = await Local.findOneBy({ id: Number(localId) });
            if (!local) {
                throw new Error("Local no encontrado");
            }

            const product = new Product();
            product.name = name;
            product.price = price;
            product.description = description;
            product.local = local;

            await product.save();

            res.status(201).json(product);
        } catch (err) {
            console.error(err);
            throw new Error("Error al crear el producto");
        }
    }

    async read(req: Request, res: Response) {
        try {
            const data = await Product.find({
                relations: ["local"],
                order: { name: "ASC" }
            });
            res.status(200).json(data);
        } catch (err) {
            console.error(err);
            throw new Error("Error al obtener productos");
        }
    }

    async read_detail(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const product = await Product.findOne({ where: { id: Number(id) }, relations: ["local"] });
            if (!product) {
                throw new Error("Producto no encontrado");
            }
            res.status(200).json(product);
        } catch (err) {
            console.error(err);
            throw new Error("Error al obtener el producto");
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params; // Obtener el id del producto desde los parámetros
        const { name, price, description } = req.body; // Obtener los nuevos valores desde el cuerpo de la solicitud
    
        try {
            // Buscar el producto en la base de datos por su id
            const product = await Product.findOneBy({ id: Number(id) });
            
            if (!product) {
                // Si no se encuentra el producto, lanzar un error
                throw new Error("Producto no encontrado");
            }
    
            // Si se pasan valores para actualizar, modificar el producto
            if (name !== undefined) product.name = name;
            if (price !== undefined) product.price = price;
            if (description !== undefined) product.description = description;
    
            // Guardar el producto actualizado en la base de datos
            await product.save();
    
            // Responder con el producto actualizado
            res.status(200).json({ message: "Producto actualizado con éxito", product });
        } catch (err) {
            // Manejar cualquier error que ocurra
            console.error(err);
            res.status(500).json({ message: "Error al actualizar el producto" });
        }
    }
    

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const product = await Product.findOneBy({ id: Number(id) });
            if (!product) {
                throw new Error("Producto no encontrado");
            }

            const deleteResult = await Product.delete({ id: Number(id) });
            if (deleteResult.affected === 0) {
                throw new Error("No se pudo eliminar el producto, no se encontró el ID");
            }

            res.status(204).send(); // El producto fue eliminado exitosamente
        } catch (err) {
            console.error(err);
            throw new Error("Error al eliminar el producto");
        }
    }
}

export default new ProductController();
