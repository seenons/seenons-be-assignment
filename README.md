# Seenons Backend Assignment

Hello there!

At Seenons, we are building a platform to support a circular economy. This encompasses collection, transportation and re-purposing of different waste streams. A strong technical backbone, design and usability are key to the success of the platform!

## The assignment

Before a customer can request their waste to be collected via Seenons, we need to verify which waste streams are available for pickup at a given date. The task is to complete two services, one of them to retrieve availability of service providers and another to register the collection.

We have divided the assignment into what we called "gates", these gates are references to engineering skills that we are looking for in a future colleague.
Some of them are required, some of them give you bonus points.
Depending on your seniority, points are added or deducted based off your choices.

We purposely made this project framework agnostic and it only contains the bare minimum to perform the necessary use cases.

## The output

Make as many changes are you see fit for each gate, just make sure that these changes are functional.
In case you make changes to the data model (opportunity), be sure to include a diagram that explains the change.
Ensure that test coverage is adequate and that it matches what you would deliver as a product engineer.

## Technologies Used

This project is built using the following technologies:

- JavaScript
- npm
- TypeScript

Although experience with these technologies is not a requirement to join our team, we are looking for people who will be able to work in this ecosystem. Your own experience will be taken into account when reviewing your assignment, so no need to panic if you are not familiar with them.
## Data Model Representation

### Service Provider

A Service Provider can be described as:
A business that can perform a collection of waste for specific streams at specific dates.

| id  |      name      |                 address                 | covered streams |
| :-: | :------------: | :-------------------------------------: | :-------------: |
|  1  |    Rewaste     |   Stationplein, 1, 1012 AB Amsterdam    |     [1, 2]      |
|  1  | Bluecollection | Prins Hendrikkade, 1, 1012 JD Amsterdam |       [3]       |

#### Service Provider Covered Streams

Service provider covered streams can be described as:
The streams in which a service provider has covered in a postal code range, for a given availability.

| id  | stream_id | postal_code_start | postal_code_end |  avaialbility   |
| :-: | :-------: | :---------------: | :-------------: | :-------------: |
|  1  |   paper   |       1010        |      1020       |    [1, 2, 3]    |
|  2  |   metal   |       1010        |      1020       |   [1, 4, 5 ]    |
|  3  |   metal   |       1000        |      9999       | [1, 2, 3, 4, 5] |

#### Coverage Availability

Coverage availability can be described as:
A simple Date reference of an availability calendar.

| id  |    date    |
| :-: | :--------: |
|  1  | 2023-10-01 |
|  2  | 2023-10-02 |
|  3  | 2023-10-03 |
|  4  | 2023-10-04 |
|  5  | 2023-10-05 |

#### Expectation

When searching for:

| postal_code |    date    | result                                          |
| :---------: | :--------: | ----------------------------------------------- |
|    1010     | 2023-10-01 | [Rewaste (paper, metal), Bluecollection(metal)] |
|    1010     | 2023-10-04 | [Rewaste(metal) , Bluecollection(metal)]        |
|    2000     | 2023-10-05 | [Bluecollection(metal)]                         |
|    2000     | 2023-10-06 | []                                              |

---

### Customer

A Customer can be described as:
A person or business entity that has waste to be collected at a given address.

| id  |     name      |                  address                  | streams |
| :-: | :-----------: | :---------------------------------------: | :-----: |
|  1  |    Seenons    |    Danzigerkade 5B, 1013 AP Amsterdam     |   [1]   |
|  1  | Mega City One | Prins Hendrikkade, 100, 1012 JD Amsterdam |  [2,3]  |

#### Customer Streams

A Customer Stream can be described as:
A stream pickup for a customer to be performed by a Service Provider at a given date.

| id  | stream_id | service_provider_id | pickup_date |
| :-: | :-------: | :-----------------: | ----------- |
|  1  |   paper   |          1          | 2023-10-01  |
|  2  |   metal   |          2          | 2023-10-01  |
|  3  |   metal   |          2          | 2023-10-02  |

## Gates

1. Implementation
2. Refactoring
3. Testability
4. Opportunities

### Hard Requirements

#### Implementation

- Finalize implementing the customer stream pickup registration.
- Implement the use case to retrieve service providers available at a given location and date.

#### Testability

- Ensure completeness of the Register Stream Service Spec.
- Ensure completeness of the Service Providers Availability Spec.

### Bonus points

#### Refactoring

- Refactor the response model for the customer stream pickup registration.
- Refactor Customer streams registration use case.
  - Can you guard against business invariants?

#### Opportunities

- Enhance testing capabilities and reusability.
- Implement a Database Provider.
- Implement caching strategy.
- Can you apply a better design pattern for the overall registration and data modeling?
- Show us your understanding of Domain Driven Design and Loose Coupling.
- Can you spot opportunities for a `read-model`?

## Disclaimer

Please note that this assignment is not a direct representation of how Seenons built its software. It was designed with all levels of seniority in mind, so the concepts, patterns, and tools used may not be entirely accurate.
