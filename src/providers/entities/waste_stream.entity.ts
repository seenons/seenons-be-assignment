import { Entity, PrimaryColumn, Column } from "typeorm";

export enum WasteStreamCategory {
  hazardous = 'hazardous',
  recyclable = 'recyclable',
  compostable = 'compostable',
  residual_waste = 'residual_waste',
}

@Entity()
export class WasteStreamEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  label!: string;

  @Column({
    type: 'enum',
    enum: WasteStreamCategory,
    default: WasteStreamCategory.residual_waste
  })
  category!: WasteStreamCategory;
}
