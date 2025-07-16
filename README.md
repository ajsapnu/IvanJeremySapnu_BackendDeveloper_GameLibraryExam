Game Library API

A secure RESTful API for managing a Game Library with JWT-based authentication, built using Node.js, Express.js, and MongoDB.

---

Features

User Registration & Login (with bcrypt password hashing)  
JWT-based authentication for protected routes  
Add, edit, delete, view, and search games  
MongoDB with Mongoose ODM  
Structured using MVC pattern  
Environment variable management with .env  
Rate limiting for security (if implemented)

---

Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Tokens (jsonwebtoken)
- Bcrypt (bcrypt)
- dotenv
- express-rate-limit (if implemented)

---

Folder Structure

game-library-api/

controllers/
authController.js
gameController.js

models/
userModel.js
gameModel.js

routes/
authRoutes.js
gameRoutes.js

routes/
authRoutes.js
gameRoutes.js

middlewares/
auth.js
rateLimiter.js

utils/
db.js

.env.example
server.js
package.json


1. Clone the repository

```bash
git clone https://github.com/ajsapnu/game-library-api.git
cd game-library-api


2. install dependencies

npm install


3. Duplicate .env.example and rename it to .env, then fill in:

PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/game_library
JWT_SECRET=your_jwt_secret_here


4. start the server

node server.js


API Endpoints

Authentication
POST /api/auth/register – Register a user

POST /api/auth/login – Login user, returns JWT

Game Management
GET /api/games – List all games (public)

GET /api/games/search?query= – Search games by title, genre, platform (public)

POST /api/games – Add a game (protected)

PUT /api/games/:id – Edit a game (protected)

DELETE /api/games/:id – Delete a game (protected)


JWT Authentication
After logging in, include your token in requests requiring authentication:

Authorization: Bearer <your_token_here>



Testing with Postman

/api/auth/login 
/api/auth/register
Register

Login

Copy token and use in Bearer Auth for protected routes

Add, edit, delete, view games


Notes

Passwords are securely hashed using bcrypt.

JWT tokens expire in 1 day for security.

Input validation should be extended for production use.

Rate limiting middleware can be enabled for brute-force protection.


License
This project is for educational and examination purposes only.

Author
Ivan Jeremy Sapnu (@ajsapnu)