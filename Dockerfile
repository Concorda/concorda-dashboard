FROM node

ADD . /
RUN npm install
RUN npm run build

EXPOSE 3050

CMD ["npm", "start", "--seneca.log=level:info"]