/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'date_create', type: 'timestamp', default: new Date()})
  dateCreate: Date;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: false})
  phone: string;

  @Column({ name: 'car', type: 'text', default: null})
  car: string;

  @Column({ name: 'onCarScreen', type: 'boolean', default: false})
  onCarScreen: boolean;

  @Column({ name: 'uuid', type: 'uuid', default: null})
  uuid: string;
}