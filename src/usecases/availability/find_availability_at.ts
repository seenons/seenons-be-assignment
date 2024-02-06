import { serviceProviders } from '@domain/dataset/service_providers.data';

export type FindAvailabilityAtResponse = {
  service_provider_id: string;
  service_provider_name: string;
  covered_waste_streams: Array<{
    stream_id: string;
    stream_label: string;
  }>;
};

export class FindAvailability {
  constructor() {}

  public at(
    postalCode: string,
    wasteStreamId: string,
    date: Date,
  ): Array<FindAvailabilityAtResponse> {
    //you can use the `serviceProviders` as a data set to find the availability

    return [];
  }
}
