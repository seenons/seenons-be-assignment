# Domain Models

## Waste Stream

> **Definition**:
> Represents a specific category of waste material, crucial for matching the disposal needs of customers with the
> capabilities of service providers.
>
> **Role**:
> Used to classify the waste for collection and processing, ensuring that waste is handled according to environmental
> standards.
>
> **Example**: In the 'Service Partners Availability' use case, the customer selects a Waste Stream by id, and the
> system matches this with available Service Providers who can handle this type of waste on the requested date.

See: <https://github.com/seenons/seenons-be-assignment/blob/main/src/domain/waste_stream.ts>

## Service Provider

> **Definition**:
> Represents businesses or organizations responsible for the collection, management, and processing of waste streams.
> Each Service Provider has a unique identity and set of capabilities tailored to handling specific types of waste.
>
> **Role**:
> Central to the waste management ecosystem, Service Providers offer collection services and potentially process waste
> streams in compliance with environmental standards and customer requirements. They are the key link between customers'
> waste disposal needs and the sustainable treatment of waste materials.
>
> **Example**: In the 'Register Waste Pickup' use case, once a customer selects a Service Provider based on available
> dates and waste types, the system checks this provider's coverages to ensure they can service the customer's postal
> code
> with the selected waste stream on the requested date.

See: <https://github.com/seenons/seenons-be-assignment/blob/main/src/domain/service_provider.ts>

## Service Provider Coverage

> **Definition**:
> A relational entry that links Service Providers with specific Waste Streams coverages.
>
> **Role**:
> It is used to determine which Waste Streams are covered by a >Service Provider in a given area
>
> **Example**: In the 'Register Waste Pickup' use case, once a customer selects a Service Provider based on available
> dates and waste types, the system checks this provider's coverages to ensure they can service the customer's postal
> code
> with the selected waste stream on the requested date.

See: <https://github.com/seenons/seenons-be-assignment/blob/main/src/domain/service_provider_coverage.ts>

## Customer

> **Definition**:
> Represents individuals or business entities that generate waste requiring collection and disposal. Customers are the
> initiating party for waste collection services, seeking solutions for their waste disposal needs.
>
> **Role**:
> Customers are at the forefront of the waste collection process, requesting the pickup of various waste streams. They
> connect with Service Providers through the platform to ensure their waste is collected and processed appropriately,
> playing a pivotal role in driving the demand for sustainable waste management services.
>
> **Example**: In the 'Register Waste Pickup' use case, the system uses the Customer's postal_code to match them with
> Service Providers that cover their area for the specified waste stream. This ensures that the waste pickup request is
> directed to providers capable of servicing the customer's location on the desired date.

See: <https://github.com/seenons/seenons-be-assignment/blob/main/src/domain/customer.ts>

## Registered Waste Pickups

> **Definition**:
> Captures the details of scheduled waste collection events, where a specific Waste Stream is set to be picked up by a
> Service Provider on a predetermined date. This model facilitates the organization and tracking of waste collection
> services requested by Customers.
>
> **Role**:
> This model serves as a critical record for planned waste pickups, ensuring that both Customers and Service Providers
> have a shared understanding of the scheduled service. It helps in managing the logistics of waste collection and in
> maintaining a calendar of upcoming waste pickups, enabling efficient planning and execution of services.
>
> **Example**: When a Customer successfully schedules a waste pickup, a new Registered Waste Pickup entry is created
> with details of the waste type, the chosen Service Provider, and the pickup date. This record is then used to confirm
> the service with the Customer and to prepare the Service Provider for the collection, ensuring that all parties are
> informed and aligned with the scheduled service

See: <https://github.com/seenons/seenons-be-assignment/blob/main/src/domain/registered_stream_pickup.ts>
