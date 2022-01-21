let sum = ''; // хранит временно переменные для выражения в экране
let summary = []; //массив с числами, с которым происходит математические выражения
let output = []; // выражение для вывода в экран
let sign = false;




const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['+', '-', '/', '*', '%', '+/-'];

// экраны вывода
const out = document.querySelector('.calc-screen p')
const outExp = document.querySelector('.summary p')

function clearAll() {
    while (summary.length > 0 || output.length > 0) {
        summary.splice(0, 1);
        output.splice(0, 1)
    }
    out.innerHTML = '';
    outExp.innerHTML = '';
    sum = '';
}

function playAudio(soundId = "pilik") {
    let audio = new Audio();

    if (playAction[soundId]) soundId = playAction[soundId];

    console.log(soundId)

    audio.src = `audio/${soundId}.mp3`;
    audio.play();
}

const playAction = {
    '/': "divide",
    "*": 'multiply',
    '+': 'plus',
    '-': 'minus',
    '=': 'equal',
    "pilik": "pilik"
}

// const playAction = {
//     '/': {
//         name: "divide",
//         handler: () => {

//         }
//     },
//     "*": 'multiply',
//     '+': 'plus',
//     '-': 'minus',
//     '=': 'equal',
//     "pilik": "pilik"
// }

document.querySelector('.buttons').addEventListener('click', (event, hitsounds) => {
    hitsounds = event.target.textContent;
    //нажата не кнопка
    if (!event.target.classList.contains('btn')) return;
    //вызывает звук в зависимости от нажатой кнопки
    playAudio(hitsounds)
})
//если нажата кнопка '+/-'
document.querySelector('.plus-minus').addEventListener('click', () => {
    if (sum < 0) {
        sum = +sum;
    } else {
        sum = -sum;
    }
    out.innerHTML = sum;
    outExp.innerHTML = sum;
})


document.querySelector('.ac').addEventListener('click', clearAll);

document.querySelector('.buttons').addEventListener('click', (event) => {
    //нажата не кнопка
    if (!event.target.classList.contains('btn')) return;
    //нажата кнопка clearAll ac
    if (event.target.classList.contains('ac')) return;
    //нажата кнопка +/-
    if (event.target.classList.contains('plus-minus')) return;


    //получаю нажатую кнопку
    const key = event.target.textContent;

    //если нажата кнопка (0-9,.)
    if (digit.includes(key)) {
        sum += key;
        output.push(key);
        out.innerHTML = sum;
        outExp.innerHTML = output.join('');
        //если нажимаешь цифру после итога
        if (summary.length == 1 && sign && !action.includes(key)) {
            clearAll();
            sum += key;
            output.push(key);
            out.innerHTML = sum;
            outExp.innerHTML = output.join('');
        }
    }

    //если нажат знак
    if (action.includes(key)) {
        switch (key) {
            case ('+'):
                summary.push(parseFloat(sum));
                summary.push("+");
                out.innerHTML = "";
                break;
            case ('-'):
                summary.push(parseFloat(sum));
                summary.push("-");
                out.innerHTML = "";
                break;
            case ('*'):
                summary.push(parseFloat(sum));
                summary.push("*");
                out.innerHTML = "";
                break;
            case ('/'):
                summary.push(parseFloat(sum));
                summary.push("/");
                out.innerHTML = "";
                break;
            case ('%'):
                summary.push(parseFloat(sum));
                summary.push("%");
                out.innerHTML = "";
                break;
            case ('.'):
                let searchPoint = out.innerHTML.indexOf('.');
                if (searchPoint == -1 && out.innerHTML.length != 0) {
                    out.innerHTML = out.innerHTML + '.';
                }
                break;
        }
        sum = key;
        output.push(key);
        out.innerHTML = key;
        outExp.innerHTML = output.join('');
        sum = '';
        //удаляет лишний ноль(баг)
        if (summary[1] == Number(summary[1])) {
            summary.splice(1, 1)
        }
    }

    //если нажата кнопка '='
    if (key === '=') {
        let num = 0;
        summary.push(parseFloat(out.innerHTML));
        while (summary.length > 1) {
            switch (summary[1]) {
                case '/':
                    num = summary[0] / summary[2];
                    summary.splice(0, 3, num);
                    break;
                case '*':
                    num = summary[0] * summary[2];
                    summary.splice(0, 3, num);
                    break;
                case '-':
                    num = summary[0] - summary[2];
                    summary.splice(0, 3, num);
                    break;
                case '+':
                    num = summary[0] + summary[2];
                    summary.splice(0, 3, num);
                    break;
                case '%':
                    num = summary[0] % summary[2];
                    summary.splice(0, 3, num);
                    break;
            }
        }
        out.innerHTML = summary[0];
        sum = 0;
        Number(sum);
        sign = true;
    }

    console.log(sum, '|', summary,)
});


