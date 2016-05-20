FROM gcr.io/api-dannydavidson-com/alpine-node-k8s:latest

RUN mkdir -p /src
WORKDIR /src

# Install app dependencies
RUN npm install -g nodemon

ADD package.json ./package.json
RUN npm install

# Bundle app source
ADD . .

EXPOSE 11235

CMD ["node", "server.js"]
