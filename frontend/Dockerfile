FROM openshift/nginx:latest

COPY build/ /opt/app-root/src/

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
