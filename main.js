(() => {
    "use strict";

    const root = document.querySelector("#root");
    let data = [
        {
            name: "Normal",
            short: "NOR",
            color: "#A8A878",
            super: [],
            weak: ["Rock", "Steel"],
            immune: ["Ghost"]
        },
        {
            name: "Fire",
            short: "FIR",
            color: "#F08030",
            super: ["Grass", "Ice", "Bug", "Steel"],
            weak: ["Fire", "Water", "Rock", "Dragon"],
            immune: []
        },
        {
            name: "Grass",
            short: "GRS",
            color: "#78C850",
            super: ["Water", "Ground", "Rock"],
            weak: ["Fire", "Grass", "Poison", "Flying", "Bug", "Dragon", "Steel"],
            immune: []
        },
        {
            name: "Water",
            short: "WTR",
            color: "#6890F0",
            super: ["Fire", "Ground", "Rock"],
            weak: ["Water", "Grass", "Dragon"],
            immune: []
        },
        {
            name: "Electric",
            short: "ELC",
            color: "#F8D030",
            super: ["Water", "Flying"],
            weak: ["Electric", "Grass", "Dragon"],
            immune: ["Ground"]
        },
        {
            name: "Flying",
            short: "FLY",
            color: "#6D5E9C",
            super: ["Grass", "Fighting", "Bug"],
            weak: ["Electric", "Rock", "Steel"],
            immune: []
        },
        {
            name: "Fighting",
            short: "FGH",
            color: "#C03028",
            super: ["Normal", "Ice", "Rock", "Dark", "Steel"],
            weak: ["Poison", "Flying", "Psychic", "Bug", "Fairy"],
            immune: ["Ghost"]
        },
        {
            name: "Poison",
            short: "POI",
            color: "#A040A0",
            super: ["Grass", "Fairy"],
            weak: ["Poison", "Ground", "Rock", "Ghost"],
            immune: ["Steel"]
        },
        {
            name: "Bug",
            short: "BUG",
            color: "#A8B820",
            super: ["Grass", "Psychic", "Dark"],
            weak: ["Fire", "Fighting", "Poison", "Flying", "Ghost", "Steel", "Fairy"],
            immune: []
        },
        {
            name: "Psychic",
            short: "PSY",
            color: "#F85888",
            super: ["Fighting", "Poison"],
            weak: ["Psychic", "Steel"],
            immune: ["Dark"]
        },
        {
            name: "Ghost",
            short: "GHO",
            color: "#705898",
            super: ["Psychic", "Ghost"],
            weak: ["Dark"],
            immune: ["Normal"]
        },
        {
            name: "Dark",
            short: "DRK",
            color: "#705848",
            super: ["Psychic", "Ghost"],
            weak: ["Fighting", "Dark", "Fairy"],
            immune: []
        },
        {
            name: "Ice",
            short: "ICE",
            color: "#98D8D8",
            super: ["Grass", "Ground", "Flying", "Dragon"],
            weak: ["Fire", "Water", "Ice", "Steel"],
            immune: []
        },
        {
            name: "Dragon",
            short: "DGN",
            color: "#7038F8",
            super: ["Dragon"],
            weak: ["Steel"],
            immune: ["Fairy"]
        },
        {
            name: "Fairy",
            short: "FAI",
            color: "#EE99AC",
            super: ["Fighting", "Dragon", "Dark"],
            weak: ["Fire", "Poison", "Steel"],
            immune: []
        },
        {
            name: "Ground",
            short: "GRD",
            color: "#E0C068",
            super: ["Fire", "Electric", "Poison", "Rock", "Steel"],
            weak: ["Grass", "Bug"],
            immune: ["Flying"]
        },
        {
            name: "Rock",
            short: "ROC",
            color: "#B8A038",
            super: ["Fire", "Ice", "Flying", "Bug"],
            weak: ["Fighting", "Ground", "Steel"],
            immune: []
        },
        {
            name: "Steel",
            short: "STE",
            color: "#B8B8D0",
            super: ["Ice", "Rock", "Fairy"],
            weak: ["Fire", "Water", "Electric", "Steel"],
            immune: []
        }
    ];
    const createBorder = color => `solid 4px ${color}`;
    const createBox = (element, parent, effect, pos) => {
        let box = document.createElement("span");
        let parentElem = document.querySelector(".row-" + parent.name);
        let leftSide = document.querySelector("." + parent.name + "-left-side");
        let rightSide = document.querySelector("." + parent.name + "-right-side");
        box.classList.add("box", element.name, effect);
        box.textContent = element.short;
        if (effect === "immune") {
            let img = document.createElement("img");
            img.classList.add("immuneImg");
            img.src = "a.svg";
            box.style.border = createBorder(element.color);
            box.appendChild(img);
        } else if (effect === "weak") {
            box.style.border = createBorder(element.color);
        } else if (
            effect === "super" &&
            (element.weak.findIndex(weak => weak === parent.name) >= 0 ||
                element.immune.findIndex(immune => immune === parent.name) >= 0)
        ) {
            box.classList.add("dom");
            box.style.border = createBorder(LightenDarkenColor(element.color, -60));
            box.style.backgroundColor = element.color;
        } else if (
            effect === "super" &&
            (parent.weak.findIndex(weak => weak === element.name) >= 0 ||
                parent.immune.findIndex(immune => immune === element.name) >= 0)
        ) {
            box.classList.add("dom");
            box.style.border = createBorder(LightenDarkenColor(element.color, -60));
            box.style.backgroundColor = element.color;
        } else if (effect === "super") {
            box.style.border = createBorder(element.color);
            box.style.backgroundColor = element.color;
        }
        if (pos === "left") leftSide.appendChild(box);
        if (pos === "right") rightSide.appendChild(box);
    };

    // Setup row and middle item
    data.forEach(type => {
        const elem = document.createElement("div");
        let box = document.createElement("span");
        let arrow = document.createElement("span");
        let arrow2 = document.createElement("span");
        let leftSide = document.createElement("span");
        leftSide.classList.add(type.name + "-left-side", "leftSide");
        let rightSide = document.createElement("span");
        rightSide.classList.add(type.name + "-right-side", "rightSide");
        arrow.classList.add("box", "arrow");
        arrow2.classList.add("box", "arrow");
        arrow.textContent = " ➞ ";
        arrow2.textContent = " ➞ ";
        elem.classList.add("row", "row-" + type.name);
        box.classList.add("box", type.name, "middle");
        box.textContent = type.short;
        box.style.border = createBorder(type.color);
        box.style.backgroundColor = type.color;
        elem.appendChild(leftSide);
        elem.appendChild(arrow);
        elem.appendChild(box);
        elem.appendChild(arrow2);
        elem.appendChild(rightSide);
        root.appendChild(elem);
    });
    data.forEach(type => {
        type.super.reverse().forEach(sup => {
            let curr = data.find(type => type.name === sup);
            createBox(curr, type, "super", "right");
            createBox(type, curr, "super", "left");
        });
        type.weak.reverse().forEach(weak => {
            let curr = data.find(type => type.name === weak);
            createBox(curr, type, "weak", "right");
            createBox(type, curr, "weak", "left");
        });
        type.immune.reverse().forEach(immune => {
            let curr = data.find(type => type.name === immune);
            createBox(curr, type, "immune", "right");
            createBox(type, curr, "immune", "left");
        });
    });
    root.childNodes.forEach(row => {
        let have = Array.from(row.childNodes[0].childNodes).length;
        let need = 14 - have;
        [...Array(need).keys()].forEach(() => {
            let box = document.createElement("span");
            box.classList.add("box");
            row.insertBefore(box, row.childNodes[0]);
        });
    });
    let steelEnd = document.querySelector(".row.row-Steel");
    let credit = document.createElement("span");
    credit.classList.add("credit");
    credit.textContent = "By Habbe";
    steelEnd.appendChild(credit);
    function LightenDarkenColor(col, amt) {
        var usePound = false;
        if (col[0] == "#") {
            col = col.slice(1);
            usePound = true;
        }

        var num = parseInt(col, 16);

        var r = (num >> 16) + amt;

        if (r > 255) r = 255;
        else if (r < 0) r = 0;

        var b = ((num >> 8) & 0x00ff) + amt;

        if (b > 255) b = 255;
        else if (b < 0) b = 0;

        var g = (num & 0x0000ff) + amt;

        if (g > 255) g = 255;
        else if (g < 0) g = 0;

        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    }
})();
