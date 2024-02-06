# Seenons Backend Assignment

Hello there!

At Seenons, we are building a platform to support a circular economy. This encompasses collection, transportation and re-purposing of different waste streams and our assignment is a subset of what we do.

## The assignment

---

The task is to at least complete two use cases and their corresponding specs.

- Retrieve availability of service providers at a given location, waste stream and date.
  - see: <https://github.com/seenons/seenons-be-assignment/blob/main/src/usecases/availability/find_availability_at.ts>
- Register a waste stream pickup to be performed by a service provider.
  - see: <https://github.com/seenons/seenons-be-assignment/blob/main/src/usecases/pickup/register_waste_pickup.ts>

You can use the provided code as a starting point or rebuild it however you see fit, including the domain representations in case you do not agree with its contents.

## The delivery

---

- Create a **private** copy of this repository. Do not fork it.
- Create a new readme file that explains your take on the assignment, your thought process, and any other information that you believe is relevant for the review.
- Implement the necessary changes to at least achieve the requirements.
- Invite <caio@seenons.com> as a collaborator to your private repository.

## Domain Models

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

See: <https://github.com/seenons/seenons-be-assignment/blob/main/src/domain/waste_stream.ts>

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

| id  |      name      |       address        | coverages |
| :-: | :------------: | :------------------: | :-------: |
|  1  |    Unwasted    |   Stationplein, 1    |    [ ]    |
|  2  | Bluecollection | Prins Hendrikkade, 1 |    [ ]    |

See: <https://github.com/seenons/seenons-be-assignment/blob/main/src/domain/service_provider.ts>

### Service Provider Coverage

    Definition:
      A relational entry that links Service Providers with specific Waste Streams coverages.
    Role:
      It is used to determine which Waste Streams are covered by a Service Provider in a given area
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

See: <https://github.com/seenons/seenons-be-assignment/blob/main/src/domain/service_provider_coverage.ts>

### Customer

    Definition:
      A Customer is an entry in our domain model that represents a person or business entity that has waste to be collected at a given address.
    Role:
      Customers are the ones that request the collection of waste streams.
    Attributes:
      id: A unique identifier for the Customer.
      name: The name of the Customer.
      address: The address of the Customer.
      postal_code: The postal code referred to the address.

| id  |     name      |        address         | postal_code |
| :-: | :-----------: | :--------------------: | :---------: |
|  1  |    Seenons    |    Danzigerkade 5B     |    1015     |
|  2  | Mega City One | Prins Hendrikkade, 100 |    2000     |

See: <https://github.com/seenons/seenons-be-assignment/blob/main/src/domain/customer.ts>

### Registered Waste Pickups

    Definition:
      A Registered Waste Pickup is an entry in our domain model that represents a scheduled pickup of a Waste Stream to be performed by a Service Provider at a given date.
    Role:
      It is used to register the pickup of a Waste Stream which has to be performed by a Service Provider at a given date.
    Attributes:
      id: A unique identifier for the Registered Stream Pickup.
      waste_stream: The Waste Stream to be picked up.
      service_provider: The Service Provider that will pick up the Waste Stream.
      pickup_date: The date when the pickup will happen.

| id  | waste_stream | service_provider  | pickup_date |
| :-: | :----------: | :---------------: | ----------- |
|  1  |   paper(1)   |    Unwasted(1)    | 2023-10-02  |
|  2  |   metal(2)   |    Unwasted(1)    | 2023-10-04  |
|  3  |   metal(2)   | Bluecollection(2) | 2023-10-04  |
|  4  |   metal(2)   | Bluecollection(2) | 2023-10-06  |

See: <https://github.com/seenons/seenons-be-assignment/blob/main/src/domain/registered_stream_pickup.ts>

## Evaluation Gates

---

1. Implementation
2. Test Coverage
3. Opportunities

### Implementation (required)

Waste Stream Pickup Registration

- Make sure that a Stream can be picked up by the Service Provider at the given date

Service Providers Availability

- Make sure that when searching for availability, the following lines are respected per postal code and date:
- You can use the provided data set to achieve it. see: <https://github.com/seenons/seenons-be-assignment/blob/main/src/domain/dataset/service_providers.data.ts>

| postal_code |    date    |                      result                      |
| :---------: | :--------: | :----------------------------------------------: |
|    1010     | 2023-10-02 | [Unwasted (paper, metal), Bluecollection(metal)] |
|    1010     | 2023-10-04 |    [Unwasted(metal) , Bluecollection(metal)]     |
|    2000     | 2023-10-05 |             [Bluecollection(metal)]              |
|    1010     | 2023-10-08 |                        []                        |
|    0000     | 2023-10-03 |                        []                        |

### Test Coverage (required)

- Complete Register Waste Pickup Spec.
- Complete Find Availability Spec.

### Bonus Points (not required but a nice to have)

#### Opportunities

- Implement a Database Provider and whatever layer of communication you deem neccessary.
- Can you implement a caching strategy somewhere?
- Can you apply a better design pattern for the overall registration and data modeling following concepts around Rich Domains?
- Can you show us your understanding of Loose Coupling and Single Responsiblity?
- Can you spot opportunities for a read-model? If so, how would you achieve it?
- Apply concepts of distributed messaging, consitency models and overall concurrency.
- How would you limit the amount of waste pickups that a Service Provider can perform per day?

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

## Disclaimer

---

Please note that this assignment is not a direct representation of how Seenons built its software.

The assignment is meant for all levels of seniority in mind, so the concepts, patterns, domain models and tools have been simplified to ensure fairness.

## FAQ

- Do I have to use the base project for my assignment? No
- Do I have to use exactly the payload and response models that were provided? No
- Can I rename or move the files? Yes
- Can I use architectural patterns X or Y? Please do.
- Do I have to use a database? No, you can use in memory objects or the provided data set
- Can I expose this as an API instead? Yes
- Can I do more than asked? Yes, the time is yours
- Is there a deadline? No, but please be mindful that its FIFO.
- How long does it take to complete the assignment? You can use as much time as you want, make it nice, make it useful, make it print ascii art, you choose as its your personal time.
