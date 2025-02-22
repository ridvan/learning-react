# <sub><img src="https://github.com/user-attachments/assets/ef6e0325-a30b-44b5-860a-96d715e65469" height="35" width="35"></sub> Learning React

I used the starter files of [this repository](https://github.com/jonasschmedtmann/ultimate-react-course) and completed them throughout the course.

- **Course**: [The Ultimate React Course 2024: React, Next.js, Redux & More](https://www.udemy.com/course/the-ultimate-react-course/)
- **Certificate:** [Udemy](https://www.udemy.com/certificate/UC-bb4dc222-43ba-4bc2-93b7-beecffe5403c/)

> [!NOTE]
> All course material belongs to Jonas Schmedtmann and used for educational purposes.

## Final Projects

The course has two final projects. The rest of the projects can also be found under `course-projects`. The first one is a website for a fictional cabin rental company called The Wild Oasis. The second one is a dashboard for the company to manage bookings and cabins.

### The Wild Oasis - Website

<img width="250" alt="Website screenshot 1" src="https://github.com/user-attachments/assets/23d98363-781b-4353-915d-f2e9e8ed1df0" />
<img width="250" alt="Website screenshot 2" src="https://github.com/user-attachments/assets/ef03dfd5-d85b-4bc3-9e1b-b5bba5416ae9" />
<img width="250" alt="Website screenshot 3" src="https://github.com/user-attachments/assets/147ea533-0010-4ae7-9b65-de00bcead0c7" />
<br/><br/>

**Check out the website:** [The Wild Oasis](https://the-wild-oasis-rdv.vercel.app/)

- **Framework**: Next.js
- **Auth**: NextAuth.js
- **DB**: PostgreSQL via Supabase
- **Concepts Covered**: Server Components, Server Actions, App Router, Suspense, Middleware for Auth, Suspense, useOptimistic and useTransition hooks, caching in Next.js.

#### Development

1. Make a copy of `.env.local.example` and rename it to `.env.local`.
2. Create a Supabase project.
3. Create the necessary tables and buckets on Supabase as given in the DB Scheme section.
4. Create a user from the Authentication section on Supabase.
5. Create a Google Cloud project and create an Oauth client.
6. Fill in the environment variables.
7. Update hostname in `next.config.mjs` for the images on Supabase.
8. Run the following commands:

```bash
cd course-projects/the-wild-oasis-website
npm install
npm run dev
```

### The Wild Oasis - Dashboard

<img width="250" alt="Dashboard screenshot 1" src="https://github.com/user-attachments/assets/2c76e099-4bec-4c72-a06b-153ba2f34e58" />
<img width="250" alt="Dashboard screenshot 2" src="https://github.com/user-attachments/assets/9126de19-5b91-45c8-983d-eb968823fdab" />
<img width="250" alt="Dashboard screenshot 3" src="https://github.com/user-attachments/assets/3a197c6d-3b1e-4959-b677-d5d34d50e99c" />
<br/><br/>

**Check out the dashboard:** <i>It will be added after making a non-mutateable version.</i>

- **Framework**: React + Vite
- **Auth**: Supabase Auth
- **DB**: PostgreSQL via Supabase
- **Concepts Covered**: React Query for remote state, Context for global UI state, Compound Components, Styled Components, React Router, React Error Boundaries.

#### Development

1. Make a copy of `.env` and rename it to `.env.local`.
2. Use the same Supabase project created for the website.
3. Fill in the environment variables.
4. Run the following commands:

```bash
cd course-projects/the-wild-oasis
npm install
npm run dev
```

### DB Scheme on Supabase

![db scheme](https://github.com/user-attachments/assets/185ad456-3022-49df-a82b-e9fbc8240853)

#### bookings

`id: int8` |
`created_at: timestamptz` |
`startDate: timestamp` |
`endDate: timestamp` |
`numNights: int2` |
`numGuests: int2` |
`cabinPrice: float4` |
`extrasPrice: float4` |
`totalPrice: float4` |
`status: text` |
`hasBreakfast: boolean` |
`isPaid: boolean` |
`observations: text` |
`cabinId: int8 (Relation: public.cabins.id)` |
`guestId: int8 (Relation: public.guests.id)`

#### cabins

`id: int8` |
`created_at: timestamptz` |
`name: text` |
`maxCapacity: int2` |
`regularPrice: int2` |
`discount: int2` |
`description: text` |
`image: text`

#### guests

`id: int8` |
`created_at: timestamptz` |
`fullName: text` |
`email: text` |
`nationalId: text` |
`nationality: text` |
`countryFlag: text`

#### settings

`id: int8` |
`created_at: timestamptz` |
`minBookingLength: int2` |
`maxBookingLength: int2` |
`maxGuestsPerBooking: int2` |
`breakfastPrice: float4`

### Storage Buckets

`avatars` | `cabin-images`
