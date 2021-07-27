FROM node:14

RUN mkdir -p /app
WORKDIR /app
COPY package.json .
RUN npm install --no-cache
RUN npm install -g react-scripts
RUN npm install -g react-router-dom
ENV PATH /app/node_modules/.bin:$PATH

COPY . .