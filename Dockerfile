FROM node:latest
RUN mkdir -p /App
WORKDIR /App
COPY . /App
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]