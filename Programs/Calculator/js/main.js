import * as Cal from "../js/calculation.js";
import * as Op from "../js/operation.js";

//variable
let LastNumberClicked=``;

export function GetLNC(LastDigit){
    LastNumberClicked=LastDigit;
}

//history & memory section formed
Op.toggle('history');
document.querySelector("#historyBTN").addEventListener("click", () => {
    Op.toggle('history');
});
document.querySelector("#memoryBTN").addEventListener("click", () => {
    Op.toggle('memory');
});

//clear list button function
document.querySelector(".recycleBin").addEventListener("click", () => {
    Op.clearList();
})

//memory save button
document.querySelector("#MSID").addEventListener("click", () => {
    Op.saveMemory();
});

//Memory Clear(MC) operator
document.querySelector("#MCID").addEventListener("click", () => {
    Op.MCOperator();
});

//Memory Recentlly(MR) operator
document.querySelector("#MRID").addEventListener("click", () => {
    Op.MROperator();
});

//Memory + (M+) operator
document.querySelector("#PMID").addEventListener("click", () => {
    Op.MPlusOperator();
});

//Memory - (M-) operator
document.querySelector("#MMID").addEventListener("click", () => {
    Op.MMinusOperator();
});

//History button function
document.querySelector("#HistoryBtn").addEventListener("click", () => {
    Op.LoadMiniSection('History');
});

//Memory button function
document.querySelector("#MemoryPageID").addEventListener("click", () => {
    Op.LoadMiniSection('Memory');
});

//when resize screen mini history and mini memory is over
window.addEventListener("resize", () => {
    if(screen.width >= 500){
        Op.DoneWithMiniSections();
    }
});

//mini clear btn event
document.querySelector(".MiniRecycleBinH").addEventListener("click", () => {
    Op.ClearMiniSection(document.querySelector(".MiniRecycleBinH"),"history");
});
document.querySelector(".MiniRecycleBinM").addEventListener("click", () => {
    Op.ClearMiniSection(document.querySelector(".MiniRecycleBinM"),"memory");
});

//Equal button functions
document.querySelector(".equal").addEventListener("click", () => {
    Cal.Finisher();
    Op.HistoryItemAdder(LastNumberClicked);
    document.querySelector(".tempHistory").innerHTML=``;
});

//here we add calculator functions

//C button and CE button event
document.querySelector(".c").addEventListener("click", () => {
    Cal.Clear(false);
});
document.querySelector(".ce").addEventListener("click", () => {
    Cal.Clear(true);
});

//toggle sign button event
document.querySelector(".minus-plus").addEventListener("click", () => {
    Cal.ToggleSign();
});

//backspace button event
document.querySelector(".backspace").addEventListener("click", () => {
    Cal.BackSpace();
});

//buttons of digit events
let digits = document.querySelectorAll(".number");
digits.forEach(digit => {
    digit.addEventListener("click", () => {
        Cal.GetDigit(digit.innerHTML);
    });
});

//button for dot event
document.querySelector(".dot").addEventListener("click", () => {
    Cal.DecimalDot();
});

//percent button event
document.querySelector(".percent").addEventListener("click", () => {
    Cal.Percent();
});

//functions buttons event
document.querySelector(".radical").addEventListener("click", () => {
    Cal.Radical();
});
document.querySelector(".power2").addEventListener("click", () => {
    Cal.Sqr();
});
document.querySelector(".power3").addEventListener("click", () => {
    Cal.Cube();
});
document.querySelector(".plus").addEventListener("click", () => {
    Cal.Plus();
});
document.querySelector(".minus").addEventListener("click", () => {
    Cal.Minus();
});
document.querySelector(".mul").addEventListener("click", () => {
    Cal.Mul();
});
document.querySelector(".division").addEventListener("click", () => {
    Cal.Div();
});
document.querySelector(".one-div-x").addEventListener("click", () => {
    Cal.DivideOnX();
});