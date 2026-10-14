// 本棚の表示と、背表紙を押したときの詳細表示。
// 本のデータは books.js（SHELVES と BOOKS）から読む。

(function () {
  "use strict";

  // 背表紙の色（背景色と文字色の組）。落ち着いた色だけを使う
  const SPINE_COLORS = [
    { c: "#5b2a26", fg: "#efe4d2" }, // 臙脂
    { c: "#2f4a3a", fg: "#ece3d0" }, // 深緑
    { c: "#2e3a4a", fg: "#e9e2d4" }, // 藍鼠
    { c: "#c9b48f", fg: "#3a2e22" }, // 砂色
    { c: "#8a6a3e", fg: "#f3ead9" }, // 黄土
    { c: "#e6dccb", fg: "#3b322a" }, // 白っぽい紙
    { c: "#3b3530", fg: "#e3d6bf" }, // 焦茶
    { c: "#7a4b3a", fg: "#f1e5d3" }, // 煉瓦
    { c: "#5e6650", fg: "#eee6d4" }, // 鶯茶
    { c: "#a8443a", fg: "#f6ebdc" }, // 朱
  ];

  // ISBN などの文字列から、毎回同じになる数を作る（見た目のばらつきに使う）
  function hash(text) {
    let h = 2166136261;
    for (let i = 0; i < text.length; i++) {
      h ^= text.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function spineLook(book) {
    const h = hash(String(book.isbn || book.title));
    const color = SPINE_COLORS[h % SPINE_COLORS.length];
    return {
      c: color.c,
      fg: color.fg,
      width: 36 + ((h >>> 5) % 6) * 4, // 36〜56px
      height: 80 + ((h >>> 11) % 21),  // 段の高さの 80〜100%
      band: (h >>> 19) % 3,            // 飾り線の種類
    };
  }

  function applyColors(el, look) {
    el.style.setProperty("--c", look.c);
    el.style.setProperty("--fg", look.fg);
  }

  // ---- 本棚を作る ----
  const bookcase = document.getElementById("bookcase");

  SHELVES.forEach(function (shelf) {
    const books = BOOKS.filter(function (b) { return b.shelf === shelf.id; });
    if (books.length === 0) return;

    const section = document.createElement("section");
    section.className = "shelf";

    const name = document.createElement("h2");
    name.className = "shelf-name";
    name.textContent = shelf.name;
    section.append(name);

    const row = document.createElement("div");
    row.className = "shelf-books";

    books.forEach(function (book) {
      const look = spineLook(book);

      const slot = document.createElement("div");
      slot.className = "slot";

      const spine = document.createElement("button");
      spine.type = "button";
      spine.className = "spine";
      spine.dataset.band = String(look.band);
      spine.setAttribute("aria-label", book.title + "（" + book.author + "）の詳細を開く");
      spine.title = book.title;
      applyColors(spine, look);
      spine.style.setProperty("--w", look.width + "px");
      spine.style.setProperty("--h", look.height + "%");

      // 背表紙には、半角スペースより後ろのサブタイトルを除いて出す
      // （「増補 〜」のように前が短いときは、次のまとまりまで含める）
      const parts = book.title.split(" ");
      let mainTitle = parts[0];
      if (mainTitle.length < 4 && parts.length > 1) mainTitle += " " + parts[1];

      // 長いタイトルは2列に分けて書く
      const cols = mainTitle.length > 11 ? 2 : 1;
      spine.style.setProperty("--hp", String(look.height / 100));
      spine.style.setProperty("--len", String(Math.ceil(mainTitle.length / cols)));
      if (cols === 2) {
        spine.classList.add("is-long");
        spine.style.setProperty("--w", Math.max(look.width, 52) + "px");
      }

      const title = document.createElement("span");
      title.className = "spine-title";
      title.textContent = mainTitle;
      spine.append(title);

      spine.addEventListener("click", function () {
        openDetail(book, look, spine);
      });

      slot.append(spine);
      row.append(slot);
    });

    section.append(row);
    bookcase.append(section);
  });

  // ---- 詳細表示 ----
  const dialog = document.getElementById("detail");
  const coverBox = document.getElementById("detail-cover");
  const titleEl = document.getElementById("detail-title");
  const authorEl = document.getElementById("detail-author");
  const publisherEl = document.getElementById("detail-publisher");
  const commentEl = document.getElementById("detail-comment");
  let lastSpine = null;

  // 表紙画像がないときの、タイトルと著者を組んだ表紙
  function makeCover(book, look) {
    const cover = document.createElement("div");
    cover.className = "made-cover";
    cover.setAttribute("role", "img");
    cover.setAttribute("aria-label", "『" + book.title + "』の表紙（仮）");
    applyColors(cover, look);

    const frame = document.createElement("div");
    frame.className = "made-cover-frame";

    const t = document.createElement("div");
    t.className = "made-cover-title";
    t.textContent = book.title;

    const a = document.createElement("div");
    a.className = "made-cover-author";
    a.textContent = book.author;

    frame.append(t, a);
    cover.append(frame);
    return cover;
  }

  function showCover(book, look) {
    coverBox.replaceChildren();
    if (!book.cover) {
      coverBox.append(makeCover(book, look));
      return;
    }
    const img = document.createElement("img");
    img.alt = "『" + book.title + "』の表紙";
    img.addEventListener("error", function () {
      coverBox.replaceChildren(makeCover(book, look));
    });
    // 読み込めても極端に小さい画像（中身のない画像）なら作った表紙にする
    img.addEventListener("load", function () {
      if (img.naturalWidth < 10) coverBox.replaceChildren(makeCover(book, look));
    });
    img.src = book.cover;
    coverBox.append(img);
  }

  function openDetail(book, look, spine) {
    lastSpine = spine;
    showCover(book, look);
    titleEl.textContent = book.title;
    authorEl.textContent = book.author;
    publisherEl.textContent = book.publisher;

    const comment = (book.comment || "").trim();
    commentEl.textContent = comment || "感想準備中";
    commentEl.classList.toggle("is-empty", !comment);

    dialog.showModal();
    dialog.querySelector(".detail-body").scrollTop = 0;
  }

  // 閉じるボタン（Esc キーではブラウザが自動で閉じる）
  document.getElementById("detail-close").addEventListener("click", function () {
    dialog.close();
  });

  // 詳細の外側（暗い部分）を押しても閉じる
  dialog.addEventListener("click", function (e) {
    if (e.target === dialog) dialog.close();
  });

  // 閉じたら、押した背表紙に操作位置を戻す
  dialog.addEventListener("close", function () {
    if (lastSpine) lastSpine.focus({ preventScroll: true });
  });
})();
