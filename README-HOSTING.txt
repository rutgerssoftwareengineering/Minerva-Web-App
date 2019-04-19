Here's how to host the app locally and broadcast it to the world wide web:

    Step 1: Build an optimized front-end 

        $ cd client
        $ react-scripts build

    Step 2: Run the front-end server locally

        $ serve build
        (install serve with 'npm install -g serve")

    Step 3: Run the back-end server locally

        $ cd backend
        $ node server.js

    Step 4: Forward the back-end server

        $ lt --port 3001 --subdomain minervabackend
        (install localtunnel with 'npm install -g localtunnel)

    Step 5: Forward the front-end server

        $ ssh -R minerva:80:localhost:5000