

class Parser {

    constructor(code, colour) {
        this.code = code;
        this.colour = colour || 255;

        /**
         * if true then the pen is down. else its up
         */
        this.drawing = true;

        push();
        stroke(this.colour);
        strokeWeight(2);
        translate(height / 2, width / 2);

        this.parse(this.code);

        pop();
    }


    parse(code) {
        if(!code){
            return false;
        }
        code = code.trim();

        let c = [];
        let tmp = code.split(/(\s)|(\[.+\])/gm);
        tmp.forEach(function(el){
            if(el && el.trim()){
                c.push(el);
            }
        });

        while (c.length > 0) {
            // get the first element of array
            switch (c.shift()) {
                case "fd":
                    this.move(parseInt(c.shift()));
                    break;
                case "bd":
                    this.move(-parseInt(c.shift()));
                    break;

                case "lt":
                    this.turn(-parseInt(c.shift()));
                    break;
                case "rt":
                    this.turn(parseInt(c.shift()));
                    break;

                case "pu":
                    this.drawing = false;
                    break;
                case "pd":
                    this.drawing = true;
                    break;

                case "repeat":
                    let amt = parseInt(c.shift());
                    let command = c.shift().replace(/^\[|\]$/g, "");
                    // console.log(command);
                    if(amt && command){
                        for(let i = 0; i < amt; i++){
                            try{
                                this.parse(command);
                            }catch(err){}
                        }
                    }
                    break;
            }
        }
    }

    move(amt) {

        if (this.drawing) {
            line(0, 0, amt, 0);
        }
        translate(amt, 0);
    }

    turn(angle) {
        rotate(angle);
    }
}