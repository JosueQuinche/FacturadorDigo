import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Invoice } from "./invoiceEntitie";

@Entity()
export class Client extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar", length:20 })
    RUC: String;

    @Column({type: "varchar", length: 100})
    names: string;

    @Column({type: "varchar", length: 100})
    last_names: string;

    @Column({type: "varchar", length: 100})
    social_reason: string;

    @Column({type: "varchar", length:20})
    phone: string;

    @Column({type: "varchar", length:100})
    email: string;

    @OneToMany(() => Invoice, (invoice) => invoice.id)
    invoice: Invoice;
    
}