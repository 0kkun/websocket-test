FROM ubuntu:20.04

RUN apt-get update
RUN apt-get install -y curl vim tzdata
RUN apt-get install -y nodejs npm

# nパッケージをインストール
RUN npm install -g n
# nからNode.jsをインストール
RUN n 14.17.6
# npmのバージョンを変更
RUN npm install -g npm@7.22.0

## 不要なパッケージを削除
RUN apt-get purge nodejs npm -y
RUN apt-get autoremove -y

WORKDIR /home/app

EXPOSE 3000