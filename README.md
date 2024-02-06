# Seenons Backend Assignment

## Overview

 - Adapters: I added two additional repositories, one for the registered stream pickups, and one for the waste streams.
 - Entities: I altered the Domain Model by removing the list of pickups from the customer entity and adding a reference to the customer in the registered stream pickup entity.  This simplified the customer object.  The list was replaced by a reference in the pickup object to the customer.  As a next step I'd add caching to the pickup searches to make them O(1).  
 I also added this method: isDateAvailableForPostalCode(pickupDate, postalCode): boolean to the service provider entity and a corresponding test.
 - Services: I implemented the service provider availability service & the register stream service
 - db: added a database provider
 - cache: added a cache interface and an in memory cache implementation, that could be easily swapped out for a Redis cache.

 ## Register Stream Response Service

 I changed the response of the service to include the Registered Stream Pickup entity rather than the customer entity. This was part of my refactoring of the domain model removing the list of pickups from the customer and adding the customer to the pickup.

 ## Next Steps
 - Download a database and get the db code actually running.  I fleshed out the implementation but haven't actually run it yet.
 - UUID primary key creation: use orm annotation to autogenerate primary keys on all the entities
 - Improve caching with TTL strategy, add for other repositories.
 - Registered Stream Pickup Repository cache: Change insertion into cache so it is O(1) - could use a map of a map of pickups: Map<customerId, Map<pickupId, pickupEntity>>, instead of an array as it currently stands: Map<customerId, pickupEntity[]>.  Could also create an additional cache to map the service providers to their list of pickups, as that seems like it could be something often requested too.

