FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json .

RUN yarn && yarn add typescript -g serve -g 

COPY . .

# COPY components.json postcss.config.js tailwind.config.js index.html vite.config.ts fix.ts ./

ARG BACKEND_URL

EXPOSE 3003

RUN yarn build

CMD [ "yarn", "start" ]