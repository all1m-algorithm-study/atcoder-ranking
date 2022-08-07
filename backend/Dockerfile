FROM node:14

RUN mkdir -p /app
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --no-cache
RUN npm install -g nodemon
RUN npm install -g typescript
RUN npm install -g ts-node
ENV PATH /app/node_modules/.bin:$PATH

COPY . .