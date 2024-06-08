import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "products" })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "varchar" })
  description: string;

  @Column({ type: "int" })
  quantity: number;

  @Column({ type: "varchar" })
  unit: string;

  @Column({ type: "int" })
  user: number;
}
