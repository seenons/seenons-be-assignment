import { WasteStream, WasteStreamCategory } from '@domain/waste_stream';

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

export const waste_streams: WasteStream[] = [metal, paper];
