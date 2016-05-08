FROM mhart/alpine-node:6

RUN mkdir -p /src
WORKDIR /src

# Install app dependencies
ADD package.json /src
RUN npm install

# Bundle app source
ADD . /src

EXPOSE 11235

CMD ['node', 'server.js']
