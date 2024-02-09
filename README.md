# CRUD Meal app
## Get Started
There are two services for this app, frontend and backend. The frontend will not work without the backend service. 

### Clone repo
#### Clone the repo
```
git clone git@github.com:paul-mcn/crud-app.git
cd crud-app/
```

#### Start the backend service
```
# 1. Start the backend service
cd back-end/

# 2. install packages
npm i

# 3. Start backend service
npm start
```
The backend service runs on http://localhost:4000/

#### Start the frontend service
In a new terminal `cd /path/to/crud-app`
```
# 1. Start the backend service
cd back-end/

# 2. install packages
npm i

# 3. Start frontend service
npm start
```
The frontend service runs on http://localhost:3000/

## Additional Info
The app uses a local sqlite3 database which is created automatically, no .env vars are necessary for either service.

