FROM node:17.5.0-alpine3.14 as build

WORKDIR /usr

COPY package.json ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./
COPY src ./src

RUN npm install
RUN npm run build


FROM node:17.5.0-alpine3.14 as app

WORKDIR /usr

COPY package.json ./
COPY --from=build /usr/dist .

RUN npm install --only=production

EXPOSE 4001

CMD ["node","main.js"]