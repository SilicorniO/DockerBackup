# linux
FROM ubuntu:latest

# avoid tzdata interaction
ENV DEBIAN_FRONTEND=noninteractive

# Install cron
RUN apt-get clean 
RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get -y install tzdata
RUN apt-get -y install zip unzip
RUN apt-get -y install awscli
RUN apt-get -y install gettext-base
RUN apt-get -y install curl

# install mysql client
RUN apt-get -y install mysql-client
COPY ./conf/mysql.cnf /config/mysql_template.cnf

# copy scripts
COPY ./conf/*.sh /scripts/
RUN chmod +x /scripts/*.sh

# create folder for backups
RUN mkdir /backups
RUN mkdir /restore

# execute entry point
ENTRYPOINT ["/scripts/entrypoint.sh"]