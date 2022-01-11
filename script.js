let sum = ''; // хранит временно переменные для выражения в экране
let sumSecond = ''; // вторая переменная которая хранит временно переменные для выражения в экране
let summary = []; //массив с числами, с которым происходит математические выражения
let output = []; // выражение для вывода в экран
let sign = false;




const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['+', '-', '/', '*', '%', '+/-'];

// экраны вывода
const out = document.querySelector('.calc-screen p')
const outExp = document.querySelector('.summary p')

function clearAll() {
    while(summary.length > 0 || output.length > 0){
        summary.splice(0,1);
        output.splice(0,1)
    }
    out.innerHTML = '';
    outExp.innerHTML = '';
    sum= '';
}

//функция для воспроизведения звуков, хранит все необходимые аудиофайлы под конкретные кнопки
function playAudio(hitsounds){
    let audio = new Audio();
    switch(hitsounds){
        case 0:
            audio.src = "audio/0.mp3";
            audio.play();
            break;
        case 1:
            audio.src = "audio/1.mp3";
            audio.play();
            break; 
        case 2:
            audio.src = "audio/2.mp3";
            audio.play();
            break;   
        case 3:
            audio.src = "audio/3.mp3";
            audio.play();
            break;
        case 4:
            audio.src = "audio/4.mp3";
            audio.play();
            break;
        case 5:
            audio.src = "audio/5.mp3";
            audio.play();
            break;
        case 6:
            audio.src = "audio/6.mp3";
            audio.play();
            break;
        case 7:
            audio.src = "audio/7.mp3";
            audio.play();
            break;
        case 8:
            audio.src = "audio/8.mp3";
            audio.play();
            break;
        case 9:
            audio.src = "audio/9.mp3";
            audio.play();
            break;
        case '/':
            audio.src = "audio/divide.mp3";
            audio.play();
            break;
        case '*':
            audio.src = "audio/multiply.mp3";
            audio.play();
            break;
        case '+':
            audio.src = "audio/plus.mp3";
            audio.play();
            break;
        case '-':
            audio.src = "audio/minus.mp3";
            audio.play();
            break;
        case '=':
            audio.src = "audio/equal.mp3";
            audio.play();
            break;
        default:
            audio.src = "audio/pilik.mp3";
            audio.play();
            break;
        
    }
}

    document.querySelector('.buttons').addEventListener('click', (event,hitsounds) => {
        hitsounds = event.target.textContent;
        //нажата не кнопка
        if (!event.target.classList.contains('btn')) return;
        //вызывает звук в зависимости от нажатой кнопки
        switch (hitsounds) {
			case '1': {
				playAudio(1);
				break;
			}
			case '2': {
				playAudio(2);
				break;
			}
			case '3': {
				playAudio(3);
				break;
			}
			case '4': {
				playAudio(4);
				break;
			}
			case '5': {
				playAudio(5);
				break;
			}
			case '6': {
				playAudio(6);
				break;
			}
			case '7': {
				playAudio(7);
				break;
			}
			case '8': {
				playAudio(8);
				break;
			}
			case '9': {
				playAudio(9);
				break;
			}
			case '0': {
				playAudio(0);
				break;
			}
			case '/': {
				playAudio('/');
				break;
			}
			case '*': {
				playAudio('*');
				break;
			}
			case '-': {
				playAudio('-');
				break;
			}
			case '+': {
				playAudio('+');
				break;
			}
			case '=': {
				playAudio('=');
				break;
			}
            default:
				{
                playAudio();
                break;
				}
		}
    })
//если нажата кнопка '+/-'
document.querySelector('.plus-minus').addEventListener('click',()=>{
        if(sum < 0){
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
    if(digit.includes(key)){
        sum+=key;
        output.push(key);    
        out.innerHTML = sum;
        outExp.innerHTML = output.join('');
        if(summary.length == 1 && sign && !action.includes(key)){
            clearAll();
            sum+=key;
            output.push(key);    
            out.innerHTML = sum;
            outExp.innerHTML = output.join('');
        }
    }

    //если нажат знак
    if (action.includes(key)) {
        switch(key){
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
                if(searchPoint == -1 && out.innerHTML.length !== 0){
                out.innerHTML = out.innerHTML + '.';
                }
                break;
        }
        sum =key;
        output.push(key);
        out.innerHTML = key;
        outExp.innerHTML = output.join('');
        sum = '';
        if(summary[1] == Number(summary[1])){
            summary.splice(1,1)
        }
    }

    //если нажата кнопка '='
    if (key === '=') {
        let num = 0;
        summary.push(parseFloat(out.innerHTML));
        while(summary.length >1){
            switch(summary[1]){
                case '/':
                    num = summary[0] / summary[2];
                    summary.splice(0,3,num);
                    break;
                case '*':
                    num = summary[0] * summary[2];
                    summary.splice(0,3,num);
                    break;
                case '-':
                    num = summary[0] - summary[2];
                    summary.splice(0,3,num);
                    break;
                case '+':
                    num = summary[0] + summary[2];
                    summary.splice(0,3,num);
                    break;
                case '%':
                    num = summary[0] % summary[2];
                    summary.splice(0,3,num);
                    break;
            }
        }
        out.innerHTML = summary[0];
        sum = 0;
        Number(sum);
        sign = true;
    }

    console.log(sum,'|',summary,)
});


