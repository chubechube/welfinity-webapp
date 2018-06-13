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
#RUN echo '{}' > /root/.redis-commander

# Define the entrypoint script.
#ENTRYPOINT ["/org/welfinity/scripts/wait-for.sh WelfinityWebappRedis:6379 -- redis-commander"]
#CMD [ "/org/welfinity/scripts/wait-for.sh WelfinityWebappRedis:6379 -- redis-commander --redis-host WelfinityWebappRedis --redis-password foobared2  -p 8082" ]
# Expose ports.
EXPOSE 8082






