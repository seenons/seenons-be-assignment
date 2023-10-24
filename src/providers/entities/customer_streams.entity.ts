/*
  4. Opportunity
  Can you spot missing references in the CustomerStreamsEntity?
*/
export class CustomerStreamsEntity {
  id!: string;
  stream_id!: string;
  service_provider_id!: string;
  pickup_date!: Date;
  quantity!: number;
}
