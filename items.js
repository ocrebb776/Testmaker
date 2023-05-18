class long {
    // for long answer questions
    outputsize() {
        console.log("ya")
    }
    constructor(id, itms, len) {
        this.id = id
        this.element = document.getElementById(this.id)
        this.itms = itms
        this.len = len
            // creating the text area
        this.template = '<textarea id="' + this.id + '_textarea" rows="' + getsize(len) + '" ></textarea>'
            // this is the frame for the section
        this.element.innerHTML = '<div class="question" id="' + this.id + '2"></div><span id="' + this.id + '1">S</span>'
            //  once that has beein change it ching the text to the textarea
        document.getElementById(this.id + "1").innerHTML = this.template
            // then adding the question
        document.getElementById(this.id + "2").innerHTML = this.itms


    }
    getval() {
        return document.getElementById(this.id + '_textarea').value
    }
    setval(val) {
        document.getElementById(this.id + '_textarea').value = val
    }

}

class short {
    // one line answers
    constructor(id, itms, max) {
        this.id = id
        this.element = document.getElementById(this.id)
        this.itms = itms
            // the template for the input 
        this.template = '<input id="' + this.id + '_textarea"  cols="50"></textarea>'
        console.log(this.id)
            // the framework
        this.element.innerHTML = '<div class="question" id="' + this.id + '2"></div><span id="' + this.id + '1">S</span>'
            // adding the input 
        document.getElementById(this.id + "1").innerHTML = this.template
            // adding the question
        document.getElementById(this.id + "2").innerHTML = this.itms
        this.keynum = 0
        this.lines = 1
        this.maxchr = max

        // max lines 

        document.getElementById(this.id + '_textarea').addEventListener("input", () => {
            const lines = document.getElementById(this.id + '_textarea').value.split("\n");

            const truncatedLines = lines.map(line => {
                if (line.length > this.maxchr) {
                    return line.slice(0, this.maxchr);
                }
                return line;
            });

            document.getElementById(this.id + '_textarea').value = truncatedLines.join("\n");

        });
    }
    getval() {
        return document.getElementById(this.id + '_textarea').value
    }
    setval(val) {
        document.getElementById(this.id + '_textarea').value = val
    }

}
class mcq {
    //multiple choice questions 
    constructor(id, option, total, num, ida) {
        this.id = id
        this.q = option
        this.total = total
        this.ida = ida
        console.log(id + " lol")
        this.element = document.getElementById(this.id)
            // the question
        this.text = "<div class='question'>" + num + "</div>"
        this.opt = 1
            // creating the buttons and label
        option.forEach(ele => {
                this.text += '<div id="opt' + String(this.opt) + '" class="wr"><div class="lable">' + ele + '</div><div class="checkbox" id="' + this.id + "¬" + ele + '" onclick="' + this.ida + '.check(' + "'" + this.id + "¬" + ele + "'" + ')"></div></div>'
                this.opt++
            })
            //adding the buttond and lables to the do 
        this.element.innerHTML = this.text
            // selecting all boxes
        this.els = document.getElementById(id).querySelectorAll("div.wr>.checkbox")
        this.open = 0
            // runing program to add functionality through event listerners (later)
    }
    getval() {
        // get value of the input ouputs as an array
        this.values = []
            // going through each box if it is ticked ad its id to the list this.values
        this.els.forEach(ele => {
            if (ele.innerHTML != "") {
                this.values.push(ele.id)
            }
        })

        return this.values
    }
    setval(val) {
        val.forEach(ele => {
            document.getElementById(ele).innerHTML = "✓"
        })
        console.log(val.length)

    }
    check(id) {
        let docu = document.getElementById(id)
        if (this.open < this.total && docu.innerHTML == "") {
            docu.innerHTML = "✓"
            console.log("ello")
            this.open++
        } else if (docu.innerHTML == "✓") {
            docu.innerHTML == ""
            change(id)
            this.open -= 1
        } else {
            console.log(docu.innerHTML)
        }



    }


}

function change(id) {
    document.getElementById(id).innerHTML = ""
}
class text {
    // all it does is add text onto the screen 
    constructor(id, text) {
        this.id = id
        this.text = text
        document.getElementById(id).innerHTML = text
    }
}


/*
function create(elements, max, cur ) {
    // as afformetialy noted 
    // total amount of things clikced
    elements.forEach(ele => { // adding event listeners
        ele.addEventListener('hover', function() {
            cur = cur
            if (!(ele.innerHTML == "✓" || ele.innerHTML != "")) { // if ticked untick and lowee roral abmount ticked

                cur -= 1;
                if (cur < 0) { cur = 0 }
                ele.innerHTML = ""


            } else {
                console.log(ele.innerHTML)
            }
            if (cur < max) { // if not ticked tick and raise total by one only if max ticks has not been reached 

                cur += 1;
                ele.innerHTML = "✓"
                console.log(5)
            }

        });
    });
}
*/




function getSequenceTerm(index) {
    // for getting ids goes a ,b , c ..... aa,ab,ac
    if (index <= 0) {
        return "";
    }

    let sequence = "";
    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    while (index > 0) {
        const remainder = (index - 1) % 26;
        sequence = alphabet.charAt(remainder) + sequence;
        index = Math.floor((index - 1) / 26);
    }

    return sequence;
}

function getsize(size) {
    var d1 = document.createElement("div");
    d1.id = "test3";
    d1.innerHTML = "test";
    d1.style = "width: fit-content; padding: 0px; margin: 0px; font-family: Arial, sans-serif;font-size:30px;";
    document.documentElement.appendChild(d1);

    var d2 = document.createElement("div");
    d2.id = "test3";
    document.documentElement.appendChild(d2);
    let widthsof = {}
    d2.innerHTML = "";
    var N = 100;
    for (var i = 32; i < 127; i++) {
        var s = String.fromCharCode(i).replace(" ", "&nbsp;");
        d1.innerHTML = s.repeat(N);
        var width = d1.getBoundingClientRect().width;
        widthsof["s"] = width / N
    }
    // get width of row 
    //width of element
    width = (window.innerWidth / 10) * 8
        //widths of characters
    let total = 0
    let count = 0

    for (const p in widthsof) {
        total += widthsof[p]
        count++
    }
    let avg = total / count
    let row = width / avg
    let target = size * 30
    d2.style = "display:none;"
    d1.style = "display:none;"
    console.log(avg)
    return Math.round(target / row)
}


function gen(el, qu) {
    let txt = ""
    let cur = 1;
    let que = []
    qu.forEach(element => {

        txt += "<div id='" + getSequenceTerm(cur) + "c'></div>"
        que.push(getSequenceTerm(cur))
        cur++

    });
    document.getElementById(el).innerHTML = txt
    cur = 1
    qua = []
    qu.forEach(element => {
        console.log(getSequenceTerm(cur))

        if (element[0] == "short") {
            window[getSequenceTerm(cur)] = new short(getSequenceTerm(cur) + "c", element[1], element[2])
            qua.push(getSequenceTerm(cur))
        } else if (element[0] == "long") {
            window[getSequenceTerm(cur)] = new long(getSequenceTerm(cur) + "c", element[1], element[2])
            qua.push(getSequenceTerm(cur))

        } else if (element[0] == "mcq") {
            window[getSequenceTerm(cur)] = new mcq(getSequenceTerm(cur) + "c", element[1], element[2], element[3], getSequenceTerm(cur))
            qua.push(getSequenceTerm(cur))
        } else {
            window[getSequenceTerm(cur)] = new text(getSequenceTerm(cur) + "c", element[1])
        }
        cur++
    });

}

function exportdata(email) {
    let data = {}
    qua.forEach(esa => {
        data[esa] = window[esa].getval()
    })
    if (email) {
        window.location.href = "mailto:" + meta["email"] + "?subject=My answers for :" + meta["title"] + "&body=" + JSON.stringify(data);
    } else {
        return data
    }
}

function addsubmit() {
    document.write("<button onclick='exportdata(true)'>SUMBIT (then you will need to click send on the email</button>")
}
const meta = {
    "email": "example@eg.com",
    "title": "Test"

}
const questions = [
    ["mcq", ["Oliver", "Sam", "Dad", "Mum"], 1, "1)Select the best person ever"],
    ["mcq", ["Mazie", "Mazie2", "Mazie3"], 2, "2)Select the Best dog ever"],
    ["short", "3)What is the worlds biggest animal?(1mks)", 100],
    ["short", "4)Ha", 10],
    ["long", "5)write about your favourite dog", 10],
    ["mcq", ["Option1", "Option2"], 1, "Select option"],
    ["text", "<h1> Section B </h1><h3>this is full of long answer questions</h3"],
    ["long", "Explain how rivers are formed ", 100]


]
gen("body", questions)
addsubmit()
if (getCookie("data") != "") {
    let data = JSON.parse(getCookie("data"))
    for (const l in data) {
        if (typeof data[l] == "string") {
            window[l].setval(data[l])
        } else {
            window[l].setval(data[l])
        }
        document.getElementById("")
    }
}

window.setInterval(() => {
    console.log("SAVE")
    setCookie("data", JSON.stringify(exportdata(false)), 10)
}, 1000);