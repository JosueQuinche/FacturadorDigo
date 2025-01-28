import { DataSource } from "typeorm";
import { Auth } from "../entities/authEntitie";
import { Tenant } from "../entities/tenantEntitie";
import { Client } from "../entities/clientEntitie";
import { Local } from "../entities/localEntitie";
import { Invoice } from "../entities/invoiceEntitie";
import { InvoiceDetail } from "../entities/invoice_detailEntitie";
import { Product } from "../entities/productEntitie";

export const AppDataSource = new DataSource({
    type: "postgres",           // Motor de base de datos
    host: "localhost",          // Servidor local
    port: 5432,                 // Puerto predeterminado de PostgreSQL
    username: "postgres",       // Usuario de PostgreSQL
    password: "Jsqs2004",       // Contraseña
    database: "db_practicum",    // Base de datos específica
    logging: true,              // Activa los logs de consultas
    entities: [Auth, Tenant, Client, Local, Product, Invoice, InvoiceDetail,], // Entidades registradas
    synchronize: true           // Sincroniza estructura de entidades (solo para desarrollo)
});
