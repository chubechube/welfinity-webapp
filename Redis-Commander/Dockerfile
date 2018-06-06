#REDIS
FROM node:alpine

# File Author / Maintainer
LABEL maintainer="Cristiano Ressi Di Cervia"

# Install node packages.
RUN npm install -g redis-commander
#RUN echo '{}' > /root/.redis-commander

# Define the entrypoint script.
ENTRYPOINT ["redis-commander"]

# Expose ports.
EXPOSE 8082






