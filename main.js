// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;

// 必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
// 複数のテキストを格納する配列
const textLists = [
  'apple','grape','car','bike','red','blue',
  'pink','yellow','green','train','money',
  'pen','cup','water','book','soup','tomato',
  'potato','milk','black','white','note',
  'fire','bag','shoes','paper'
];

// ランダムなテキストを表示
const createText = () => {
 // 正タイプした文字列をクリア
  typed = '';
  typedfield.textContent = typed;
  // 配列のインデックス数からランダムな数値を生成する
let random = Math.floor(Math.random() * textLists.length);
// 配列からランダムにテキストを取得し画面に表示する
  untyped = textLists[random];
  untypedfield.textContent = untyped;
};


// キー入力の判定
const keyPress = e => {
//誤タイプの場合
  if(e.key !== untyped.substring(0,1)) {
    wrap.classList.add('mistyped');setTimeout(() => {
      wrap.classList.remove('mistyped');
    }, 100);

    return;
  }

// 正タイプの場合

// スコアのインクリメント
  score ++;
  wrap.classList.remove('mistyped');
  typed += untyped.substring(0, 1);
   untyped = untyped.substring(1);
   typedfield.textContent = typed;
   untypedfield.textContent = untyped;
 // テキストがなくなったら新しいテキストを表示
   if(untyped === '') {
    createText();
  }
};

start.addEventListener('click', () => {
  // カウントダウンタイマーを開始する
  timer();

  createText();
  start.style.display = 'none';

  document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = "スタートボタンで開始";






// タイピングスキルのランクを判定
const ranKCheck = score => {
  // テキストを格納する変数を作る
  let text = '';

  // スコアに応じて異なるメッセージを変数textに格納する
  if(score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`
  } else if(score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`
  } else if(score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`
  } else if(300 <= score) {
    text = `あなたのランクはSです。`
  }

  return `${score}文字打てました！\n${text}\n【OK】リトライ / 【キャンセル】終了`
};


// Finish the game.
const gameOver = () => {
  
  console.log("ゲーム終了");
  const result = confirm(ranKCheck(score));

  if(result == true) {
    window.location.reload();
  }
};

// Countdown timer.
const timer = () => {
  // タイマー部分のHTML要素（p要素）を取得する
  let time = count.textContent;

  const id = setInterval(() => {
    // カウントダウンする
    time--;
    count.textContent = time;
    // カウントが0になったらタイマーを停止する
    if(time <= 0) {
      clearInterval(id);
      gameOver();
    }
  }, 1000);
};

