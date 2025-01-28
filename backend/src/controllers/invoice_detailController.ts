import { Request, Response } from "express";
import { InvoiceDetail } from "../entities/invoice_detailEntitie";
import { Invoice } from "../entities/invoiceEntitie";
import { Product } from "../entities/productEntitie";

class InvoiceDetailController {
  constructor() {}

  // Crear un nuevo detalle de factura
  async create(req: Request, res: Response) {
    const { quantity, subtotal, discount, final_subtotal, invoiceId, productId } = req.body;

    try {
      // Verificar si los datos necesarios están presentes
      if (!quantity || !subtotal || !discount || !final_subtotal || !invoiceId || !productId) {
        throw new Error ("Faltan datos en la solicitud" );
      }

      // Verificar que la factura existe
      const invoice = await Invoice.findOneBy({ id: Number(invoiceId) });
      if (!invoice) {
        throw new Error ("Factura no encontrada");
      }

      // Verificar que el producto existe
      const product = await Product.findOneBy({ id: Number(productId) });
      if (!product) {
        throw new Error ("Producto no encontrado");
      }

      // Crear el nuevo detalle de factura
      const register = await InvoiceDetail.save({
        quantity,
        subtotal,
        discount,
        final_subtotal,
        invoice,
        product,
      });

      res.status(201).json(register); // Respuesta exitosa
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  // Leer todos los detalles de las facturas
  async read(req: Request, res: Response) {
    try {
      const data = await InvoiceDetail.find({ relations: ["invoice", "product"] });
      res.status(200).json(data); // Respuesta exitosa con los detalles
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  // Leer un detalle de factura por ID
  async read_detail(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const register = await InvoiceDetail.findOne({
        where: { id: Number(id) },
        relations: ["invoice", "product"],
      });

      if (!register) {
        throw new Error ("Detalle de factura no encontrado" );
      }

      res.status(200).json(register); // Detalle de factura encontrado
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  // Actualizar un detalle de factura
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { quantity, subtotal, discount, final_subtotal, invoiceId, productId } = req.body;

    try {
      const register = await InvoiceDetail.findOneBy({ id: Number(id) });
      if (!register) {
        throw new Error ("Detalle de factura no encontrado");
      }

      const invoice = await Invoice.findOneBy({ id: Number(invoiceId) });
      if (!invoice) {
        throw new Error ("Factura no encontrada");
      }

      const product = await Product.findOneBy({ id: Number(productId) });
      if (!product) {
        throw new Error ("Producto no encontrado");
      }

      // Actualizar el detalle de factura
      await InvoiceDetail.update({ id: Number(id) }, { quantity, subtotal, discount, final_subtotal, invoice, product });

      // Recuperar el registro actualizado
      const registerUpdate = await InvoiceDetail.findOneBy({ id: Number(id) });
      res.status(200).json(registerUpdate); // Detalle actualizado exitosamente
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  // Eliminar un detalle de factura
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const register = await InvoiceDetail.findOneBy({ id: Number(id) });
      if (!register) {
        throw new Error ("Detalle de factura no encontrado");
      }

      await InvoiceDetail.delete({ id: Number(id) });
      res.status(204).send(); // Eliminación exitosa
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
}

export default new InvoiceDetailController();
