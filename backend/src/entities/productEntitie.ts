import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToMany, BaseEntity} from "typeorm";
import { Local } from "./localEntitie";
import { InvoiceDetail } from "./invoice_detailEntitie";

@Entity()
export class Product extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type: "varchar", length:255})
    name:string;
    
    @Column({type:"decimal", precision:10, scale:2})
    price:number;
    
    @Column({type: "varchar", length:500})
    description:string;

    @ManyToOne(() => Local, (local) => local.id)
    local: Local;

    @OneToMany(() => InvoiceDetail, (invoicedetail) => invoicedetail.id)
    invoicedetail: InvoiceDetail;

}