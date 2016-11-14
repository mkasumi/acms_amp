# a-blog cmsでAMP対応するためのテンプレート

個人ブログでAMP対応する際に、[a-blog cms](http://www.a-blogcms.jp/) で[AMP](https://www.ampproject.org/)対応できるテンプレートを作成したため、公開しています。
CSSや機能は最低限なものを用意していますので、カスタマイズして使用されることをおすすめしています。


## AMP対応する方法
方法としては、対応したいテーマのディレクトリにamp.html、/css/フォルダ、/include/フォルダ、/vars/フォルダを設置してください。

### 要変更箇所
- コンテンツ元のページ：<code>rel="amphtml"</code>を記述する ※1
- amp.html：「◯◯」と記述されている箇所をご自身のサイトの情報に変更する
- amp.html：18行目の@type
- モジュールID：relational_entry（Entry_TagRelational）の作成
- モジュールID：ogp_summary（Entry_Summary）の作成 ※2

※1、※2についての詳細は以下をご覧ください。

####※1 コンテンツ元のページ
元のコンテンツのページと紐づけるため、以下をhead要素内に記述してください。
````
<!-- BEGIN_MODULE Touch_Entry -->
<link rel="amphtml" href="%{CANONICAL_URL}/tpl/amp.html" /><!-- END_MODULE Touch_Entry -->
````

####※2 モジュールID「ogp_summary」を作成

- 表示設定：「投稿日時・更新日時」を有効にする
- 表示設定：[イメージ]項目にある「サイズ」を横1600x縦1600など最大幅で記述する（<code>{imgX}</code>や<code>{imgY}</code>を実物サイズで表示するため）
- 条件設定：URLコンテキストには「エントリーID」をチェックする

## テンプレートをカスタマイズする

AMPはとても厳密な仕様で作成されています。カスタマイズされる際は、使用できない機能、必須の記述、デバッグ方法を確認してください。

- [Create Your AMP HTML Page | Accelerated Mobile Pages Project](https://www.ampproject.org/docs/get_started/create/basic_markup)
- [Validate AMP Pages | Accelerated Mobile Pages Project](https://www.ampproject.org/docs/guides/validate)

### レイアウトの変更

レイアウトを変更するためには、/css/amp.cssをカスタマイズするか、/src/scss/に設置しているSCSSファイルをコンパイルしてください。
/css/amp.cssをカスタマイズする場合は、9行目〜12行目に記述されているインクルード先を/css/amp.css二変更してください。

CSSの読み込みには、インクルード機能を使ってCSSファイルを使って読み込んでいます。直接インラインに書いていない理由としては、Sass（SCSS）を使ってスタイルを管理したいためです。
今回のテンプレートではVer.2.6.1.4で配布されているacms-base.scssをカスタマイズしたものを@importしてユニットに最低限必要なacms.cssを使用できるようにしました。

````
<style amp-custom>
  <!-- #include file="/css/amp.min.css" -->
</style>
````

### iframe要素の対応

iframe要素はAMPページでは使用できません。代わりに<code>amp-iframe</code>要素をしています。iframeを使用する場合、データに多様性があるため、こちらのテンプレートではSlideShareとCodePenに対応したものを用意しています。
iframe要素に対応する際は、ご参考にしてください。

iframe要素に対応したカスタムユニットのテンプレートは/include/unit_amp/amp.htmlに設置しています。


## gulpfile.jsについて

gulpfile.jsでは、AMPに対応するため<code>!important</code>と<code>@charset "UTF-8";</code>のコードを削除する記述を行っています。
acms.cssで使用している<code>!important</code>と、gulp-csscombやgulp-cssnanoなどのプラグインを使用するとどうしても入ってしまう<code>@charset "UTF-8";</code>のコードを意図的に削除しています。
AMPページ用にSCSSをコンパイルする際は、こちらの記述を忘れないでください。

````
.pipe(replace('!important',''))
.pipe(replace('@charset \"UTF-8\";\n',''))
````

## 対応しているa-blog cms のバージョンについて
Ver.2.6.1より（テンプレート変数化を使用しているため）
テンプレート変数化で管理している部分は、カスタマイズしてご対応お願いします。
