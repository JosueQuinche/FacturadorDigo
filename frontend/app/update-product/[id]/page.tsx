"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import styles from "../../../styles/UpdateProducto.module.css";  // Ajusta la ruta según tu estructura

const UpdateProducto = () => {
  const [producto, setProducto] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const router = useRouter();
  const { id } = useParams();  // Captura el id dinámico de la URL

  // Obtener producto y cargar los datos en el formulario
  useEffect(() => {
    if (id) {
      const fetchProducto = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/product/read/${id}`);
          setProducto(response.data);
          setFormData({
            name: response.data.name || "",
            description: response.data.description || "",
            price: response.data.price || "",
          });
        } catch (error) {
          console.error("Error al obtener producto:", error);
          alert("Hubo un error al obtener los datos del producto");
        }
      };

      fetchProducto();
    }
  }, [id]);

  // Manejar el cambio de valores en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el envío del formulario para actualizar los datos del producto
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/product/update/${id}`, formData);  // Se agrega el ID en la URL
      alert("Producto actualizado con éxito");
      router.push("/view-all-product");  // Redirige a la lista de productos
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      alert("Hubo un error al actualizar el producto");
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={() => router.push("/view-all-product")} className={styles.backButton}>
          ←
        </button>
        <h1 className={styles.title}>Actualizar Producto</h1>
      </header>

      <main className={styles.main}>
        {producto && (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nombre del Producto</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="description">Descripción</label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="price">Precio:</label>
              <div className={styles.priceContainer}>
                <span className={styles.dollarSign}>$</span>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  placeholder="Ingrese el precio"
                  step="0.01"
                />
              </div>
            </div>
            <button type="submit" className={styles.button}>
              Guardar Cambios
            </button>
          </form>
        )}
      </main>
    </div>
  );
};

export default UpdateProducto;
