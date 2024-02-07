# Seenons Backend Assignment

Hello there!

At Seenons, we are building a platform to support a circular economy. This encompasses collection, transportation, and
re-purposing of different waste streams. The assignment you're about to undertake directly addresses two core aspects of
our platform, which are integral to our mission:

- **Finding service providers for waste collection**:
  Enabling our customers to locate service providers who can collect their waste on a specified date.
- **Registering a waste pickup**:
  Allowing our customers to schedule a waste pickup with a service provider.

These business cases form the basis of the use cases you will be implementing in this assignment.

## The assignment

### General Requirements

For both use cases, certain validation rules apply universally:

- Postal codes: Must be within the 0000 to 9999 range.
- The application does not need to consider timezones for simplicity.
- Waste streams: Must correspond to a predefined record in list of valid streams.
- Service provider: Must correspond to a predefined record in a list of service providers.

### Specific Use Case Requirements

1. **Service Partners Availability**
   Ensure the date for waste pickup is not before tomorrow, accounting for a next-day service policy.
   see: <https://github.com/seenons/seenons-be-assignment/blob/main/src/usecases/availability/find_availability_at.ts>

2. **Register Waste Pickup**
   The selected date must be within the service provider's scheduling constraints and waste stream availability.
   see: <https://github.com/seenons/seenons-be-assignment/blob/main/src/usecases/pickup/register_waste_pickup.ts>

Notes:

- You can use the provided code as a starting point or rebuild it however you see fit, including the domain
  representations in case you do not agree with its current contents.

## The delivery

- Create a **private** copy of this repository. Do not fork it.
- Create a new readme file that explains your take on the assignment, your thought process, and any other information
  that you believe is relevant for the review.
- Implement the necessary changes to at least achieve the requirements.
- Invite <caio@seenons.com> as a collaborator to your private repository.

## Domain models

**Customer**: A business entity or individual that generates waste and requires collection services. They initiate the
request for waste pickup at a specified location and time.

**Service Provider**: A business or organization that specializes in the collection and processing of waste. They have
specific capabilities and coverage areas, determining where and what types of waste they can handle.

**Waste Stream**: A category of waste, identified by characteristics like material type (e.g., paper, metal, glass) and
disposal method (e.g., recyclable, non-recyclable). It's what the customer needs to dispose of and the service provider
agrees to collect.

**Registered Waste Pickups**: The scheduled event where a service provider collects a specific waste stream from the
customer at a predetermined date and location. It's a record of the service agreement between the customer and the
service provider.

**Summary**
In essence, our domain models create a framework for managing waste collection and processing. Customers looking to
dispose of waste connect with service providers capable of handling their specific waste streams. Registered waste
pickups are the logistical manifestation of this connection, representing the planned collection events based on the
mutual agreement between the customer and the service provider.

If you wish to read the much longer and detailed version of the domain models,
see: <https://github.com/seenons/seenons-be-assignment/blob/main/DOMAIN.md>

## What are we looking for

### Implementation (required)

Your implementation should fulfill the specified use cases, demonstrating a clear understanding of the business logic
and the domain model interactions.

Key aspects we will assess include:

- Accuracy in meeting use cases requirements.
- Code quality and structure.
- Scalability and maintainability.

### Test Coverage (required)

We value thorough test coverage that ensures your implementation behaves as expected.
You might also be able to find edge cases that were not added

### Bonus Points (not required but a nice to have)

#### Opportunities 

While the core focus is on the required tasks, we encourage you to explore additional enhancements that can elevate your
solution. This is your chance to showcase creativity and depth of knowledge in software engineering principles.

Opportunities include:

- Database and Caching.
- Design Patterns and Architecture.
- Understanding of modern software engineering concepts.

These are not mandatory but are highly appreciated and can distinguish your submission. Whether through code or in your
readme file, we look forward to seeing your ideas.

## Technologies Used

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

Please note that this assignment is not a direct representation of how Seenons built its software.

The assignment is meant for all levels of seniority in mind, so the concepts, patterns, domain models and tools have
been simplified to ensure fairness.

## FAQ

Q: Do I have to strictly follow the provided project structure and naming conventions?
A: No, you have the flexibility to structure your project in a way that makes sense for your solution. However, please
ensure your readme clearly explains any significant deviations to help reviewers follow your thought process.

Q: Is it okay to implement additional features not outlined in the requirements?
A: Oh yes! We encourage innovation and exploring new ideas.

Q: How should I handle any assumptions I need to make during the implementation?
A: You can document assumptions in your project's readme.

Q: What happens after I submit my assignment?
A: We will review your submission and provide feedback. The review process typically takes 1 working day.

Q: Are there any specific coding standards or practices I should follow?
A: While we have no strict requirements, we recommend following industry best practices for code quality, testing, and
documentation. This includes clear naming conventions, modular design, and comprehensive unit tests.

Q: Can I include third-party libraries or frameworks in my solution?
A: Yes, third-party libraries are allowed.

Q: Can I make this an API instead?
A: Yes

Q: Can I add memes and ASCII Art?
A: Please do.

```
           .--._.--.
          ( O     O )
          /   . .   \
         .`._______.'.
        /(           )\
      _/  \  \   /  /  \_
   .~   `  \  \ /  /  '   ~.
  {    -.   \  V  /   .-    }
_ _`.    \  |  |  |  /    .'_ _
>_       _} |  |  | {_       _<
 /. - ~ ,_-'  .^.  `-_, ~ - .\
         '-'|/   \|`-`
```
