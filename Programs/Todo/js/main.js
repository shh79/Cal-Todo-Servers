window.addEventListener('load', () => {
    var app = new controller(new model(), new view());

    let str = localStorage[1];
    let firstLetter = str.substr(0, 1);
    str = firstLetter.toUpperCase() + str.substr(1);

    document.querySelector(".UsernameBanner").innerHTML = str;

    if(str.toUpperCase() == "GUEST PANEL"){
        document.querySelector("#hint").classList.remove("hidden");
        document.querySelector("#uploadForm").action = "/Todo/";
        document.querySelector("#uploadForm").method = "";
    }
    else{
        document.querySelector("#hint").classList.add("hidden");
        document.querySelector("#uploadForm").action = "/upload";
        document.querySelector("#uploadForm").method = "POST";
    }
});