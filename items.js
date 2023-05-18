class long {

    constructor(id, itms, len) {
        this.id = id
        this.element = document.getElementById(this.id)
        this.itms = itms
        this.template = '<textarea id="' + this.id + '_textarea" rows="' + len + '" ></textarea>'

        this.element.innerHTML = '<div class="question" id="' + this.id + '2"></div><span id="' + this.id + '1">S</span>'
        document.getElementById(this.id + "1").innerHTML = this.template
        document.getElementById(this.id + "2").innerHTML = this.itms
    }
    getval() { return document.getElementById(this.id + '_textarea').value }

}
class short {
    constructor(id, itms) {
        this.id = id
        this.element = document.getElementById(this.id)
        this.itms = itms
        this.template = '<input id="' + this.id + '_textarea"  cols="50"></textarea>'
        console.log(this.id)
        this.element.innerHTML = '<div class="question" id="' + this.id + '2"></div><span id="' + this.id + '1">S</span>'
        document.getElementById(this.id + "1").innerHTML = this.template
        document.getElementById(this.id + "2").innerHTML = this.itms
        this.keynum = 0
        this.lines = 1
        this.maxchr = 40



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
    getval() { return document.getElementById(this.id + '_textarea').value }

}
class mcq {
    constructor(id, option, total, num) {
        this.id = id
        this.q = option

        this.element = document.getElementById(this.id)
        this.text = "<div class='question'>" + num + "</div>"
        this.opt = 1
        option.forEach(ele => {
            this.text += '<div id="opt' + String(this.opt) + '" class="wr"><div class="lable">' + ele + '</div><div class="checkbox" id="' + ele + '"></div></div>'
            this.opt++
        })
        this.element.innerHTML = this.text
        this.els = document.getElementById(id).querySelectorAll("div.wr>.checkbox")
        create(this.els, total)
    }
    getval() {
        this.values = []
        this.els.forEach(ele => {
            if (ele.innerHTML != "") {
                this.values.push(ele.id)
            }
        })
        console.log(this.values)
        return this.values
    }

}

class text {
    constructor(id, text) {
        this.id = id
        this.text = text
        document.getElementById(id) = text
    }
}



function create(elements, max) {
    let cur = 0
    elements.forEach(ele => {
        ele.addEventListener('click', function() {
            if (ele.innerHTML == "&#10003;") {
                ele.innerHTML = ""

                cur -= 1
            } else if (cur < max) {
                ele.innerHTML = "&#10003;"
                cur++

            } else {
                if (cur > 0) {
                    cur -= 1
                }
                ele.innerHTML = ""

            }
        });
    });
}







function getSequenceTerm(index) {
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
            window[getSequenceTerm(cur)] = new short(getSequenceTerm(cur) + "c", element[1])
            qua.push(getSequenceTerm(cur))
        } else if (element[0] == "long") {
            window[getSequenceTerm(cur)] = new long(getSequenceTerm(cur) + "c", element[1], element[2])
            qua.push(getSequenceTerm(cur))
        } else if (element[0] == "mcq") {
            window[getSequenceTerm(cur)] = new mcq(getSequenceTerm(cur) + "c", element[1], element[2], element[3])
            qua.push(getSequenceTerm(cur))
        } else {
            window[getSequenceTerm(cur)] = new text(getSequenceTerm(cur) + "c", element[1])
        }
        cur++
    });

}
const questions = [
    ["mcq", ["aOliver", "Sam", "Dad", "Mum"], 1, "1)Select the best person ever"],
    ["mcq", ["Mazie", "Mazie", "Mazie"], 1, "2)Select the Best dog ever"],
    ["short", "3)What is the worlds biggest animal?(1mks)"],
    ["short", "4)Ha"],
    ["long", "5)write about your favourite dog", 50]

]
gen("body", questions)