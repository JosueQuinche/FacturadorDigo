import { Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class Auth extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({type: "varchar", length: 100})
    email: String;
    
    @Column({type: "varchar", length: 100})
    password: string;

}