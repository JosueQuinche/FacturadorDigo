import { Request, Response } from "express";
import { Invoice } from "../entities/invoiceEntitie";

class InvoiceController {
  constructor() {}

  // Crear una nueva factura
  async create(req: Request, res: Response) {
    try {
      const { client, date, total, discount, final_total } = req.body;
      
      // Crear la factura y guardarla en la base de datos
      const register = await Invoice.save({
        client,
        date: new Date(date),  // Asegúrate de que la fecha esté correctamente convertida
        total: parseFloat(total),  // Convertir a número
        discount: parseFloat(discount),  // Convertir a número
        final_total: parseFloat(final_total),  // Convertir a número
      });

      res.status(201).json(register);  // Responder con la factura creada
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }

  // Leer todas las facturas
  async read(req: Request, res: Response) {
    try {
      const data = await Invoice.find();
      res.status(200).json(data);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }

  // Leer detalles de una factura
  async read_detail(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const register = await Invoice.findOneBy({ id: Number(id) });
      if (!register) {
        throw new Error('Factura no registrada');
      }
      res.status(200).json(register);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }

  // Actualizar una factura
  async update(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const register = await Invoice.findOneBy({ id: Number(id) });
      if (!register) {
        throw new Error('Factura no registrada');
      }
      await Invoice.update({ id: Number(id) }, req.body);
      const updatedRegister = await Invoice.findOneBy({ id: Number(id) });
      res.status(200).json(updatedRegister);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }

  // Eliminar una factura
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const register = await Invoice.findOneBy({ id: Number(id) });
      if (!register) {
        throw new Error('Factura no registrada');
      }
      await Invoice.delete({ id: Number(id) });
      res.status(204).send();
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }
}

export default new InvoiceController();
