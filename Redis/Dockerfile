#REDIS
FROM redis

# File Author / Maintainer
LABEL maintainer="Cristiano Ressi Di Cervia"

#Evironment Variable
ENV REDIS_CONF_DIR /usr/local/etc/redis/


USER root



#Conf File copy
RUN mkdir -p $REDIS_CONF_DIR

COPY config/redis.conf /usr/local/etc/redis/redis.conf
CMD [ "redis-server", "/usr/local/etc/redis/redis.conf" ]

WORKDIR $REDIS_SCRIPT_DIR




