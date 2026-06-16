FROM nginx:latest

COPY build/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN chmod -R g+rwX /var/cache/nginx \
    /var/run \
    /etc/nginx \
    /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx","-g","daemon off;"]
