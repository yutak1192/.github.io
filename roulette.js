let money = 10000;
const outcomes = [1, 1, 1, 1, 3, 3, 3, 5, 5, 10, 20];
let intervalId = null;
const display = document.getElementById("result1");
const display2 = document.getElementById("result2");
const yourMoney = document.getElementById("yourMoney");


//ボタンを押すことで動作する処理
function startRoulette() {
    //賭け金と選んだ目の取得
    const betAmount = parseInt(document.getElementById("bet").value);
    const betNumber = parseInt(document.getElementById("selected_bet").value);
    //例外処理
    if (isNaN(betAmount) || betAmount <= 0) {
        alert("賭け金を正しく入力してください。");
        return;
    }
    if (betAmount > money) {
        alert("賭け金が手持ちのお金を超えています\n身の程をわきまえてください");
        return;
    }

    //毎回ルーレットをさせるためにここで宣言
    let count = 0;
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
        const random = outcomes[Math.floor(Math.random() * outcomes.length)];
        display.innerHTML = random;
        count++;
        //中身が30回表示されたら(1.5秒後)
        if (count > 30) {
            clearInterval(intervalId);
            //倍率の計算メソッド
            determineResult(random, betNumber, betAmount);
        }
    }, 50);
}

//倍率の計算を行う
function determineResult(outcome, betNumber, betAmount) {

    if (outcome === betNumber) {
        const payoutRate = {
            1: 1.2,
            3: 2,
            5: 3,
            10: 6,
            20: 15
        };
        //当たりの目を加算し、負けは減算する
        const winAmount = Math.floor(betAmount * payoutRate[betNumber]);
        money += winAmount;
        display.innerHTML = `当たり！ ${winAmount} 円獲得しました！`;
    } else {
        money -= betAmount;
        display.innerHTML = ` ハズレ... ${betAmount} 円失いました。笑`;
         }
 //手持ち金額の変更
    yourMoney.innerHTML = (money);

    if (money <= 0) {
        display2.innerHTML = "手持ち額が0円になりました。ページを読み込んで再挑戦するか、帝愛グループのシェルター建設のために地下労働をしてください。";
    }
    else if (money >= 10000) {
        display2.innerHTML = "おめでとうございます！手持ちが1000000となり一日外出権を手に入れました!!!";
    }
    else {
        display2.innerHTML = "";
    }

}
