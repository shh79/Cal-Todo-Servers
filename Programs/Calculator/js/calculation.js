import * as main from "../js/main.js";

//the variable
let wait = false;
let SpecialWait = false;
let isAfterDot = false;
let TempHistory=[];
let isStart=true;

function MainMachine(symbol){
    let tempHistory=document.querySelector(".tempHistory");
    let input=document.querySelector(".input");
    
    if(!wait){
        if(SpecialWait){
            TempHistory.push(symbol);
            SpecialWait=false;
        }
        else{
            switch(symbol){
                case "sqr":
                    TempHistory.push(`sqr(${input.innerHTML})`);
                    SpecialWait=true;
                    break;
                case "radical":
                    TempHistory.push(`&#8730;(${input.innerHTML})`);
                    SpecialWait=true;
                    break;
                case "cube":
                    TempHistory.push(`cube(${input.innerHTML})`);
                    SpecialWait=true;
                    break;
                case "DivideX":
                    TempHistory.push(`1/(${input.innerHTML})`);
                    SpecialWait=true;
                    break;
                default:
                    TempHistory.push(input.innerHTML);
                    TempHistory.push(symbol);
            }

        }

        wait=true;
    }

    ShowTempHistory();
}
function RepeatedMath(result, sym, parted){
    switch(sym){
        case "+":
            result+=parted;
            break;
        case '-':
            result-=parted;
            break;
        case "&#10539;": //multiply symbol
            result*=parted;
            break;
        case "&#247;": //division symbol
            result/=parted;
            break;
    }
    return result;
}
function Calculator(isEnd){
    let result=0;
    let sym=``;
    let inputNum=0;
    for(let i=0;i<TempHistory.length;++i){
        if(isSpecialFunc(TempHistory[i]) != false){
            if(i != 0){
                result = RepeatedMath(result,sym,isSpecialFunc(TempHistory[i]));
            }
            else{
                result = isSpecialFunc(TempHistory[i]);
            }            
        }
        else if(isSybmol(TempHistory[i])){
            sym = TempHistory[i];
        }
        else{
            inputNum = Number(TempHistory[i]);
            if(i == 0){
                result = inputNum;
            }
            else{
                result = RepeatedMath(result,sym,inputNum);
            }
        }
    }

    if(isEnd){
        inputNum = Number(document.querySelector(".input").innerHTML);
        result = RepeatedMath(result,sym,inputNum);
    }

    return result;
}
function ShowTempHistory(){
    let tempHistory=document.querySelector(".tempHistory");
    tempHistory.innerHTML=``;
    TempHistory.forEach(item => {
        tempHistory.innerHTML+=` ${item}`;
    });
}
function ClearTempHistory(){
    TempHistory.splice(0, TempHistory.length);
}
export function LoadTempHistory(tempHistory){
    ClearTempHistory();
    let temp=tempHistory.split(' ');
    temp.forEach(item => {
        TempHistory.push(item);
    });
    ShowTempHistory();
    SpecialWait=true;
}
function isSybmol(input){
    let result=false;
    switch(input){
        case "+":
        case "-":
        case "&#10539;":
        case "&#247;":
            result=true;
            break;
    }

    return result;
}
function isSpecialFunc(input){
    let result=false;
    let sym, num;
    try{
        let temp=input.split('(');
        sym=temp[0];
        num=Number(temp[1].split(')')[0]);
        
        switch(sym){
            case "sqr":
                result = (num*num);
                break;
            case "&#8730;":
                result = (Math.sqrt(num));
                break;
            case "1/":
                result = (1/num);
                break;
            case "cube":
                result = (num*num*num);
                break;
        }
        
    }
    catch{
        result=false;
    }
    return result;
}
export function Clear(isCE){
    let input=document.querySelector(".input");
    let tempHistory=document.querySelector(".tempHistory");
    if(!isCE){
        tempHistory.innerHTML=``;
        input.innerHTML=`0`;
        ClearTempHistory();
    }
    else{
        input.innerHTML=`0`;
    }

    isAfterDot=false;
    wait=false;
    SpecialWait=false;
}
export function ToggleSign(){
    document.querySelector(".input").innerHTML =
            Number(document.querySelector(".input").innerHTML) * -1;
}
export function BackSpace(){
    let input=document.querySelector(".input");
    if(input.innerHTML.length>1){
        input.innerHTML = input.innerHTML.slice(0 , input.innerHTML.length-1);
    }
    else{
        input.innerHTML=`0`;
    }
}
export function GetDigit(digit){
    main.GetLNC(digit);
    let input = document.querySelector(".input");
    if(isStart){
        input.innerHTML=``;
        isStart=false;
    }
    if(input.innerHTML==`0`){
        input.innerHTML=``;
    } 
    if(wait){
        input.innerHTML=String(digit);
        wait=false;
    }
    else{
        input.innerHTML+=String(digit);
    }
}
export function DecimalDot(){
    let input = document.querySelector(".input");
    if(!isAfterDot){
        input.innerHTML+=`.`;
        isAfterDot=true;
    }
}
export function Percent(){
    let input = document.querySelector(".input");
    let tempHistory = document.querySelector(".tempHistory");

    let CalculatedNum=Calculator(false);

    if(tempHistory.innerHTML=='' || CalculatedNum==0){
        input.innerHTML='0';
        ClearTempHistory();
        return;
    }

    let percented=Number(input.innerHTML) / 100;

    if(TempHistory[TempHistory.length-1] == '+' || TempHistory[TempHistory.length-1] == '-'){
        percented *= CalculatedNum;
    }

    TempHistory.push(percented);
    ShowTempHistory();
    input.innerHTML=percented;

    wait = true;
}
export function Mul(){
    MainMachine(`&#10539;`); //multiply symbol
}
export function Div(){
    MainMachine(`&#247;`); //division symbol
}
export function Plus(){
    MainMachine(`+`);
}
export function Minus(){
    MainMachine(`-`);
}
export function Sqr(){
    let input = document.querySelector(".input");
    let tempHistory = document.querySelector(".tempHistory");

    let temp=Number(input.innerHTML);

    MainMachine(`sqr`);
    
    input.innerHTML=(temp*temp);
}
export function Cube(){

    let input = document.querySelector(".input");
    let tempHistory = document.querySelector(".tempHistory");

    let temp=Number(input.innerHTML);

    MainMachine(`cube`);

    input.innerHTML=(temp*temp*temp);
}
export function Radical(){
    let input = document.querySelector(".input");
    let tempHistory = document.querySelector(".tempHistory");

    let temp=Number(input.innerHTML);

    MainMachine(`radical`);

    input.innerHTML=Math.sqrt(temp);
}
export function DivideOnX(){
    let input = document.querySelector(".input");

    let temp=Number(input.innerHTML);

    if(temp!=0){
        MainMachine(`DivideX`);
        input.innerHTML=(1/temp);
    }
    else{
        Finisher();
        input.innerHTML=`Cannot divide by zero`;
    }
}
export function Finisher(){
    let input = document.querySelector(".input");
    
    input.innerHTML=Calculator(!wait);
    ClearTempHistory();

    isStart=true;
}