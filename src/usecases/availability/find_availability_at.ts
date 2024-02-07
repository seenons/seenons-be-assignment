export type FindAvailabilityAtResponse = {
  service_provider_id: string;
  service_provider_name: string;
  covered_waste_streams: Array<{
    stream_id: string;
    stream_label: string;
  }>;
};

export class FindAvailability {
  constructor() {
  }

  public at(postalCode: string, date: Date): Array<FindAvailabilityAtResponse> {
    return [];
  }
}
