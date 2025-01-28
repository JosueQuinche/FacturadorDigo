import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity } from "typeorm";
import { Local } from "./localEntitie";
import { InvoiceDetail } from "./invoice_detailEntitie";
import { Client } from "./clientEntitie";


@Entity()
export class Invoice extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"timestamp"})
    date: Date;

    @Column({type:"decimal", precision: 10, scale:2})
    total: number;

    @Column({type:"decimal", precision:10, scale:2})
    discount: number;

    @Column({type:"decimal", precision:10, scale:2})
    final_total: number;

    @ManyToOne(() => Local, (local) => local.id)
    local: Local;

    @OneToMany(() => InvoiceDetail, (invoicedetail) => invoicedetail.id)
    invoicedetail: InvoiceDetail;

    @ManyToOne(() => Client, (client) => client.id)
    client: Client;


}
