FROM node:18.12.1-alpine
LABEL maintainer="Nicholas Knight"

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

COPY package.json package-lock.json /temp/
RUN cd temp && npm ci && npm install -g nodemon

COPY . /src

RUN mv /temp/node_modules /src/node_modules

WORKDIR /src

EXPOSE 8001

CMD ["npm", "start"]
