let textarea;
let p;

window.addEventListener("hashchange", function(){
    if(location.hash && location.hash.length > 1){
        textarea.value = location.hash.replace(/#|-/g, " ").trim();
    }

    parse();
});


function setup(){
    createCanvas(500, 500);
    angleMode(DEGREES);

    textarea = document.getElementById("code");
    textarea.addEventListener("keyup", function(){
        parse();
    });

    if(location.hash && location.hash.length > 1){
        textarea.value = location.hash.replace(/#|-/g, " ").trim();
    }

    parse();
}

function parse(){
    background(0);

    p = new Parser(textarea.value.trim());
}

function share(){
    location.hash = textarea.value.trim().replace(/\s/g, "-");
    // console.log(textarea.value.trim().replace(/\s/g, "-"));
}