FROM node:10

WORKDIR /home/ubuntu/app/api

COPY package*.json ./

RUN npm install bcrypt

RUN npm config set registry="http://registry.npmjs.org/" \
    && npm config set strict-ssl false \
    && npm i node-pre-gyp 
	
RUN npm config set registry="http://registry.npmjs.org/" \
&& npm config set strict-ssl false \
&& npm install

COPY . /home/ubuntu/app/api

EXPOSE 3001
CMD [ "npm", "run", "start" ]