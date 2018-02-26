FROM node:latest

#Installing required packages
RUN apt-get update
RUN apt-get install sshpass

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY ./webserver-app/package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY ./webserver-app /usr/src/app

EXPOSE 3030
CMD [ "npm", "start" ]