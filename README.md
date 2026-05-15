# Dailytally

護摩供の「毎日集計」用のシンプルな Web アプリです。

## できること

- 9つの伝道会ごとに、管理ページで指定した期間分の数字を入力
- 管理ページで9つの連続集計タイプの護摩供を選択可能
- 護摩供ごとに項目・単位・回数・入力データを分けて管理
- 合計ページで、9伝道会分の日次合計と最終入力値を確認
- 週の開始日と最終日を変更して運用可能
- 先頭の管理ページで週の開始日・最終日・項目数・得道者数開始日・護摩供回数を確認
- 画面タイトルに護摩供名を表示
- 得道者数開始日を指定して、合計ページの見出しに反映
- 護摩供回数は護摩供ごとの次回回数を表示
- 目標は各伝道会ごとに週の初日のみ入力可能
- 入力内容は Cloudflare D1 に自動保存され、全員で同じデータを確認可能
- SSO ユーザーの伝道会名により、自分の伝道会のみ入力可能
- 管理ページで SSO ユーザー一覧を確認可能
- 以前のブラウザ保存データがある場合、DB が空なら初回表示時に D1 へ移行
- 最後に開いていたタブ（各伝道会/合計ページ）も保存して復元

## 使い方

1. Cloudflare Workers にデプロイした URL をブラウザで開く
2. 「管理ページ」タブで「護摩供」「週の開始日」「最終日」「得道者数開始日」を設定
3. 上部タブから各伝道会名を開いて入力
4. 「合計ページ」タブで全伝道会合計を確認

## SSO連携

SSO側から以下のヘッダーを渡す想定です。

- `x-dailytally-login-id`
- `x-dailytally-fellowship`
- `x-dailytally-name`
- `x-dailytally-email`

`x-dailytally-fellowship` が `大江戸` などの伝道会名と一致すると、その伝道会ページのみ入力できます。他伝道会と合計ページは閲覧のみです。SSO未連携で伝道会名が渡らない場合は、従来どおり入力できます。

authentik Proxy Providerを使う場合は、標準ヘッダーも読み取ります。

- `X-authentik-username`
- `X-authentik-email`
- `X-authentik-name`
- `X-authentik-groups`

`X-authentik-groups` に `大江戸` などの伝道会名が含まれていれば、その伝道会ユーザーとして扱います。`admin`、`dailytally-admin`、`管理者` のいずれかが含まれていれば管理者として扱います。

Cloudflare Workers単体で使う場合は、authentikのOAuth2/OpenID Providerを使います。Cloudflare Secretsに以下を設定すると、アプリ全体がOIDCログイン必須になります。

```
npx wrangler secret put --name dailytally AUTHENTIK_ISSUER
npx wrangler secret put --name dailytally AUTHENTIK_CLIENT_ID
npx wrangler secret put --name dailytally AUTHENTIK_CLIENT_SECRET
npx wrangler secret put --name dailytally SESSION_SECRET
```

authentik側のProvider設定:

- Provider種別: OAuth2/OpenID Provider
- Redirect URI: `https://<デプロイ先>/auth/callback`
- Scopes: `openid profile email groups`
- Subject mode: hashed user IDなど任意

`AUTHENTIK_ISSUER` はProviderのOpenID Configurationに表示されるissuer URLを設定します。例: `https://auth.showway.biz/application/o/dailytally/`

ログインユーザーにはauthentikグループを付与してください。管理者は `dailytally-admin`、各伝道会ユーザーは `大江戸`、`お台場`、`羽田`、`かながわ`、`富士山`、`駿天`、`埼玉`、`千葉`、`山梨` のいずれかを付けます。グループがないユーザーは管理ページも入力もできません。

### 動作確認

1. `https://<デプロイ先>/auth/login` を開く
2. authentik でログインする
3. `https://<デプロイ先>/api/me` を開く
4. `loginId`、`email`、`role`、`fellowship` が返ることを確認する

認証情報が切り替わらないときは、authentik ではなく Dailytally 側のセッションを切るために `https://<デプロイ先>/auth/logout` を開いてから、もう一度ログインしてください。authentik のログアウトだけでは Dailytally の Cookie が残る場合があります。

### 権限の考え方

- `dailytally-admin` が付いているユーザーは管理者
- `大江戸` などの伝道会グループが付いているユーザーはその伝道会の入力担当
- どのグループも付いていないユーザーは閲覧や更新を許可しない

### 運用チェック

1. authentikで対象ユーザーに `dailytally-admin` か伝道会グループを付ける
2. authentik側でグループ変更をしたら、authentikのログアウトではなく `https://<デプロイ先>/auth/logout` を開く
3. もう一度 `https://<デプロイ先>/auth/login` から入り直す
4. `https://<デプロイ先>/api/me` で `role` と `fellowship` を確認する
5. うまく権限が変わらないときは、authentikのグループ付与より先にDailytally側のセッション切り替えを疑う
6. 管理者として入れたら `https://<デプロイ先>/api/report-pdf` でPDF生成を確認する

## Cloudflare D1設定

1. 依存関係をインストール
   `npm install`
2. D1データベースを作成
   `npx wrangler d1 create dailytally`
3. 表示された `database_id` を `wrangler.toml` の `database_id` に設定
4. D1マイグレーションを適用
   `npm run db:migrate:remote`
5. Workersへデプロイ
   `npm run deploy`

## オンライン報告の自動送信

管理ページの「オンライン報告」で送信時刻、送信者名、伝道会名、通知先メールを設定できます。週の開始日から最終日まで、期間中は毎日指定時刻に送信します。
ログイン情報はD1やコードには保存せず、Cloudflare Secretsに設定します。

```
npx wrangler secret put --name dailytally TENDO_ACCOUNT
npx wrangler secret put --name dailytally TENDO_PASSWORD
```

PDF生成はCloudflare Browser RenderingでD1の集計データをA4横PDF化します。

デプロイ後、管理者でアクセスできる状態で次のURLを開くとPDF生成を確認できます。

```
https://<デプロイ先>/api/report-pdf
```

tendo.netの実送信は外部フォーム確認後に有効化します。実送信を許可する場合は、送信先フォーム設定と明示フラグをCloudflare側に設定してください。

```
npx wrangler secret put --name dailytally REPORT_ONLINE_POST_URL
npx wrangler secret put --name dailytally REPORT_ONLINE_FORM_URL
npx wrangler secret put --name dailytally REPORT_ONLINE_FILE_FIELD
npx wrangler secret put --name dailytally REPORT_ONLINE_SUBMIT_FIELD
npx wrangler secret put --name dailytally REPORT_REMOTE_SUBMIT
```

`REPORT_ONLINE_FORM_URL` は未設定時 `/advanced/online.php` です。`REPORT_ONLINE_FILE_FIELD` は未設定時 `up_file[]`、`REPORT_ONLINE_SUBMIT_FIELD` は未設定時 `kannondo` です。弥勒寺へ送る場合は `mirokuji` を設定してください。

メール通知にResendを使う場合:

```
npx wrangler secret put --name dailytally RESEND_API_KEY
npx wrangler secret put --name dailytally REPORT_NOTIFY_FROM
```

聖明王院系の現行コードメモ:

- `99300` 聖明王院
- `31101` 埼玉準公壇
- `31201` 千葉準公壇
- `31303` 大江戸準総壇
- `31304` 羽田準総壇
- `31305` お台場準総壇
- `31407` かながわ準総壇
- `32204` 富士山準総壇
- `32205` 駿天準総壇
