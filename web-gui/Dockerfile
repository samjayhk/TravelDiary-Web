FROM node:10

WORKDIR /home/ubuntu/app/web-gui

COPY package*.json ./

RUN npm install

COPY . /home/ubuntu/app/web-gui

EXPOSE 4200
CMD [ "npm", "run", "start" ]