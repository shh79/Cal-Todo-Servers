// window.addEventListener('load', () => {
//     try{
//         localStorage[0] = document.querySelector("#todoDatas").innerHTML;
//     }
//     catch{}
// });
function OpenContainer(type){
    let containers = document.querySelectorAll(".tabContainer");

    containers.forEach(item => {
        item.classList.add("hidden");
    });

    switch(type){
        case 'in':
            document.querySelector("#SignInPage").classList.remove("hidden");
            break;
        case 'up':
            document.querySelector("#SignUpPage").classList.remove("hidden");
            break;
    }
}

function encoding(pass){
    let result = '';
    for(let i=pass.length-1; i>=0; --i){
        result += pass[i];
    }
    return result;
}

async function SignInFunc(username, pass){
    let adderss = `/SignIn/:${username},${pass}`;
    await fetch(adderss, {
        method: 'POST',
    });
}

async function SignUpFunc(username, pass, rePass){
    let adderss = `/SignUp/:${username},${pass},${rePass}`;
    await fetch(adderss, {
        method: 'POST',
    });
}

try{
    document.querySelector("#SignInBtn").addEventListener('click', () => {
        OpenContainer('in');
    });
    
    document.querySelector("#SignUpBtn").addEventListener('click', () => {
        OpenContainer('up');
    });
    
    document.querySelector("#green").addEventListener('click', (event) => {
        let username = document.querySelector("#UserIn").value;
        let pass = document.querySelector("#PassIn").value;
    
        pass = String(encoding(pass));
    
        if(username != '' && pass != ''){
            event.target.href = `/SignIn/:${username},${pass}`;
        }
        else{
            alert("Please fill the blank.");
        }
    });
    
    document.querySelector("#red").addEventListener('click', (event) => {
        let username = document.querySelector("#UserUp").value;
        let pass = document.querySelector("#PassUp").value;
        let rePass = document.querySelector("#RePassUp").value;
    
        pass = String(encoding(pass));
        rePass = String(encoding(rePass));
    
        if(username != '' && pass != '' && rePass != ''){
            event.target.href = `/SignUp/:${username},${pass},${rePass}`;
        }
        else{
            alert("Please fill the blank.");
        }
    });
    
    document.querySelector("#guestLink").addEventListener('click', (event) => {
        let username = document.querySelector("#UserIn").value;
        let pass = document.querySelector("#PassIn").value;
    
        event.target.href = `/SignIn/:${username},${pass}`;
    });
    
}
catch{
    document.querySelector(".confirmBTN").addEventListener('click', (event) => {
        localStorage[0] = document.querySelector("#todosData").innerHTML;
        localStorage[1] = document.querySelector("#user").innerHTML;
    });
    document.querySelector(".cancelBTN").addEventListener('click', (event) => {
        localStorage.clear();
    });
}