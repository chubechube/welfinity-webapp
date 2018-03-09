#Nodejs
FROM node:latest

# Expose the port the app runs in
EXPOSE 4200

# File Author / Maintainer
LABEL maintainer="Cristiano Ressi Di Cervia"

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY ./welfinity-angular-frontend/package.json /usr/src/app


# Get all the code needed to run the app
COPY ./welfinity-angular-frontend /usr/src/app
