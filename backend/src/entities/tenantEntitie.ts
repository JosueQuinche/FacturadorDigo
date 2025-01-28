import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, BaseEntity } from "typeorm";
import { Auth } from "./authEntitie";
import { Local } from "./localEntitie";

@Entity()
export class Tenant extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type: "varchar",  length: 100})
    names:string;

    @Column({type: "varchar", length: 100})
    last_names:string;
    
    @Column({type: "varchar", length: 100})
    social_reason: string;

    @Column({type: "varchar", length: 20})
    phone: string;

    @Column({type: "varchar", length:100})
    email: string;

    @OneToOne(() => Auth)
    @JoinColumn()
    auth: Auth;

    @OneToMany(() => Local, (local) => local.id)
    local: Local;
}
