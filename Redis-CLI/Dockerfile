#REDIS-CLI
FROM alpine:latest

# File Author / Maintainer
LABEL maintainer="Cristiano Ressi Di Cervia"

#Environment Variables  
ENV SCRIPT_DIR /org/welfinity/scripts
ENV PARAM_DIR /org/welfinity/parameters

#Change user
USER root

#Scipt and jobs Copy
RUN mkdir -p $SCRIPT_DIR
RUN mkdir -p $PARAM_DIR
ADD scripts $SCRIPT_DIR
ADD parameters $PARAM_DIR 

# Install node packages.
RUN apk --update add redis
#RUN "/bin/sh -c /org/welfinity/scripts/wait-for.sh WelfinityWebappRedis:6379 -- /org/welfinity/scripts/load-parameters.sh"
#RUN "/bin/sh -c /org/welfinity/scripts/wait-for.sh WelfinityWebappRedis:6379 "
ENTRYPOINT ["/bin/sh", "-c", "/org/welfinity/scripts/wait-for.sh WelfinityWebappRedis:6379 -- /org/welfinity/scripts/load-parameters.sh"]






