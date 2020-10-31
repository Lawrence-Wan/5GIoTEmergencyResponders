FROM node:12
RUN mkdir -p /5giot/src/app
WORKDIR /5giot/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9000
EXPOSE 9001
CMD ["npm", "start"]

