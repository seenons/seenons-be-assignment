import { WasteStream as WasteStream } from './waste_stream';

export class ServiceProviderCoverage {
  id!: string;
  waste_stream!: WasteStream;
  postal_code_start!: string;
  postal_code_end!: string;
  weekday_availability!: Weekday[];
}

export enum Weekday {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}
