# Articles

- [How to Unit Test Next.js API Routes with TypeScript](https://www.paigeniedringhaus.com/blog/how-to-unit-test-next-js-api-routes-with-typescript)
- [Unit testing Next.js API routes](https://seanconnolly.dev/unit-testing-nextjs-api-routes)
- [NextAuth-OAuth](https://next-auth.js.org/configuration/providers/oauth)
- [NextAuth-Facebook](https://next-auth.js.org/providers/facebook)
- [Pusher with Vercel](https://vercel.com/guides/deploying-pusher-channels-with-vercel)
- [Database design basics](#database-design-basics)
- [Zod with next](https://giancarlobuomprisco.com/next/protect-next-api-zod)
- [RESTful web API design](#api-design)
- [NextAuth Tutorial](https://themodern.dev/courses/build-a-fullstack-app-with-nextjs-supabase-and-prisma-322389284337222224)

- TODO:
  - Infinite scrolling

## Database design basics

- [Source](https://support.microsoft.com/en-us/office/database-design-basics-eb2159cf-1e30-401a-8084-bd4f9c9ca1f5)

- Avoid duplicate/redundant data
- Completeness and correctness is important

- A good database design is, therefore, one that:
  - Divides your information into _subject-based tables_ to reduce redundant data.
  - Provides information to join the information in the tables together as needed.
  - Accommodates your data processing and reporting needs.

### The design process

1. Determine the purpose of your database

- a well developed mission statement that can be referred to throughout the design process.

2. Gather and organize all the types the information you might want to record

- start with your existing information and list each type
- think of what information you want fill into a form? Or what will be created?
- What information would you put on the form? What fill-in boxes would you create?
- consider the types of reports or mailings you might want to produce from the database
  - what kind of api calls will you make?
- you should break each piece of information into its smallest useful parts.
  - Name -> Last and First name
- Think about the questions you might want the database to answer.

3. Divide the information into major subjects, which will become tables

- try to record each fact just once
- if you find yourself repeating the same information, place that information into a separate table

4. Add the fields for each table
5. Specify primary keys(id)
6. Decide how the data in one table is related to the data in other tables.
7. Refine your design by analyzing a sample
8. Apply the normalization rules

## API Design

- [Source](https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design)

- The web API should be able to evolve and add functionality independently from client applications.

- REST APIs are designed around resources, which are any kind of object, data, or service that can be accessed by the client.

- HTTP protocol

  - GET: retrieves resource
  - POST: create
  - PUT: create or update
  - PATCH: partial update
  - DELETE: remove

- Avoid creating APIs that simply mirror the internal structure of a database.
- The purpose of REST is to model entities and the operations that an application can perform on those entities.
- A client should not be exposed to the internal implementation.
- think of the web API as an abstraction of the database.
- If necessary, introduce a mapping layer between the database and the web API.
- That way, client applications are isolated from changes to the underlying database scheme.
