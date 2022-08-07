FROM node:alpine

WORKDIR /usr/src/sociosDemo

# Wildcard used to copy to container "package.json" AND "package-lock.json"
COPY ./package*.json ./
RUN yarn install
COPY ./index.js ./

EXPOSE 3000
CMD ["yarn","docker"]