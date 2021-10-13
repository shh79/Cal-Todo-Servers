window.addEventListener('load', () => {
    var app = new controller(new model(), new view());

    let str = localStorage[1];
    let firstLetter = str.substr(0, 1);
    str = firstLetter.toUpperCase() + str.substr(1);

    document.querySelector(".UsernameBanner").innerHTML = str;
});