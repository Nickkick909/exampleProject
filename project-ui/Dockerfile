FROM node:14-alpine
LABEL maintainer="Colin Griffin <colin@krum.io>"

ARG REACT_APP_NODE_ENV


ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

COPY ./package.json ./package-lock.json /temp/
RUN cd /temp && npm ci

COPY . /src
RUN cp -Rf /temp/node_modules/ /src/node_modules/
RUN cd /src && npm run build

WORKDIR /src

CMD ["npm", "start"]
# CMD ["npm", "run", "start:production"]