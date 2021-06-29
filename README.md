# Gachagacha

- あらかじめ、DBに登録してある番号がガチャガチャで引くことができる
- ガチャガチャを引くときは、メールアドレスを設定する。(ユーザを一意に特定するキーとなる)
- 同一メールアドレスを指定してガチャガチャを引いた場合、同じ結果が取得される。(1人1回しか引けない仕様)

# Demo

![demo.gif](https://raw.githubusercontent.com/wiki/yamagata-developers-society/gachagacha/demo.gif)

# Setup

## Database Setup

### Create Table and Primary key
```postgresql
--
-- Name: box; Type: TABLE; Schema: public;
--

CREATE TABLE public.box (
    boxno integer NOT NULL,
    email character varying(80)
);

--
-- Name: box box_pkey; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.box
    ADD CONSTRAINT box_pkey PRIMARY KEY (boxno);
```

### Create data

初期データとして、ガチャガチャを引いた時に出てくる番号を```box```テーブルにデータを作成しておく。(```boxno```に指定した数値が引かれる番号)\
以下の例では、ガチャガチャで1, 2, 3のいずれかが表示されることになる。

```postgresql
INSERT INTO public.box (boxno, email) VALUES (1, NULL);
INSERT INTO public.box (boxno, email) VALUES (2, NULL);
INSERT INTO public.box (boxno, email) VALUES (3, NULL);
```

## Build Setup

```bash
# install dependencies
$ yarn install

# enables .env file for dot_env 
$ cp dot_env .env

# change postgres db setting (DATABASE_URL)
$ vi .env

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

# License
TBD