// 本のデータ。
// 本を追加するときは { ... }, のかたまりを1つコピーして中身を書き換える。
// comment の "" の中に感想を書く（空なら「感想準備中」と表示する）。
// cover が null の本は、タイトルと著者からデザインした表紙を表示する。

const SHELVES = [
  { id: "justice", name: "正義と倫理" },
  { id: "freewill", name: "自由意志と責任" },
  { id: "thinking", name: "考えるための道具" },
];

const BOOKS = [
  // ---- 正義と倫理 ----
  {
    title: "これからの「正義」の話をしよう",
    author: "マイケル・サンデル（鬼澤忍 訳）",
    publisher: "早川書房（ハヤカワ・ノンフィクション文庫）",
    isbn: "9784150503765",
    shelf: "justice",
    cover: null,
    comment: "ああああ",
  },
  {
    title: "自由論",
    author: "J.S.ミル（関口正司 訳）",
    publisher: "岩波書店（岩波文庫）",
    isbn: "9784003900024",
    shelf: "justice",
    cover: null,
    comment: "",
  },
  {
    title: "進化倫理学入門",
    author: "スコット・ジェイムズ（児玉聡 訳）",
    publisher: "名古屋大学出版会",
    isbn: "9784815808969",
    shelf: "justice",
    cover: "https://cover.openbd.jp/9784815808969.jpg",
    comment: "",
  },

  // ---- 自由意志と責任 ----
  {
    title: "増補 責任という虚構",
    author: "小坂井敏晶",
    publisher: "筑摩書房（ちくま学芸文庫）",
    isbn: "9784480099532",
    shelf: "freewill",
    cover: "https://cover.openbd.jp/9784480099532.jpg",
    comment: "",
  },
  {
    title: "格差という虚構",
    author: "小坂井敏晶",
    publisher: "筑摩書房（ちくま新書）",
    isbn: "9784480074287",
    shelf: "freewill",
    cover: "https://cover.openbd.jp/9784480074287.jpg",
    comment: "",
  },
  {
    title: "自由意志の向こう側 決定論をめぐる哲学史",
    author: "木島泰三",
    publisher: "講談社（講談社選書メチエ）",
    isbn: "9784065217719",
    shelf: "freewill",
    cover: null,
    comment: "",
  },
  {
    title: "そうしないことはありえたか？ 自由論入門",
    author: "高崎将平",
    publisher: "青土社",
    isbn: "9784791774920",
    shelf: "freewill",
    cover: null,
    comment: "",
  },
  {
    title: "自由意志対話 自由・責任・報い",
    author: "ダニエル・C・デネット、グレッグ・D・カルーゾー（木島泰三 訳）",
    publisher: "青土社",
    isbn: "9784791775255",
    shelf: "freewill",
    cover: null,
    comment: "",
  },

  // ---- 考えるための道具 ----
  {
    title: "「読まなくてもいい本」の読書案内",
    author: "橘玲",
    publisher: "筑摩書房（ちくま文庫）",
    isbn: "9784480435927",
    shelf: "thinking",
    cover: "https://cover.openbd.jp/9784480435927.jpg",
    comment: "",
  },
  {
    title: "わかったつもり 読解力がつかない本当の原因",
    author: "西林克彦",
    publisher: "光文社（光文社新書）",
    isbn: "9784334033224",
    shelf: "thinking",
    cover: null,
    comment: "",
  },
  {
    title: "99.9%は仮説 思いこみで判断しないための考え方",
    author: "竹内薫",
    publisher: "光文社（光文社新書）",
    isbn: "9784334033415",
    shelf: "thinking",
    cover: null,
    comment: "",
  },
  {
    title: "論理学をつくる",
    author: "戸田山和久",
    publisher: "名古屋大学出版会",
    isbn: "9784815803902",
    shelf: "thinking",
    cover: "https://cover.openbd.jp/9784815803902.jpg",
    comment: "",
  },
];
