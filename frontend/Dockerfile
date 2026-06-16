FROM nginx:latest

COPY build/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN chmod -R g+rX /usr/share/nginx/html

EXPOSE 8080
