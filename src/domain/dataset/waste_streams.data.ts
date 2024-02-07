import { WasteStream, WasteStreamCategory } from '../waste_stream';

export const metal: WasteStream = {
  id: 'metal',
  label: 'Metal',
  category: WasteStreamCategory.recyclable,
};

export const paper: WasteStream = {
  id: 'paper',
  label: 'Paper',
  category: WasteStreamCategory.recyclable,
};

export const food_waste: WasteStream = {
  id: 'food_waste',
  label: 'Food Waste',
  category: WasteStreamCategory.compostable,
};


export const waste_streams: WasteStream[] = [metal, paper, food_waste];
