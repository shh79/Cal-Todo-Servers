import {LoadTempHistory} from "../js/calculation.js";

export function toggle(switchNum){
    let history=document.querySelector(".HistorySection");
    let memory=document.querySelector(".MemorySection");
    let clearBar=document.querySelector(".recycleBin");
    switch(switchNum){
        case 'history':
            document.querySelector("#historyBTN").classList.add("UnderLine");
            document.querySelector("#memoryBTN").classList.remove("UnderLine");

            memory.classList.add("hidden");
            history.classList.remove("hidden");

            if(history.childNodes.length==1){
                clearBar.classList.add("hidden");

                history.innerHTML=`<div class="clearMsg">There's no history yet</div>`;
            }
            else{
                clearBar.classList.remove("hidden");
            }

            break;

        case 'memory':
            document.querySelector("#memoryBTN").classList.add("UnderLine");
            document.querySelector("#historyBTN").classList.remove("UnderLine");

            history.classList.add("hidden");
            memory.classList.remove("hidden");

            if(memory.childNodes.length==1){
                clearBar.classList.add("hidden");
                
                memory.innerHTML=`<div class="clearMsg">There's nothing saved in memory</div>`;
            }
            else{
                clearBar.classList.remove("hidden");
            }

            break;
    }
}
export function clearList(){
    let label=document.querySelector("#historyBTN");
    let history=document.querySelector(".HistorySection");
    let memory=document.querySelector(".MemorySection");
    let clearBar=document.querySelector(".recycleBin");

    if(label.classList.contains("UnderLine")){
        history.innerHTML=`<div class="clearMsg">There's no history yet</div>`;
    }
    else{
        memory.innerHTML=`<div class="clearMsg">There's nothing saved in memory</div>`;
        document.querySelector("#MRID").classList.add("Unvisiable");
        document.querySelector("#MCID").classList.add("Unvisiable");
        document.querySelector("#MemoryPageID").classList.add("Unvisiable");
    }

    clearBar.classList.add("hidden");
}
export function restoreHistory(element){
    let back=element.childNodes[1].innerText;
    back=back.slice(0,back.length-1);
    let main=element.childNodes[3].innerText;

    LoadTempHistory(back);
    document.querySelector(".input").innerText=main;
}
export function removeMemoryItem(item){
    let section = document.querySelector(".MemorySection");
    section.removeChild(item);
    if(section.childNodes.length == 0){
        document.querySelector(".recycleBin").classList.add("hidden");
        section.innerHTML=`<div class="clearMsg">There's nothing saved in memory</div>`;
        document.querySelector("#MRID").classList.add("Unvisiable");
        document.querySelector("#MCID").classList.add("Unvisiable");
        document.querySelector("#MemoryPageID").classList.add("Unvisiable");
    }
}
export function plusMemoryItem(item){
    let MNumber=Number(item.querySelector(".memoryNum").innerText.replace(",",""));
    let INumber=Number(document.querySelector(".input").innerText.replace(",",""));
    item.querySelector(".memoryNum").innerText=(MNumber+INumber);
}
export function minusMemoryItem(item){
    let MNumber=Number(item.querySelector(".memoryNum").innerText.replace(",",""));
    let INumber=Number(document.querySelector(".input").innerText.replace(",",""));
    item.querySelector(".memoryNum").innerText=(MNumber-INumber);
}
export function saveMemory(){
    let number=document.querySelector(".input").innerText;

    let section=document.querySelector(".MemorySection");

    let ClearMSG=document.querySelector(".MemorySection").querySelector(".clearMsg");

    if(ClearMSG!=null){
        section.innerHTML=``;
        document.querySelector(".recycleBin").classList.remove("hidden");
        document.querySelector("#MRID").classList.remove("Unvisiable");
        document.querySelector("#MCID").classList.remove("Unvisiable");
        document.querySelector("#MemoryPageID").classList.remove("Unvisiable");
    }

    section.innerHTML=`<div class="memoryItem">
            <p class="memoryNum">${number}</p>
            <div class="memoryItemBTNs" style="margin-right:20px;">
                <button class="memoryClearBTN">MC</button>
                <button class="memoryPlusBTN">M+</button>
                <button class="memoryMinusBTN">M-</button>
            </div>
        </div>`+section.innerHTML;

    memoryButtonsReloader();
    document.querySelector("#MemoryPageID").classList.remove("Unvisiable");

    document.querySelector(".MiniRecycleBinM").classList.remove("hiddenLayer");

}
function historyItemReloader(){
    let items=document.querySelectorAll(".historyItem");
    items.forEach(item => {
        item.addEventListener("click", () => {
            restoreHistory(item);
        });
    });
}
function memoryButtonsReloader(){
    //clear memory item buttons
    let MCBtns=document.querySelectorAll(".memoryClearBTN");
    MCBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            removeMemoryItem(btn.parentNode.parentNode);
        });
    });

    //plus memory item buttons
    let MPlusBtns=document.querySelectorAll(".memoryPlusBTN");
    MPlusBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            plusMemoryItem(btn.parentNode.parentNode);
        });
    });

    //minus memory item buttons
    let MMinusBtns=document.querySelectorAll(".memoryMinusBTN");
    MMinusBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            minusMemoryItem(btn.parentNode.parentNode);
        });
    });

    //mini section item button

    //mini clear memory item buttons
    let MiniMCBtns=document.querySelectorAll(".MiniMCBTN");
    MiniMCBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            MiniRemoveMemoryItem(btn.parentNode.parentNode);
        });
    });

    //mini plus memory item buttons
    let MiniMPlusBtns=document.querySelectorAll(".MiniMPlusBTN");
    MiniMPlusBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            MiniPlusMemoryItem(btn.parentNode.parentNode);
        });
    });

    //mini minus memory item buttons
    let MiniMMinusBtns=document.querySelectorAll(".MiniMMinusBTN");
    MiniMMinusBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            MiniMinusMemoryItem(btn.parentNode.parentNode);
        });
    });

}
export function HistoryItemAdder(LastNumberClicked){
    let tempHistory=document.querySelector(".tempHistory").innerText;
    let mainHistory=document.querySelector(".input").innerText;
    let section=document.querySelector(".HistorySection");

    let ClearMSG=document.querySelector(".HistorySection").querySelector(".clearMsg");

    if(ClearMSG!=null){
        section.innerHTML=``;
        document.querySelector(".recycleBin").classList.remove("hidden");
    }

    section.innerHTML=`<div class="historyItem">
        <div class="historyItemSec1">${tempHistory} ${LastNumberClicked}=</div>
        <div class="historyItemSec2">${mainHistory}</div>
    </div>`+section.innerHTML;

    historyItemReloader();
}
export function MCOperator(){
    let memory=document.querySelector(".MemorySection");
    memory.innerHTML=`<div class="clearMsg">There's nothing saved in memory</div>`;
    document.querySelector("#MRID").classList.add("Unvisiable");
    document.querySelector("#MCID").classList.add("Unvisiable");
    document.querySelector("#MemoryPageID").classList.add("Unvisiable");
    document.querySelector(".recycleBin").classList.add("hidden");
    document.querySelector(".MiniMemory").classList.add("hiddenLayer");
    document.querySelector(".Buttons").classList.remove("hiddenLayer");
}
export function MROperator(){
    let item=document.querySelector(".memoryItem");
    if(item!=null){
        document.querySelector(".tempHistory").innerText="";
        document.querySelector(".input").innerText=item.querySelector(".memoryNum").innerText;
    }
}
export function MPlusOperator(){
    let item=document.querySelector(".memoryItem");
    let input=document.querySelector(".input").innerText;

    if(item!=null){
        item.querySelector(".memoryNum").innerText=
        Number(item.querySelector(".memoryNum").innerText.replace(",","")) + Number(input.replace(",",""));
    }
    else{
        document.querySelector(".MemorySection").innerHTML=
        `<div class="memoryItem">
            <p class="memoryNum">${input}</p>
            <div class="memoryItemBTNs">
                <button class="memoryClearBTN">MC</button>
                <button class="memoryPlusBTN">M+</button>
                <button class="memoryMinusBTN">M-</button>
            </div>
        </div>`;
        document.querySelector(".recycleBin").classList.remove("hidden");
        memoryButtonsReloader();
    }

    document.querySelector("#MRID").classList.remove("Unvisiable");
    document.querySelector("#MCID").classList.remove("Unvisiable");
    document.querySelector("#MemoryPageID").classList.remove("Unvisiable");

    document.querySelector(".MiniRecycleBinM").classList.remove("hiddenLayer");
}
export function MMinusOperator(){
    let item=document.querySelector(".memoryItem");
    let input=document.querySelector(".input").innerText;
    
    if(item!=null){
        item.querySelector(".memoryNum").innerText=
        Number(item.querySelector(".memoryNum").innerText.replace(",","")) - Number(input.replace(",",""));
    }
    else{
        let sym='-';
        if(input==0){
            sym='';
        }
        document.querySelector(".MemorySection").innerHTML=
        `<div class="memoryItem">
            <p class="memoryNum">${sym+input}</p>
            <div class="memoryItemBTNs">
                <button class="memoryClearBTN">MC</button>
                <button class="memoryPlusBTN">M+</button>
                <button class="memoryMinusBTN">M-</button>
            </div>
        </div>`;
        document.querySelector(".recycleBin").classList.remove("hidden");
        memoryButtonsReloader();
    }

    document.querySelector("#MRID").classList.remove("Unvisiable");
    document.querySelector("#MCID").classList.remove("Unvisiable");
    document.querySelector("#MemoryPageID").classList.remove("Unvisiable");

    document.querySelector(".MiniRecycleBinM").classList.remove("hiddenLayer");
}
export function LoadMiniSection(type){
    let layers=document.querySelector(".LayerHolder");
    let history=document.querySelector(".HistorySection");
    let memory=document.querySelector(".MemorySection");

    let buttons=layers.querySelector(".Buttons");
    let miniHistory=layers.querySelector(".MiniHistory");
    let miniMemory=layers.querySelector(".MiniMemory");

    switch(type){
        case 'History':
            if(miniHistory.classList.contains("hiddenLayer")){//open panel here
                miniHistory.classList.remove("hiddenLayer");
                buttons.classList.add("hiddenLayer");
                miniMemory.classList.add("hiddenLayer");

                if(history.innerHTML==`<div class="clearMsg">There's no history yet</div>`){
                    miniHistory.querySelector(".MiniRecycleBinH").classList.add("hiddenLayer");
                    miniHistory.querySelector(".Stage").innerHTML=history.innerHTML;
                }
                else{
                    miniHistory.querySelector(".Stage").innerHTML=HTMLConverter("get","history");
                    miniHistory.querySelector(".MiniRecycleBinH").classList.remove("hiddenLayer");
                }

                miniHistory.querySelectorAll(".StageItem").forEach(item => {
                    item.addEventListener("click", () => {
                        restoreHistory(item);
                    });
                });

            }
            else{
                miniHistory.classList.add("hiddenLayer");
                buttons.classList.remove("hiddenLayer");
                miniMemory.classList.add("hiddenLayer");
            }
            break;

        case 'Memory':
            if(!document.querySelector("#MemoryPageID").classList.contains("Unvisiable")){
            
                if(miniMemory.classList.contains("hiddenLayer")){//open panel here
                    miniMemory.classList.remove("hiddenLayer");
                    buttons.classList.add("hiddenLayer");
                    miniHistory.classList.add("hiddenLayer");
                
                    miniMemory.querySelector(".Stage").innerHTML=HTMLConverter("get","memory");
                }
                else{
                    miniMemory.classList.add("hiddenLayer");
                    buttons.classList.remove("hiddenLayer");
                    miniHistory.classList.add("hiddenLayer");
                    HTMLConverter("set","memory");
                }
            }
            break;
    }

    memoryButtonsReloader();
}
export function DoneWithMiniSections(){
    let layers=document.querySelector(".LayerHolder");
    layers.querySelector(".Buttons").classList.remove("hiddenLayer");
    layers.querySelector(".MiniHistory").classList.add("hiddenLayer");
    layers.querySelector(".MiniMemory").classList.add("hiddenLayer");
}
function HTMLConverter(flag,type){
    let result=``;
    if(type=="history"){
        if(flag=="get"){
            let historyItems=document.querySelectorAll(".historyItem");
            historyItems.forEach(item => {
                result+=`<div class="StageItem">
                             <div class="backMiniHistory">${item.querySelector(".historyItemSec1").innerText}</div>
                             <div class="MiniMemoryNum">${item.querySelector(".historyItemSec2").innerText}</div>
                         </div>`;
            });
            return result;
        }
    }
    if(type=="memory"){
        if(flag=="get"){
            let memoryItems=document.querySelectorAll(".memoryItem");
            memoryItems.forEach(item => {
                result+=`<div class="StageItem">
                             <p class="MiniMemoryNum">${item.querySelector("p").innerText}</p>
                             <div class="memoryItemBTNs">
                                 <button class="MiniMCBTN">MC</button>
                                 <button class="MiniMPlusBTN">M+</button>
                                 <button class="MiniMMinusBTN">M-</button>
                             </div>
                         </div>`;
            });
            return result;
        }
        if(flag=="set"){
            let miniMemoryItems=document.querySelector(".MiniMemory").querySelector(".Stage").querySelectorAll(".StageItem");
            miniMemoryItems.forEach(item => {
                result+=`<div class="memoryItem">
                     <p class="memoryNum">${item.querySelector("p").innerText}</p>
                     <div class="memoryItemBTNs" style="margin-right:20px;">
                         <button class="memoryClearBTN">MC</button>
                         <button class="memoryPlusBTN">M+</button>
                         <button class="memoryMinusBTN">M-</button>
                     </div>
                 </div>`;
            });

            if(miniMemoryItems.length==0){
                result=`<div class="clearMsg">There's nothing saved in memory</div>`;
                document.querySelector("#MCID").classList.add("Unvisiable");
                document.querySelector("#MRID").classList.add("Unvisiable");
                document.querySelector("#MemoryPageID").classList.add("Unvisiable");
            }

            document.querySelector(".MemorySection").innerHTML=result;
        }
    }
}
function MiniRemoveMemoryItem(item){
    let section=document.querySelector(".MiniMemory").querySelector(".Stage");
    section.removeChild(item);
    if(section.childNodes.length==0){
        document.querySelector(".MiniRecycleBinM").classList.add("hiddenLayer");
    }
}
function MiniPlusMemoryItem(item){
    let MNumber=Number(item.querySelector("p").innerText.replace(",",""));
    let INumber=Number(document.querySelector(".input").innerText.replace(",",""));
    item.querySelector("p").innerText=(MNumber+INumber);
}
function MiniMinusMemoryItem(item){
    let MNumber=Number(item.querySelector("p").innerText.replace(",",""));
    let INumber=Number(document.querySelector(".input").innerText.replace(",",""));
    item.querySelector("p").innerText=(MNumber-INumber);
}
export function ClearMiniSection(btn,type){
    if(type=="history"){
        document.querySelector(".HistorySection").innerHTML=`<div class="clearMsg">There's no history yet</div>`;
        document.querySelector(".MiniHistory").querySelector(".Stage").innerHTML=`<div class="clearMsg">There's no history yet</div>`;
    }
    if(type=="memory"){
        document.querySelector(".MiniMemory").querySelector(".Stage").innerHTML=``;
    }
    btn.classList.add("hiddenLayer");
}


