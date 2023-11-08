# Seenons Backend Assignment

Hello there!

At Seenons, we are building a platform to support a circular economy. This encompasses collection, transportation and
re-purposing of different waste streams. A strong technical backbone, design and usability are key to the success of the
platform!

## The assignment

Before a customer can request their waste to be collected via Seenons, we need to verify which waste streams are
available for pickup at a given date. The task is to complete two services, one of them to retrieve availability of
service providers and another to register the collection.

We have divided the assignment into what we called "gates", these gates are references to engineering skills that we are
looking for in a future colleague.
Some of them are required, some of them give you bonus points.

We purposely made this project framework-agnostic, and it only contains the bare minimum to perform the necessary use
cases but make sure to apply the same concepts that you would use in a real-world scenario when exposing an
API.

## The output

Make as many changes are you see fit for each gate, just make sure that these changes are functional.

In case you make changes to the data model (opportunity), be sure to include a diagram that explains it.

Ensure that test coverage is adequate and that it matches what you would deliver as a product engineer.

## Technologies Used

This project is built using the following technologies:

- Node.js
- npm
- TypeScript

Although experience with these technologies is not a requirement to join our team, we are looking for people who will be
able to work in this ecosystem. Your own experience will be taken into account when reviewing your assignment, so no
need to panic if you are not familiar with them.

You can complete the assignment using the following ecosystems:

- Node JS/TS
- .NET (Core) 5+
- Java / Kotlin
- Python

## Data Model Representation

### Waste Stream

A Waste Stream can be described as:
A specific type of waste that can be collected by a Service Provider and is registered for collection by a Customer.

| id | label |
|:--:|:-----:|
| 1  | paper |
| 2  | metal |
| 3  | glass |

### Service Provider

Can be described as:
A business that can collect a specific set of waste streams.

| id |      name      |                 address                 | coverages |
|:--:|:--------------:|:---------------------------------------:|:---------:|
| 1  |    Unwasted    |   Stationplein, 1, 1012 AB Amsterdam    |  [1, 2]   |
| 2  | Bluecollection | Prins Hendrikkade, 1, 1012 JD Amsterdam |    [3]    |

We have two service providers, "Unwasted" and "Bluecollection".

### Service Provider Coverage

Can be described as:
The waste streams in which a service provider has covered in a postal code range, for a given set of weekdays.

| id |  stream  | postal_code_start | postal_code_end |              weekday_availability              |
|:--:|:--------:|:-----------------:|:---------------:|:----------------------------------------------:|
| 1  | paper(1) |       1010        |      1020       |          [Monday, Tuesday, Thursday]           |
| 2  | metal(2) |       1010        |      1020       |          [Monday, Wednesday, Friday]           |
| 3  | metal(2) |       1000        |      9999       | [Monday, Tuesday, Wednesday, Thursday, Friday] |

This means that "Unwasted" can:

- Collect Paper in the postal code range 1010-1020 on [Monday, Tuesday, Wednesday] .
- Collect Metal in the postal code range 1010-1020 on [Monday, Wednesday, Friday].

While "Bluecollection" can:

- Collect Metal in the postal code range 0000-9999 on [Monday, Tuesday, Wednesday, Thursday, Friday].

---

### Customer

Can be described as:
A person or business entity that has waste to be collected at a given address.

| id |     name      |                  address                  | registered_stream_pickups |
|:--:|:-------------:|:-----------------------------------------:|:-------------------------:|
| 1  |    Seenons    |    Danzigerkade 5B, 1013 AP Amsterdam     |            [1]            |
| 1  | Mega City One | Prins Hendrikkade, 100, 1012 JD Amsterdam |          [2, 3]           |

#### Registered Stream Pickups

Can be described as:
A "scheduled" pickup registered by a customer to be performed by a Service Provider at a given date

| id | stream_id | service_provider_id | pickup_date |
|:--:|:---------:|:-------------------:|-------------|
| 1  |   paper   |          1          | 2023-10-02  |
| 2  |   metal   |          2          | 2023-10-04  |
| 3  |   metal   |          2          | 2023-10-06  |

## Evaluation Gates

1. Implementation
2. Refactoring
3. Testability
4. Opportunities

### Hard Requirements

#### Implementation

- Implement the customer stream pickup registration.
- Implement the use case to retrieve which service providers are available at a given location and date.

#### Expectations

When registering a stream pick up, at least the following requirements must be met:

- Ensure that said Stream can be picked up by the Service Provider at the given date

When searching for service providers, the expected results is:

| postal_code |          date          |                      result                      |
|:-----------:|:----------------------:|:------------------------------------------------:|
|    1010     |  2023-10-02 (Monday)   | [Unwasted (paper, metal), Bluecollection(metal)] |
|    1010     | 2023-10-04 (Wednesday) |    [Unwasted(metal) , Bluecollection(metal)]     |
|    2000     | 2023-10-05 (Thursday)  |             [Bluecollection(metal)]              |
|    1010     |  2023-10-08 (Sunday)   |                        []                        |
|    0000     |  2023-10-03 (Tuesday)  |                        []                        |

#### Testability

- Ensure completeness of the Register Stream Service Spec.
- Ensure completeness of the Service Providers Availability Spec.

### Bonus points

#### Refactoring

- Refactor the response model for the customer stream pickup registration.
- Refactor Customer stream pickup registration use case.
    - Can you guard against business invariants?

#### Opportunities

- Enhance testing capabilities and re-usability.
- Implement a Database Provider.
- Implement caching strategy.
- Can you apply a better design pattern for the overall registration and data modeling?
- Can you show us your understanding of Domain Driven Design and Loose Coupling?
- Can you spot opportunities for a `read-model`?

## Disclaimer

Please note that this assignment is not a direct representation of how Seenons built its software.

The assignment is meant for all levels of seniority in mind, so the concepts, patterns, domain models and tools have
been simplified to ensure fairness.
