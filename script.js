let a = ''; // first number
let b = ''; // second number
let sign = ''; // symbol
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['+', '-', '/', 'X', '%', '+/-'];

// экран вывода
const out = document.querySelector('.calc-screen p')

function clearAll() {
    a = ''; // first number
    b = ''; // second number
    sign = ''; // symbol
    finish = false;
    out.textContent = '';
}

document.querySelector('.ac').addEventListener('click', clearAll);

document.querySelector('.buttons').addEventListener('click', (event) => {
    //нажата не кнопка
    if (!event.target.classList.contains('btn')) return;
    //нажата кнопка clearAll ac
    if (event.target.classList.contains('ac')) return;

    out.textContent = '';

    //получаю нажатую кнопку
    const key = event.target.textContent;

    //если нажата кнопка (0-9,.)
    if (digit.includes(key)) {
        if (b === '' && sign === '') {
            a += key;
            out.textContent = a;
        } else if (a !== '' && b !== '' && finish) {
            b = key;
            finish = false;
            out.textContent = b;
        } else {
            b += key;
            out.textContent = b;
        }
    }

    if (action.includes(key)) {
        sign = key;
        out.textContent = sign;
    }

    //если нажата кнопка '='
    if (key === '=') {
        if (sign.includes('/') && b === '0') {
            out.textContent = 'Ошибка';
            a = '';
            b = '';
            sign = '';
            finish = false;
            return;
        }
        switch (sign) {
            case 'X':
                a = (+a) * (+b);
                break;
            case '/':
                a = (+a) / (+b);
                break;
            case '+':
                a = (+a) + (+b);
                break;
            case '-':
                a = (+a) - (+b);
                break;
            case '%':
                a = (+a) % (+b);
                break;
        }
        out.textContent = a;
        finish = true;
    }

    //если нажата кнопка '+/-'
    if (sign.includes('+/-')) {
        if (b !== '' && a !== '') {
        } else {
            if (b === '') {
                a = -a
                out.textContent = a;
            } else {
                b = -b
                out.textContent = b;
            }
        }
    }


    console.log(a, b, sign)
});