FROM node:alpine3.13

WORKDIR /var/www/ptt

COPY ./package.json ./package-lock.json ./tsconfig.json ./.env $WORKDIR

COPY ./public ./public

RUN npm i

COPY ./src ./src

RUN npm run build

CMD ["npm", "run", "start:prod"]
