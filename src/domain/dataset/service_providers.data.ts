import { ServiceProvider } from '@domain/service_provider';
import { Weekday } from '@domain/service_provider_coverage';
import { WasteStreamCategory } from '@domain/waste_stream';

export const serviceProviders: Array<ServiceProvider> = [
  {
    id: '1',
    name: 'Unwasted',
    address: 'Stationplein, 1',
    coverages: [
      {
        id: '1',
        postal_code_start: '1010',
        postal_code_end: '1020',
        waste_stream: {
          id: '1',
          label: 'Paper',
          category: WasteStreamCategory.recyclable,
        },
        weekday_availability: [Weekday.Monday, Weekday.Tuesday, Weekday.Thursday],
      },
      {
        id: '2',
        postal_code_start: '1010',
        postal_code_end: '1020',
        waste_stream: {
          id: '2',
          label: 'Metal',
          category: WasteStreamCategory.recyclable,
        },
        weekday_availability: [Weekday.Monday, Weekday.Wednesday, Weekday.Friday],
      },
    ],
  },
  {
    id: '2',
    name: 'Bluecollection',
    address: 'Prins Hendrikkade, 1',
    coverages: [
      {
        id: '3',
        postal_code_start: '1020',
        postal_code_end: '9999',
        waste_stream: {
          id: '2',
          label: 'Metal',
          category: WasteStreamCategory.recyclable,
        },
        weekday_availability: [
          Weekday.Monday,
          Weekday.Tuesday,
          Weekday.Wednesday,
          Weekday.Thursday,
          Weekday.Friday,
        ],
      },
    ],
  },
];
