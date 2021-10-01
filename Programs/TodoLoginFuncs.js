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

document.querySelector("#SignInBtn").addEventListener('click', () => {
    OpenContainer('in');
});

document.querySelector("#SignUpBtn").addEventListener('click', () => {
    OpenContainer('up');
});

document.querySelector("#green").addEventListener('click', () => {
    let username = document.querySelector("#UserIn").value;
    let pass = document.querySelector("#PassIn").value;

    if(username != '' && pass != ''){
        SignInFunc(username, pass);
    }
    else{
        alert("Please fill the blank.");
    }
});

document.querySelector("#red").addEventListener('click', () => {
    let username = document.querySelector("#UserUp").value;
    let pass = document.querySelector("#PassUp").value;
    let rePass = document.querySelector("#RePassUp").value;

    if(username != '' && pass != '' && rePass != ''){
        SignUpFunc(username, pass, rePass);
    }
    else{
        alert("Please fill the blank.");
    }
});
