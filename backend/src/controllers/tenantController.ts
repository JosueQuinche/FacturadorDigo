import { Request, Response } from "express";
import { Tenant } from "../entities/tenantEntitie"; // Asegúrate de que esté bien importado el modelo de Tenant

class TenantController {
  constructor() {}

  // Crear un nuevo Tenant
  async create(req: Request, res: Response) {
    try {
      const { names, last_names, social_reason, phone, email } = req.body;

      // Validación básica de los campos
      if (!names || !last_names || !social_reason || !phone || !email) {
        throw new Error("Todos los campos son necesarios");
      }

      // Crear un nuevo Tenant
      const tenant = new Tenant();
      tenant.names = names;
      tenant.last_names = last_names;
      tenant.social_reason = social_reason;
      tenant.phone = phone;
      tenant.email = email;

      // Guardamos el tenant en la base de datos
      const savedTenant = await tenant.save();
      res.status(201).json(savedTenant);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ message: "Hubo un error al procesar la solicitud" });
      }
    }
  }

  // Leer todos los tenants
  async read(req: Request, res: Response) {
    try {
      // Obtener todos los tenants
      const tenants = await Tenant.find();

      // Verificamos si hay tenants en la base de datos
      if (tenants.length === 0) {
        throw new Error("No hay tenants registrados.");
      }

      // Si se encontraron tenants, devolverlos como respuesta
      res.status(200).json(tenants);
    } catch (err) {
      // Si ocurre un error en la búsqueda de los tenants
      if (err instanceof Error) {
        res.status(500).json({ message: "Hubo un error al obtener los datos de los tenants." });
      }
    }
  }

  // Leer un tenant por su ID
  async read_detail(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const register = await Tenant.findOneBy({ id: Number(id) });
      if (!register) {
        throw new Error("Tenant No encontrado");
      }
      res.status(200).json(register);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ message: err.message });
      }
    }
  }

  // Actualizar un Tenant por ID
  async update(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const register = await Tenant.findOneBy({ id: Number(id) });
      if (!register) {
        throw new Error("Tenant No encontrado");
      }

      // Actualizar los datos del tenant
      await Tenant.update({ id: Number(id) }, req.body);
      const updatedTenant = await Tenant.findOneBy({ id: Number(id) });
      res.status(200).json(updatedTenant); // Responder con el tenant actualizado
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ message: err.message });
      }
    }
  }

  // Eliminar un Tenant por ID
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const register = await Tenant.findOneBy({ id: Number(id) });
      if (!register) {
        throw new Error("Tenant No encontrado");
      }
      await Tenant.delete({ id: Number(id) });
      res.status(204).send();
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ message: err.message });
      }
    }
  }
}

export default new TenantController();
