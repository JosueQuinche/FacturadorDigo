"use client"
import styles from "../../styles/Grid.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface Client {
  id: number;
  names: string;
  last_names: string;
}

interface Product {
  id: number;
  name: string;
}

export default function Dashboard() {
  const [favorites, setFavorites] = useState<Client[]>([]);
  const [productFavorites, setProductFavorites] = useState<Product[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const savedProductFavorites = JSON.parse(localStorage.getItem("favoriteProducts") || "[]");
    
    setFavorites(savedFavorites);
    setProductFavorites(savedProductFavorites);

    const fetchData = async () => {
      try {
        const [clientsRes, productsRes] = await Promise.all([
          axios.get("http://localhost:3000/client/read"),
          axios.get("http://localhost:3000/product/read"),
        ]);
        setClients(clientsRes.data);
        setProducts(productsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const handleStorageChange = () => {
      setProductFavorites(JSON.parse(localStorage.getItem("favoriteProducts") || "[]"));
    };

    window.addEventListener("favoritesUpdated", handleStorageChange);
    return () => window.removeEventListener("favoritesUpdated", handleStorageChange);
  }, []);

  const favoriteClients = clients.filter(client => 
    favorites.some(fav => fav.id === client.id)
  );

  const favoriteProducts = products.filter(product => 
    productFavorites.some(fav => fav.id === product.id)
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <span className={styles.logo}>Facturador</span>
        </div>
        <Link href="/config">
          <Image
            src="/icons/setting.png"
            alt="Configuración"
            className={styles.configIcon}
            width={30}
            height={30}
          />
        </Link>
      </header>

      <main className={styles.main}>
        <div className={styles.dashboardContainer}>
          {/* Sección Clientes */}
          <div className={styles.sectionContainer}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Clientes</h3>
              <div className={styles.cardContent}>
                <Link href="/add-favorite-client">
                  <button className={styles.addButton}>
                    <span>+</span>
                  </button>
                </Link>
                <Link href="/view-all-client">
                  <button className={styles.viewMoreButton}>
                    <span>→</span>
                  </button>
                </Link>
              </div>
            </div>

            <div className={styles.favoritesBoxClients}>
              <h3 className={styles.sectionTitle}>Clientes Favoritos</h3>
              {favoriteClients.length > 0 ? (
                favoriteClients.map(client => (
                  <div key={client.id} className={styles.favoriteBubbleClient}>
                    {client.names.charAt(0).toUpperCase()}
                    {client.last_names.charAt(0).toUpperCase()}
                  </div>
                ))
              ) : (
                <p className={styles.noFavorites}>Vacío</p>
              )}
            </div>
          </div>

          {/* Sección Productos */}
          <div className={styles.sectionContainer}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Productos</h3>
              <div className={styles.cardContent}>
                <Link href="/add-favorite-product">
                  <button className={styles.addButton}>
                    <span>+</span>
                  </button>
                </Link>
                <Link href="/view-all-product">
                  <button className={styles.viewMoreButton}>
                    <span>→</span>
                  </button>
                </Link>
              </div>
            </div>

            <div className={styles.favoritesBoxProducts}>
              <h3 className={styles.sectionTitle}>Productos Favoritos</h3>
              {favoriteProducts.length > 0 ? (
                favoriteProducts.map(product => {
                  const initials = product.name
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase())
                    .join('')
                    .substring(0, 2);
                  
                  return (
                    <div key={product.id} className={styles.favoriteBubbleProduct}>
                      {initials}
                    </div>
                  );
                })
              ) : (
                <p className={styles.noFavorites}>Vacío</p>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <Link href="/facturacion" className={styles.footerLink}>
          <Image src="/icons/invoice.png" alt="Factura" width={35} height={35} />
        </Link>
        <Link href="/invoice_detail" className={styles.footerLink}>
          <Image src="/icons/report.png" alt="Reporte" width={35} height={35} />
        </Link>
      </footer>
    </div>
  );
}