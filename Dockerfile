FROM nginx
EXPOSE 5000
COPY dist/spa /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
