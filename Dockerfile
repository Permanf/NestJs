FROM node:21

WORKDIR /usr/scr/app

COPY . .

RUN npm install

EXPOSE 5001

#npm run start:dev will start the server in development mode.
CMD ["npm", "run", "start:dev"]