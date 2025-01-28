import { Request, Response } from "express";
import { Client } from "../entities/clientEntitie"; // Asegúrate de que el nombre del archivo sea correcto.

class ClientController {
  // Crear un nuevo cliente
  async create(req: Request, res: Response, next: Function) {
    try {
      const { RUC, names, last_names, social_reason, phone, email } = req.body;

      // Validación de campos obligatorios
      if (!RUC || !names || !last_names || !social_reason || !phone || !email) {
        throw new Error("Todos los campos son obligatorios");
      }

      const newClient = Client.create({
        RUC,
        names,
        last_names,
        social_reason,
        phone,
        email,
      });

      await Client.save(newClient); // Guardar el cliente en la base de datos
      res.status(201).json({ message: "Cliente agregado con éxito", client: newClient });
    } catch (err) {
      next(err);
    }
  }

  // Obtener todos los clientes
  async read(req: Request, res: Response) {
    try {
      const clients = await Client.find({ order: { names: "ASC" } }); // Ordenar por nombres
      res.status(200).json(clients);
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`Error al obtener clientes: ${err.message}`);
      }
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params; // Cambiar para obtener el id de los parámetros
    const { names, last_names, RUC, social_reason, phone, email } = req.body;
  
    try {
      const client = await Client.findOne({ where: { id: parseInt(id) } });
  
      if (!client) {
        throw new Error ("Cliente no encontrado");
      }
  
      // Actualizar los datos del cliente
      client.names = names;
      client.last_names = last_names;
      client.RUC = RUC; // Agregar RUC que faltaba
      client.social_reason = social_reason;
      client.phone = phone;
      client.email = email;
  
      await client.save();
  
      res.status(200).json({ message: "Cliente actualizado con éxito", client });
    } catch (err) {
      console.error("Error al actualizar cliente:", err);
      res.status(500).json({ message: "Error al actualizar cliente" });
    }
  }

  // Eliminar un cliente por su ID
  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      // Buscar el cliente sin validar el ID
      const client = await Client.findOneBy({ id: parseInt(id) });
      if (!client) {
        throw new Error("Cliente no encontrado");
      }

      await Client.delete({ id: parseInt(id) });
      res.status(200).json({ message: "Cliente eliminado con éxito" });
    } catch (err) {
      console.error("Error al eliminar cliente:", err);
      res.status(500).json({ message: "Error al eliminar cliente" });
    }
  }
}

export default new ClientController();
