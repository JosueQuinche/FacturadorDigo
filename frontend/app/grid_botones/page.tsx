"use client";
import styles from "../../styles/Grid.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [favorites, setFavorites] = useState<any[]>([]); // Clientes favoritos
  const [productFavorites, setProductFavorites] = useState<any[]>([]); // Productos favoritos
  const [clients, setClients] = useState<any[]>([]); // Clientes
  const [products, setProducts] = useState<any[]>([]); // Productos

  // Obtener favoritos desde localStorage al cargar el componente
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(savedFavorites);

    const savedProductFavorites = JSON.parse(localStorage.getItem("favoriteProducts") || "[]");
    setProductFavorites(savedProductFavorites);

    // Obtener clientes y productos desde el backend
    const fetchData = async () => {
      try {
        const [clientsResponse, productsResponse] = await Promise.all([
          axios.get("http://localhost:3000/client/read/${id}"),
          axios.get("http://localhost:3000/product/read/${id}")
        ]);

        setClients(clientsResponse.data);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();

    // Escuchar el evento 'favoritesUpdated' para actualizar los favoritos
    const handleFavoritesUpdated = () => {
      const savedProductFavorites = JSON.parse(localStorage.getItem("favoriteProducts") || "[]");
      setProductFavorites(savedProductFavorites);
    };

    window.addEventListener("favoritesUpdated", handleFavoritesUpdated);

    // Limpiar el evento cuando el componente se desmonte
    return () => {
      window.removeEventListener("favoritesUpdated", handleFavoritesUpdated);
    };
  }, []);

  // Filtrar solo los productos favoritos para mostrarlos
  const favoriteProducts = products.filter((product) =>
    productFavorites.some((fav) => fav.id === product.id)
  );

  // Filtrar solo los clientes favoritos para mostrarlos
  const favoriteClients = clients.filter((client) =>
    favorites.some((fav) => fav.id === client.id)
  );

  return (
    <div className={styles.container}>
      {/* Encabezado */}
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <span className={styles.logo}>Facturador</span>
        </div>
        <a href="/config">
          <img
            src="/icons/setting.png"
            alt="Configuración"
            className={styles.configIcon}
          />
        </a>
      </header>

      <main className={styles.main}>
        <div className={styles.dashboardContainer}>
          {/* Contenedor de Clientes */}
          <div className={styles.sectionContainer}>
            <div className={styles.favoritesBoxClients}>
              <h3 className={styles.sectionTitle}>Clientes Favoritos</h3>
              {favoriteClients.length > 0 ? (
                favoriteClients.map((client) => (
                  <div key={client.id} className={styles.favoriteBubbleClient}>
                    {client.names.charAt(0).toUpperCase()}
                    {client.last_names.charAt(0).toUpperCase()}
                  </div>
                ))
              ) : (
                <p className={styles.noFavorites}>No tienes clientes favoritos aún</p>
              )}
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Clientes</h3>
              <div className={styles.cardContent}>
                <Link href="/add-favorite-client">
                  <button className={styles.addButton}>+</button>
                </Link>
                <Link href="/view-all-client">
                  <button className={styles.viewMoreButton}>→</button>
                </Link>
              </div>
            </div>
          </div>

          {/* Contenedor de Productos */}
          <div className={styles.sectionContainer}>
            <div className={styles.favoritesBoxProducts}>
              <h3 className={styles.sectionTitle}>Productos Favoritos</h3>
              {favoriteProducts.length > 0 ? (
                favoriteProducts.map((product) => {
                  const productNameInitials = product.name
                    .split(" ")
                    .map((word: string) => word.charAt(0).toUpperCase())
                    .join("");
                  const productInitials = productNameInitials.substring(0, 2);

                  return (
                    <div key={product.id} className={styles.favoriteBubbleProduct}>
                      {productInitials}
                    </div>
                  );
                })
              ) : (
                <p className={styles.noFavorites}>No tienes productos favoritos aún</p>
              )}
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Productos</h3>
              <div className={styles.cardContent}>
                <Link href="/add-favorite-product">
                  <button className={styles.addButton}>+</button>
                </Link>
                <Link href="/view-all-product">
                  <button className={styles.viewMoreButton}>→</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <a href="/facturacion" className={styles.footerLink}>
          <img src="/icons/invoice.png" alt="Factura" />
        </a>
        <a href="/invoice_detail" className={styles.footerLink}>
          <img src="/icons/report.png" alt="Reporte" />
        </a>
      </footer>
    </div>
  );
}
