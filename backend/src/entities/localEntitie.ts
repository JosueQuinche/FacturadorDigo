import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity} from "typeorm";
import { Tenant } from "./tenantEntitie";
import { Invoice } from "./invoiceEntitie";
import { Product } from "./productEntitie";

@Entity()
export class Local extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar" , length: 255})
    address: string;

    @Column({type: "varchar", length: 50})
    comercial_number: string;

    @Column({type: "varchar", length: 50})
    primary: string;

    @ManyToOne(() => Tenant, (tenant) => tenant.id)
    tenant: Tenant;

    @OneToMany(() => Invoice, (invoice) => invoice.id)
    invoice: Invoice;

    @OneToMany(() => Product, (product) => product.id)
    product: Product;

}