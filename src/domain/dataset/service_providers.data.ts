import { ServiceProvider } from '../service_provider';
import { Weekday } from '../service_provider_coverage';
import { food_waste, metal, paper } from './waste_streams.data';

export const serviceProviders: Array<ServiceProvider> = [
  {
    id: '1',
    name: 'Unwasted',
    coverages: [
      {
        id: '1',
        postal_code_start: '1010',
        postal_code_end: '1020',
        waste_stream: paper,
        weekday_availability: [Weekday.Monday, Weekday.Tuesday, Weekday.Thursday],
      },
      {
        id: '2',
        postal_code_start: '1010',
        postal_code_end: '1020',
        waste_stream: metal,
        weekday_availability: [Weekday.Monday, Weekday.Wednesday, Weekday.Friday],
      },
    ],
  },
  {
    id: '2',
    name: 'Bluecollection',
    coverages: [
      {
        id: '3',
        postal_code_start: '1020',
        postal_code_end: '9999',
        waste_stream: food_waste,
        weekday_availability: [Weekday.Monday, Weekday.Tuesday, Weekday.Wednesday, Weekday.Thursday, Weekday.Friday],
      },
    ],
  },
];
