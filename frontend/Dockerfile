# Build stage
#FROM node:20 AS builder

#WORKDIR /app

#COPY package*.json ./

#RUN npm install

#COPY . .

#RUN npm run build


# Runtime stage
FROM nginx:latest

COPY build/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN chmod -R 755 /usr/share/nginx/html && \
    chgrp -R 0 /usr/share/nginx/html && \
    chmod -R g=u /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx","-g","daemon off;"]
