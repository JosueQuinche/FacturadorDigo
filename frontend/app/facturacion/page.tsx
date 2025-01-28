"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/Facturacion.module.css';

export default function Facturacion() {
  const [formData, setFormData] = useState({
    date: '',
    total: '',
    discount: '',
    final_total: '',
    client: '',
    product: '',
    quantity: 1,
  });
  const [clients, setClients] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const clientData = [
        { id: 1, name: "Tito Andres", lastname: "Valarezo Gonzáles" },
        { id: 2, name: "Josué Sebastian", lastname: "Quinche Sánchez" },
        { id: 3, name: "Mireya Abigail", lastname: "Cruz Flores" },
        { id: 4, name: "Juan Carlos", lastname: "Ramirez Julia" },
        { id: 5, name: "Janeth Alejandra", lastname: "Gonzales Ramirez" },
        { id: 6, name: "Luis Alberto", lastname: "Torres Mendoza" },
        { id: 7, name: "Ana Paula", lastname: "Herrera Cruz" },
        { id: 8, name: "Valeria Isabel", lastname: "Rojas Peñas" },
        { id: 9, name: "Diego Arturo", lastname: "Pineda Reyes" },
      ];
      
      const productData = [
        { id: 1, name: "Camiseta", price: 15.00 },
        { id: 2, name: "Smartwatch ActiveFit X100", price: 75.00 },
        { id: 3, name: "Auriculares Inalámbricos SoundPro 360", price: 50.00 },
        { id: 4, name: "Cafetera Espresso Barista+", price: 120.00 },
        { id: 5, name: "Laptop ProMax 15.6\"", price: 950.00 },
        { id: 6, name: "Altavoz Bluetooth PartyBoom 500", price: 65.00 },
        { id: 7, name: "Bicicleta Urbana EcoRide", price: 300.00 },
        { id: 8, name: "Set de Cuchillos ChefMaster", price: 45.00 },
        { id: 9, name: "Robot Aspiradora SmartClean 300", price: 250.00 },
        { id: 10, name: "Kit de Herramientas MultiPro 80 Piezas", price: 80.00 },
      ];

      setClients(clientData);
      setProducts(productData);
    };

    fetchData();
  }, []);

  const calculateFinalTotal = () => {
    const total = parseFloat(formData.total);
    const discount = parseFloat(formData.discount);
    const quantity = formData.quantity;

    if (!isNaN(total) && !isNaN(discount) && !isNaN(quantity)) {
      const subtotal = total * quantity;
      const finalTotal = subtotal - (subtotal * discount / 100);
      setFormData(prevData => ({
        ...prevData,
        final_total: finalTotal.toFixed(2)
      }));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    const newValue = name === 'quantity' ? parseInt(value) : value;

    setFormData(prevData => ({
      ...prevData,
      [name]: newValue
    }));

    if (name === 'product') {
      const selectedProduct = products.find(product => product.id.toString() === value);
      if (selectedProduct) {
        setFormData(prevData => ({
          ...prevData,
          total: selectedProduct.price.toString()
        }));
      }
    }
  };

  useEffect(() => {
    if (formData.total && formData.discount && formData.quantity) {
      calculateFinalTotal();
    }
  }, [formData.total, formData.discount, formData.quantity]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.date || !formData.total || !formData.discount || !formData.final_total || !formData.client || !formData.product || !formData.quantity) {
      setError('Por favor, complete todos los campos.');
      setSuccess('');
    } else {
      setError('');
      setSuccess('Factura creada exitosamente');

      // Construcción correcta de los parámetros de consulta para la URL
      const queryParams = new URLSearchParams({
        client: String(formData.client),
        product: String(formData.product),
        quantity: String(formData.quantity),
        discount: String(formData.discount),
        total: String(formData.total),
        final_total: String(formData.final_total),
        date: formData.date,
      }).toString();

      // Redirección con URL construida correctamente
      router.push(`/invoice_detail?${queryParams}`);
    }
  };

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.backButton} onClick={handleBackClick}>
        <button className={styles.backButtonStyle}>←</button>
      </div>
      <h2 className={styles.formTitle}>Facturación</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="date" className={styles.formLabel}>Fecha</label>
          <input
            type="date"
            id="date"
            name="date"
            className={styles.formInput}
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="client" className={styles.formLabel}>Cliente</label>
          <select
            id="client"
            name="client"
            className={styles.formInput}
            value={formData.client}
            onChange={handleChange}
          >
            <option value="">Seleccionar Cliente</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name} {client.lastname}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="product" className={styles.formLabel}>Producto</label>
          <select
            id="product"
            name="product"
            className={styles.formInput}
            value={formData.product}
            onChange={handleChange}
          >
            <option value="">Seleccionar Producto</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="quantity" className={styles.formLabel}>Cantidad</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            className={styles.formInput}
            value={formData.quantity}
            onChange={handleChange}
            min="1"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="total" className={styles.formLabel}>Total</label>
          <div className={styles.dollarInput}>
            <span className={styles.dollarSign}>$</span>
            <input
              type="number"
              id="total"
              name="total"
              className={styles.formInput}
              value={formData.total}
              readOnly
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="discount" className={styles.formLabel}>Descuento (%)</label>
          <input
            type="number"
            id="discount"
            name="discount"
            className={styles.formInput}
            value={formData.discount}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="final_total" className={styles.formLabel}>Total Final</label>
          <input
            type="number"
            id="final_total"
            name="final_total"
            className={styles.formInput}
            value={formData.final_total}
            readOnly
          />
        </div>

        {error && <div className={styles.formError}>{error}</div>}
        {success && <div className={styles.formSuccess}>{success}</div>}

        <button type="submit" className={styles.formButton}>Enviar</button>
      </form>
    </div>
  );
}
