FROM node:12.13.0

# app directory
RUN mkdir /usr/src/app
RUN mkdir /usr/src/app/backups
WORKDIR /usr/src/app

COPY ./dist .

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# execute server
CMD ["node", "/usr/src/app/server.js"]