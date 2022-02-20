## 概要

- websocketサーバーのローカル環境構築。
- nodeのexpressを使ってwebsocketサーバーを構築している。
- nginxはリバースプロキシとして動作させている。
- typescriptも使用。
- log出力も行えるようにしている。

## メモ

#### Endpoint
- localでwebsocketを接続する際のendpoint
> 'ws://localhost:443’

#### 環境情報

|要素技術|バージョン|
|----|----|
| Ubuntu | 20.04 |
| nginx | 1.19.3 |
| node | 14.17.6 |
| npm | 7.22.0 |

- LocalのUbuntu情報
```
NAME="Ubuntu"
VERSION="20.04.3 LTS (Focal Fossa)"
ID=ubuntu
ID_LIKE=debian
PRETTY_NAME="Ubuntu 20.04.3 LTS"
VERSION_ID="20.04"
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
VERSION_CODENAME=focal
UBUNTU_CODENAME=focal
```

## 構築手順

#### 1. buildする

```
websocket-test $ make build
```

#### 2. 立ち上げてnpm installする

```
websocket-test $ make up
websocket-test $ make npm-install
```

- 上記は初回およびpackage.jsonが更新された場合に実行する

#### 3 socketサーバーを立ち上げる

```
websocket-test $ make npm-start-ts
```

- 自動でサーバーが立ち上がるようにしていない。websocketを利用するのみ上記を実行し立ち上げる事。