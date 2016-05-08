FROM mhart/alpine-node:6

RUN mkdir -p /src
WORKDIR /src

# Install app dependencies
ADD package.json ./package.json
RUN npm install

# Bundle app source
ADD . .

EXPOSE 11235

CMD ["node", "server.js"]
