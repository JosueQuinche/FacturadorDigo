import { Entity,PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";
import { Invoice } from "./invoiceEntitie";
import { Product } from "./productEntitie";

@Entity()
export class InvoiceDetail extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"int"})
    quantity: number;

    @Column({type:"decimal", precision:10, scale:2})
    subtotal: number;

    @Column({type:"decimal", precision:10, scale:2})
    discount: number;

    @Column({type:"decimal", precision:10, scale:2})
    final_subtotal:number;

    @ManyToOne(() => Invoice, (invoice) => invoice.id)
    invoice: Invoice;

    @ManyToOne(() => Product, (product) => product.id)
    product: Product;
}