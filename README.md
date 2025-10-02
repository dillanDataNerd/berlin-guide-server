# Berlin Guide App

## Summary
Berlin Guide is a full-stack web application that helps people explore activities in Berlin and log what they did during their visit.  

The purpose of building this project was to practice and deepen knowledge in:
1. **TypeScript** – for type-safety and maintainability  
2. **Postgres / Prisma** – for relational data modeling and querying  
3. **Material UI** – exploring a wider range of UI components  

👉 **Live App:** [https://berlinguide.netlify.app](https://berlinguide.netlify.app)  
👉 **Client Repository:** [berlin-guide-client](https://github.com/dillanDataNerd/berlin-guide-client)  

---

## Technologies and Libraries Used
- **Node.js** with **Express** – server and API endpoints  
- **Prisma ORM** – database access and migrations  
- **PostgreSQL** – relational database  
- **TypeScript** – strongly typed backend code  
- **CORS / Morgan / Cookie-Parser** – common Express middlewares  
- **UUID** – unique identifiers for activities and trips  

---

## Backlog Functionalities
- Ability to favorite and rate activities  
- Map integration (using stored latitude/longitude)  
- More advanced filters (tags, seasons, favorites combined)
- Full CRUD capabilties for trips and related activities
---

## Models
Defined in `prisma/schema.prisma`:

```prisma
enum ActivityTag {
  FOOD
  HISTORIC
  PARTY
  DILLAN_SPECIAL
  SEASON_SUMMER
  SEASON_WINTER
  SEASON_ALL
}

model Activity {
  id          String       @id @default(uuid()) @unique
  title       String
  description String
  location    String        // Google Maps link
  latitude    Float?
  longitude   Float?
  photoUrl    String
  tags        ActivityTag[]
  fave        Boolean       @default(false)
  trips       Trip[]
}

model Trip {
  id                 String    @id @default(uuid()) @unique
  title              String
  guests             String[]
  dateStarted        DateTime
  daysInBerlin       Int?
  highlights         String?
  interestingThings  String?
  photoUrl           String?
  activities         Activity[]
  updatedAt          DateTime   @updatedAt
}
```

---

## Client Routes
The **client app** consumes these API endpoints from the server:

- `GET /api/trips` – fetch all trips  
- `POST /api/trips` – create a new trip  
- `GET /api/trips/:id` – fetch single trip details  
- `PUT /api/trips/:id` – update a trip  
- `DELETE /api/trips/:id` – delete a trip  

- `GET /api/activities` – fetch all activities  
- `GET /api/activities/:id` – fetch single activity details  

- `GET /api/activities/search` – filter activities by title, tags, or favorites  

---

## Services
- **Prisma Client** – database queries and filtering (e.g., `hasSome` for tags)  
- **Express Routers** – organized endpoints for activities and trips (`/src/routes`)  
- **Middleware** – CORS, logging (morgan), cookie handling  
- **Environment Config** – via `.env` for DB connection and origin whitelist  

---

## Other Notes
- This repo is the **server/backend**. To run it locally:
  ```bash
  git clone https://github.com/dillanDataNerd/berlin-guide-server.git
  cd berlin-guide-server
  npm install
  npx prisma migrate dev
  npm run dev
  ```
- Requires a **Postgres database** (set `DATABASE_URL` in `.env`)
- The **frontend** is hosted separately (see client repo link above).  
- Built during Ironhack bootcamp as a portfolio project to practice **full-stack TypeScript development**.  
