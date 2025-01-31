"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import styles from "../../styles/Invoice_detail.module.css";
import { Download, MessageCircle } from "lucide-react"; // Iconos de descarga y WhatsApp

const IVA_RATE = 0.15; // 15% de IVA en Ecuador

interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

interface Factura {
  id: number;
  cliente: string;
  total: number;
  fecha: string;
}

interface DetalleFactura {
  quantity: number;
  subtotal: number;
  final_subtotal: number;
  invoiceId: number;
  productId: number;
  discount: string;
}

const InvoiceDetailForm = () => {
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [formData, setFormData] = useState<DetalleFactura>({
    quantity: 1,
    subtotal: 14.98, // Ajuste manual del subtotal
    final_subtotal: 14.98, // Precio final fijo
    invoiceId: 0,
    productId: 0,
    discount: "0",
  });

  const router = useRouter();

  useEffect(() => {
    const facturasData: Factura[] = [
      { id: 1, cliente: "Tito Valarezo", total: 200, fecha: "28-01-2025" }, // Fecha en formato dd-mm-yyyy
      { id: 2, cliente: "Ana Gómez", total: 350, fecha: "26-01-2025" },
    ];
    const productosData: Producto[] = [
      { id: 1, nombre: "Camiseta", precio: 15 },
      { id: 2, nombre: "Zapatos", precio: 100 },
    ];

    setFacturas(facturasData);
    setProductos(productosData);

    if (facturasData.length > 0) {
      setFormData((prev) => ({
        ...prev,
        invoiceId: facturasData[0].id,
        productId: productosData[0].id,
      }));
    }
  }, []);

  const facturaSeleccionada = facturas.find((f) => f.id === formData.invoiceId);
  const productoSeleccionado = productos.find((p) => p.id === formData.productId) || { id: 0, nombre: "", precio: 0 };

  const localInfo = {
    direccion: "Av. Daniel Álvarez",
    numeroComercial: "789456",
    nombre: "Local 1",
  };

  const generarMensajeWhatsApp = () => {
    if (!facturaSeleccionada || !productoSeleccionado) return "";
    const mensaje = `
      *Factura Detalles:*\n\n
      *Local:* ${localInfo.nombre}\n
      *Número Comercial:* ${localInfo.numeroComercial}\n
      *Dirección:* ${localInfo.direccion}\n\n
      *Cliente:* ${facturaSeleccionada.cliente}\n
      *Fecha:* ${facturaSeleccionada.fecha}\n
      *Producto:* ${productoSeleccionado.nombre}\n
      *Cantidad:* ${formData.quantity}\n
      *Precio:* $${productoSeleccionado.precio.toFixed(2)}\n
      *Subtotal:* $${formData.subtotal.toFixed(2)}\n
      *Precio Final (con IVA):* $${formData.final_subtotal.toFixed(2)}\n
      *Factura ID:* ${facturaSeleccionada.id}
    `;
    return encodeURIComponent(mensaje);
  };

  const generarPDF = () => {
    const doc = new jsPDF();

    doc.text("Factura Detalle", 20, 20);
    doc.text(`Local: ${localInfo.nombre}`, 20, 30);
    doc.text(`Número Comercial: ${localInfo.numeroComercial}`, 20, 40);
    doc.text(`Dirección: ${localInfo.direccion}`, 20, 50);
    doc.text(`Cliente: ${facturaSeleccionada?.cliente}`, 20, 60);
    doc.text(`Fecha: ${facturaSeleccionada?.fecha}`, 20, 70);
    doc.text(`Producto: ${productoSeleccionado?.nombre}`, 20, 80);
    doc.text(`Cantidad: ${formData.quantity}`, 20, 90);
    doc.text(`Precio: $${productoSeleccionado.precio.toFixed(2)}`, 20, 100);
    doc.text(`Subtotal: $${formData.subtotal.toFixed(2)}`, 20, 110);
    doc.text(`Precio Final (con IVA): $${formData.final_subtotal.toFixed(2)}`, 20, 120);

    doc.save("factura_detalle.pdf");
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.backArrow} onClick={() => router.push("/grid_botones")}>
          ←
        </button>
        <div className={styles.logoContainer}>
          <span className={styles.logo}>Detalle de Factura</span>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.dataSection}>
          <h3>Local: {localInfo.nombre}</h3>
          <p><strong>Número Comercial:</strong> {localInfo.numeroComercial}</p>
          <p><strong>Dirección:</strong> {localInfo.direccion}</p>
          <h3>Cliente: {facturaSeleccionada?.cliente}</h3>
          <p><strong>Fecha:</strong> {facturaSeleccionada?.fecha}</p>
          <p><strong>Producto:</strong> {productoSeleccionado?.nombre}</p>
          <p><strong>Cantidad:</strong> {formData.quantity}</p>
          <p><strong>Precio:</strong> ${productoSeleccionado.precio.toFixed(2)}</p>
          <p><strong>Subtotal:</strong> ${formData.subtotal.toFixed(2)}</p>
          <p><strong>Precio Final (con IVA):</strong> ${formData.final_subtotal.toFixed(2)}</p>
        </div>
      </main>

      <div className={styles.shareContainer}>
        <button className={`${styles.shareButton} ${styles.downloadButton}`} onClick={generarPDF}>
          <Download size={30} color="black" />
        </button>

        <button className={`${styles.shareButton} ${styles.whatsappButton}`} onClick={() => {
          const mensaje = generarMensajeWhatsApp();
          if (mensaje) {
            window.open(`https://wa.me/?text=${mensaje}`, "_blank");
          } else {
            alert("No se puede generar el mensaje. Verifique los datos.");
          }
        }}>
          <MessageCircle size={30} color="black" />
        </button>
      </div>
    </div>
  );
};

export default InvoiceDetailForm;
