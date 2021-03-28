# linux
FROM ubuntu:latest

# avoid tzdata interaction
ENV DEBIAN_FRONTEND=noninteractive

# Install cron
RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get -y install zip unzip
RUN apt-get -y install awscli
RUN apt-get -y install gettext-base

# install mongodb dump
RUN apt-get -y install mongo-tools

# copy scripts
COPY ./conf/*.sh /scripts/
RUN chmod +x /scripts/*.sh

# create folder for backups
RUN mkdir /backups

# execute entry point
ENTRYPOINT ["/scripts/entrypoint.sh"]