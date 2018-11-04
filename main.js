let textarea;
let p;

function setup(){
    createCanvas(500, 500);
    angleMode(DEGREES);

    textarea = document.getElementById("code");
    textarea.addEventListener("keyup", function(){
        parse();
    });

    parse();
}

function parse(){
    background(0);

    p = new Parser(textarea.value.trim());
}