FROM nginx:1.19.3

RUN rm /etc/nginx/conf.d/default.conf

# NON SSL仕様
COPY templates/non-ssl/default.conf /etc/nginx/conf.d/default.conf
# SSL仕様にする時は以下
# COPY templates/ssl/default.conf /etc/nginx/conf.d/default.conf
# COPY certs/wild.example.jp.pem  /etc/nginx/cert/wild.example.jp.pem

RUN apt-get update && apt install -y vim

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]