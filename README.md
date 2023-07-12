# AFour Hackathon

## College Library Management

## Project Live Site
https://tubular-sopapillas-0d7c3a.netlify.app/

#### login credentials:

#### Administrator
##### email - admin@codehomies.com
##### password - admin123

#### Librarian
##### email - libarian1@codehomies.com
##### password - librarian123

## Docker local setup

#### Pull docker repositories
```
docker pull thunderblade03/library-students-server:0.0.2.RELEASE
docker pull thunderblade03/library-books-server:0.0.2.RELEASE
docker pull thunderblade03/library-lendings-server:0.0.2.RELEASE
docker pull thunderblade03/library-dashboard:0.0.2.RELEASE
```
#### Create containers
```
docker run --name libarary-students-container -d -p 5002:5002 thunderblade03/library-students-server:0.0.2.RELEASE
docker run --name libarary-books-container -d -p 5000:5000 thunderblade03/library-books-server:0.0.2.RELEASE
docker run --name libarary-lendings-container -d -p 5001:5001 thunderblade03/library-lendings-server:0.0.2.RELEASE
docker run  --name libarary-dashboard-container -it -p 5173:3000 thunderblade03/library-dashboard:0.0.2.RELEASE
```
The react app may take some time on first load, so have please wait

NOTE: The env variables are in the docker image itself so no need to setup them

### Run app
http://localhost:5173

You may use the credentials mentioned above to login

## Manual local setup 
NOTE: Do this if you don't have docker or if you want to run unit tests

### Install dependencies

#### Windows
```
.\install-dependencies.bat
```

#### Linux
```
chmod +x install-dependencies.sh
./install-dependencies.sh
```

### Environment Variables
##### Create .env file and place it in books, lending and students directory.
```
MONGO_URI=[your mongo uri]
JWT_SECRET=[your jwt secret key]
JWT_LIFETIME=10d
```
### Run servers
#### Windows
```
.\start-servers.bat
```

#### Linux
```
chmod +x start-servers.sh
./start-servers.sh
```
NOTE: Create your own administrator under the users model using mongo compass to start using the app

### Run unit tests
NOTE: servers should be started before do unit testing 
#### Students server
```
cd students
npm test
```
#### Books server
```
cd books
npm test
```
#### Lendings server
```
cd lending
npm test
```
## API Endpoints
Import the a4-hackathon.postman_collection JSON file in postman