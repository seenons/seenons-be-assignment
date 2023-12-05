# Seenons Backend Assignment

Hello there!

At Seenons, we are building a platform to support a circular economy. This encompasses collection, transportation and
re-purposing of different waste streams. A strong technical backbone, design and usability are key to the success of the
platform!

## The assignment

---

We have divided the assignment into what we called "gates", these gates are references to engineering skills that we are looking for in a future colleague.
Some of them are required, some of them give you bonus points. You can read more about it below.

    The task is to at least complete two services
    - Retrieve availability of service providers for a given location and date.
    - Register the collection of a waste stream to be performed by a service provider.

We purposely made this project framework-agnostic, and it only contains the bare minimum to perform the necessary use cases.

## The output

---

    Code changes that reflect the implementation of at least the two required use cases
    In case you make changes to the domain model (as an opportunity), include a diagram that explains it.
    Ensure that test coverage is adequate and that it matches what you would deliver as a product engineer.
    Create a new readme file that explains your take on the assignment, your thought process, and any other information that you believe is relevant for the review.

## Technologies Used

---

This project is built using the following technologies:

- Node.js
- npm
- TypeScript

Although experience with these technologies is not a requirement to join our team, we are looking for people who will be
able to work in this ecosystem, so we recommend you to use them.

If you are not familiar with these technologies, you can also complete the assignment using the ecosystems below.

- .NET (Core) 5+
- Java
- Kotlin
- Python

Would you rather do it in another language? Let us know beforehand!

## Domain Model Representation

---

### Waste Stream

    Definition:
      A Waste Stream is an entry in our domain model that represents a specific category of waste material.
      Each Waste Stream is unique and immutable, identified by specific characteristics such as its label and category (e.g., recyclable, non-recyclable, hazardous).
    Role:
      It is used to classify the waste collected and processed by Service Providers, and to match the waste disposal needs of Customers.
    Attributes:
      id: A unique identifier for the Waste Stream.
      label: A human-readable name or label for the Waste Stream (e.g., paper, metal, glass).
      category: A classification of the Waste Stream. This helps in determining the appropriate handling and processing methods.

| id  | label | category   |
| --- | ----- | ---------- |
| 1   | paper | recyclable |
| 2   | metal | recyclable |
| 3   | glass | recyclable |

See: https://github.com/seenons/seenons-be-assignment/blob/main/src/providers/entities/waste_stream.entity.ts

### Service Provider

    Definition:
      The Service Provider is an entry in our domain model that represents businesses or organizations responsible for the collection and management of waste streams.
      Each Service Provider has a unique identity and capabilities.
    Role:
      Service Providers are central to the waste management ecosystem. They not only collect but can also process waste streams as per environmental standards and customer requirements.
    Attributes:
      id: A unique identifier for the Service Provider.
      name: The name of the Service Provider.
      address: The primary location or headquarters of the Service Provider.
      coverages: An array representation of Waste Streams that the Service Provider can handle at a given postal code range and days of the week.

| id  |      name      |                 address                 | coverages |
| :-: | :------------: | :-------------------------------------: | :-------: |
|  1  |    Unwasted    |   Stationplein, 1, 1012 AB Amsterdam    |  [1, 2]   |
|  2  | Bluecollection | Prins Hendrikkade, 1, 1012 JD Amsterdam |    [3]    |

See: https://github.com/seenons/seenons-be-assignment/blob/main/src/providers/entities/service_provider.entity.ts

### Service Provider Coverage

    Definition:
      A relational entity that links Service Providers with specific Waste Streams coverages.
    Role:
      It is used to determine which Service Providers are available to handle a given Waste Stream in an area for a set of days of the week.
    Attributes:
      id: A unique identifier for the Service Provider Coverage.
      stream: The Waste Stream that the Service Provider can handle.
      postal_code_start: The starting postal code of the area covered by the Service Provider.
      postal_code_end: The ending postal code of the area covered by the Service Provider.
      weekday_availability: An array of weekdays that the Service Provider can handle the Waste Stream.

| id  |  stream  | postal_code_start | postal_code_end |              weekday_availability              |
| :-: | :------: | :---------------: | :-------------: | :--------------------------------------------: |
|  1  | paper(1) |       1010        |      1020       |          [Monday, Tuesday, Thursday]           |
|  2  | metal(2) |       1010        |      1020       |          [Monday, Wednesday, Friday]           |
|  3  | metal(2) |       1000        |      9999       | [Monday, Tuesday, Wednesday, Thursday, Friday] |

    This means that "Unwasted" can:
      - Collect Paper in the postal code range 1010-1020 on [Monday, Tuesday, Wednesday] .
      - Collect Metal in the postal code range 1010-1020 on [Monday, Wednesday, Friday].

    While "Bluecollection" can:
      - Collect Metal in the postal code range 0000-9999 on [Monday, Tuesday, Wednesday, Thursday, Friday].

See: https://github.com/seenons/seenons-be-assignment/blob/main/src/providers/entities/service_provider_coverage.entity.ts

### Customer

    Definition:
      A Customer is an Entity in our domain model that represents a person or business entity that has waste to be collected at a given address.
    Role:
      Customers are the ones that request the collection of waste streams.
    Attributes:
      id: A unique identifier for the Customer.
      name: The name of the Customer.
      address: The address of the Customer.
      postal_code: The postal code referred to the address.

| id  |     name      |                  address                  | postal_code | registered_stream_pickups |
| :-: | :-----------: | :---------------------------------------: | :---------: | :-----------------------: |
|  1  |    Seenons    |    Danzigerkade 5B, 1013 AP Amsterdam     |    1015     |          [1, 2]           |
|  2  | Mega City One | Prins Hendrikkade, 100, 1012 JD Amsterdam |    2000     |          [3, 4]           |

See: https://github.com/seenons/seenons-be-assignment/blob/main/src/providers/entities/customer.entity.ts

### Registered Stream Pickups

    Definition:
      A Registered Stream Pickup is an Entity in our domain model that represents a scheduled pickup of a Waste Stream by a Service Provider at a given date.
    Role:
      It is used to register a pickup of a Waste Stream by a Service Provider at a given date.
    Attributes:
      id: A unique identifier for the Registered Stream Pickup.
      stream: The Waste Stream to be picked up.
      service_provider: The Service Provider that will pick up the Waste Stream.
      pickup_date: The date when the pickup will happen.

| id  |  stream  | service_provider  | pickup_date |
| :-: | :------: | :---------------: | ----------- |
|  1  | paper(1) |    Unwasted(1)    | 2023-10-02  |
|  2  | metal(2) |    Unwasted(1)    | 2023-10-04  |
|  3  | metal(2) | Bluecollection(2) | 2023-10-04  |
|  4  | metal(2) | Bluecollection(2) | 2023-10-06  |

See: https://github.com/seenons/seenons-be-assignment/blob/main/src/providers/entities/registered_stream_pickup.entity.ts

## Evaluation Gates

1. Implementation
2. Refactoring
3. Testability
4. Opportunities

### Requirements

---

#### Implementation

Customer Stream Pickup Registration

    - Ensure that a Stream can be picked up by the Service Provider at the given date

Service Providers Availability

    - Ensure that when searching for availability, the expected results is:

| postal_code |          date          |                      result                      |
| :---------: | :--------------------: | :----------------------------------------------: |
|    1010     |  2023-10-02 (Monday)   | [Unwasted (paper, metal), Bluecollection(metal)] |
|    1010     | 2023-10-04 (Wednesday) |    [Unwasted(metal) , Bluecollection(metal)]     |
|    2000     | 2023-10-05 (Thursday)  |             [Bluecollection(metal)]              |
|    1010     |  2023-10-08 (Sunday)   |                        []                        |
|    0000     |  2023-10-03 (Tuesday)  |                        []                        |

#### Testability

    - Ensure completeness of the Register Stream Service Spec.
    - Ensure completeness of the Service Providers Availability Spec.

### Bonus Points (not required but a nice to have)

#### Refactoring

    - Refactor the response model for the customer stream pickup registration.
    - Refactor Customer stream pickup registration use case.
      - Can you find and guard against business invariants?

#### Opportunities

    - Enhance testing capabilities and re-usability.
    - Implement a Database Provider.
    - Implement caching strategy.
    - Can you apply a better design pattern for the overall registration and data modeling?
    - Can you show us your understanding of Domain Driven Design and Loose Coupling?
    - Can you spot opportunities for a read-model?
    - Can you spot opportunities for a CQRS?

## Disclaimer

---

    Please note that this assignment is not a direct representation of how Seenons built its software.
    The assignment is meant for all levels of seniority in mind, so the concepts, patterns, domain models and tools have been simplified to ensure fairness.
