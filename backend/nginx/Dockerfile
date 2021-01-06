FROM nginx:1.17.7-alpine

COPY default.conf /etc/nginx/conf.d/

ARG CACHE_DATE=2016-01-01

COPY static-files/ /var/www/html/