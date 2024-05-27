# l2-b2-fullstack-track-assignment-8-prasanjitsarker3

Project Name: Pet Adoption Platform

Using Technology:
. Programming Language: TypeScript
. Web Framework: Express.js
. Object Relational Mapping (ORM): Prisma with PostgreSQL
. Authentication: JWT (JSON Web Tokens)

Project Setup:
Node.js Installation:You can download and install Node.js from the official website: Node.js Downloads
Follow the installation instructions for your operating system.

Cors Installation: npm install cors
Dotenv Installation: npm install dotenv

PostgreSQL Installation:
Download and install PostgreSQL from the official website: PostgreSQL Downloads
Follow the installation instructions for your operating system.

Prisma Installation:

Install Prisma globally using npm:
npm install prisma -g
Initialize Prisma in your project directory:
prisma init

Model: There are three table User, Pet, Adoption Request

Project conclusion:
User Model:
It includes fields such as id, name, email, password, createdAt, and updatedAt to represent user data.
Users can register with their name, email, and password, which are stored securely with password hashing.
Each user can make multiple adoption requests, establishing a one-to-many relationship with the Adoption Request model.

Pet Model:
Represents pets available for adoption with fields including id, name, species, breed, age, size, location, description, temperament, medicalHistory, adoptionRequirements, createdAt, and updatedAt.
Pets can be added to the platform with relevant details and can have multiple adoption requests associated with them, forming a one-to-many relationship with the Adoption Request model.

Adoption Request Model:
Represents requests made by users to adopt pets.
Includes fields such as id, userId, petId, status, petOwnershipExperience, createdAt, and updatedAt.
The status field indicates the status of the adoption request (e.g., PENDING, APPROVED, REJECTED) with a default value of PENDING.
This model establishes many-to-one relationships with both User and Pet models, ensuring each request belongs to a single user and is for a single pet.

About: In this project, users can register and log in to obtain authentication tokens. They can add pets to the platform and submit adoption requests, with requests initially set to "pending" status. Once reviewed, the status can be updated to "approved". Users can access their profiles using tokens and update their profile information. Data validation is implemented using Zod, ensuring the integrity of the data. Password security measures, such as JWT authentication and bcrypt hashing, are employed to safeguard user credentials.

Project Api Live Link: https://pet-adoption-pied.vercel.app
Server Side Link: https://github.com/Porgramming-Hero-web-course/l2-b2-fullstack-track-assignment-8-prasanjitsarker3
Video Link: https://drive.google.com/file/d/1fLi_iZNruB_TsBQvB6BJHvGtLemJ9J-e/view?usp=sharing
# Pet-Adoption-Server
