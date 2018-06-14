#REDIS
FROM node:alpine

# File Author / Maintainer
LABEL maintainer="Cristiano Ressi Di Cervia"

#Environment Variables  
ENV SCRIPT_DIR /org/welfinity/scripts

#Change user
USER root

#Scipt and jobs Copy
RUN mkdir -p $SCRIPT_DIR
ADD scripts $SCRIPT_DIR

# Install node packages.
RUN npm install -g redis-commander

# Expose ports.
EXPOSE 8082






