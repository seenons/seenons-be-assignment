export enum WasteStreamCategory {
  hazardous = 'hazardous',
  recyclable = 'recyclable',
  compostable = 'compostable',
  residual_waste = 'residual_waste',
}

export class WasteStreamEntity {
  id!: string;
  label!: string;
  category!: WasteStreamCategory;
}
