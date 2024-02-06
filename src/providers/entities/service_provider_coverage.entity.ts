import { WasteStreamEntity } from './waste_stream.entity';
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class ServiceProviderCoverageEntity {
  @PrimaryColumn()
  id!: string;

  @ManyToOne(() => WasteStreamEntity)
  @JoinColumn({ name: 'waste_stream_id' })
  waste_stream!: WasteStreamEntity;

  @Column()
  postal_code_start!: string;

  @Column()
  postal_code_end!: string;

  @Column('simple-array')
  weekday_availability!: Weekday[];
}

export enum Weekday {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
  Sunday = 7
}