(() => {

  let colors = {
    "Normal": "#A8A878",
    "Fire": "#F08030",
    "Grass": "#78C850",
    "Water": "#6890F0",
    "Electric": "#F8D030",
    "Flying": "#6D5E9C",
    "Fighting": "#C03028",
    "Poison": "#A040A0",
    "Bug": "#A8B820",
    "Psychic": "#F85888",
    "Ghost": "#705898",
    "Dark": "#705848",
    "Ice": "#98D8D8",
    "Dragon": "#7038F8",
    "Fairy": "#EE99AC",
    "Ground": "#E0C068",
    "Rock": "#B8A038",
    "Steel": "#B8B8D0",
  };
  let shorts = {
    "Normal": "NOR",
    "Fire": "FIR",
    "Fighting": "FGH",
    "Water": "WTR",
    "Flying": "FLY",
    "Grass": "GRS",
    "Poison": "POI",
    "Electric": "ELC",
    "Ground": "GRN",
    "Psychic": "PSY",
    "Rock": "ROC",
    "Ice": "ICE",
    "Bug": "BUG",
    "Dragon": "DRA",
    "Ghost": "GHO",
    "Dark": "DRK",
    "Steel": "STL",
    "Fairy": "FAI"
  }

  const tbody = document.querySelector("tbody");
  const summary = [];
  let elemList = document.querySelectorAll(".type-icon");
  elemList = Array.from(elemList);
  elemList = elemList.slice(elemList.length / 2);
  console.log('elemList: ', typeof elemList);
  let elemList2 = [];
  Object.keys(colors).forEach((color, i) => {
    elemList2[i] = elemList.find(type => {
      return type.classList.contains("type-" + color.toLocaleLowerCase())
    });
  });
  console.log('elemList2: ', elemList2);
  const root = document.querySelector("#root");
  elemList2.forEach(elem => {
    const typeElem = document.createElement("div");
    typeElem.classList.add(elem.textContent + "-middle");
    let midSpan = document.createElement("span");
    midSpan.classList.add("middle");
    midSpan.style.border = "solid 6px " + colors[elem.innerHTML];
    midSpan.textContent = shorts[elem.innerHTML];
    midSpan.style.backgroundColor = colors[elem.innerHTML];
    let arrow = document.createElement("span");
    arrow.classList.add("arrow")
    // arrow.textContent = " → ";
    arrow.textContent = " ➞ ";
    let arrow2 = document.createElement("span");
    arrow2.classList.add("arrow")
    // arrow2.textContent = " → ";
    arrow2.textContent = " ➞ ";
    typeElem.appendChild(arrow)
    typeElem.appendChild(midSpan)
    typeElem.appendChild(arrow2)
    root.appendChild(typeElem);
  });

  tbody.childNodes.forEach(elem => {
    if (elem.nodeName !== "TR") return;
    const type = elem.childNodes[3].getAttribute("title").split(" ")[0];
    summary.push({ name: type, super: [], weak: [], immune: [] });
    elem.childNodes.forEach(tr => {
      if (tr.nodeName !== "TD") return;
      const text = tr.getAttribute("title");
      const [curr, versus, effect] = text
        .replace(/\s*/g, "")
        .replace("→", "=")
        .split("=");
      if (effect.includes("super")) {
        const index = summary.findIndex(type => type.name === curr);
        summary[index].super.push(versus)
      } else if (effect.includes("notvery")) {
        const index = summary.findIndex(type => type.name === curr);
        summary[index].weak.push(versus)
      } else if (effect.includes("noeffect")) {
        const index = summary.findIndex(type => type.name === curr);
        summary[index].immune.push(versus)
      }
    });
  });
  let summary2 = []
  Object.keys(colors).forEach((color, i) => {
    summary2[i] = summary.find(type => type.name == color);
  });
  // console.log('summary2: ', summary2);
  // return;
  // console.log(typeof summary)
  function LightenDarkenColor(col,amt) {
    var usePound = false;
    if ( col[0] == "#" ) {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col,16);

    var r = (num >> 16) + amt;

    if ( r > 255 ) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if ( b > 255 ) b = 255;
    else if  (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if ( g > 255 ) g = 255;
    else if  ( g < 0 ) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}
  // summary.slice(0, 3).forEach(curr => {
  summary2.forEach(curr => {
    // console.log(curr.name)
    let middle = document.querySelector("." + curr.name + "-middle");
    
    let weakList = summary.filter(type => type.weak.includes(curr.name));
    const immuneList = summary.filter(type => type.immune.includes(curr.name));
    weakList = [...weakList, ...immuneList];
    console.log('weakList: ', weakList);
    // console.log('immuneList: ', immuneList);
    // console.log('weakList: ', weakList);
    weakList.forEach(type => {
      if (curr.super.includes(type.name)) {
        let rightSide = document.createElement("span");
        rightSide.classList.add(type.name + "-dom-" + curr.name, "dom");
        rightSide.style.border = "solid 6px " + LightenDarkenColor(colors[type.name], -70);
        // rightSide.dataset.color = colors[type.name];
        // rightSide.textContent = "[" + type.name + "]";
        rightSide.style.backgroundColor = colors[type.name];
        rightSide.textContent = shorts[type.name];
        
        middle.appendChild(rightSide);
      }
    })
    curr.super.forEach(sup => {
      let dominate = document.querySelector("." + sup + "-dom-" + curr.name);
      if (dominate) return;
      let rightSide = document.createElement("span");
      rightSide.classList.add("neutral");
      rightSide.style.border = "solid 6px " + colors[sup];
      rightSide.style.backgroundColor = colors[sup];
      rightSide.textContent = shorts[sup];
      
      middle.appendChild(rightSide);
    });
    
    curr.weak.forEach(weak => {
      let rightSide = document.createElement("span");
      rightSide.classList.add("low")
      // rightSide.textContent = `-${weak}-`;
      rightSide.style.backgroundColor = "black";
      rightSide.style.border = "solid 6px " + colors[weak];
      rightSide.textContent = `${shorts[weak]}`;
      middle.appendChild(rightSide);
    });
    curr.immune.forEach(immune => {
      let rightSide = document.createElement("span");
      let img = document.createElement("img");
      img.src = "a.svg";
      rightSide.classList.add("immune")
      rightSide.style.color = "red";
      rightSide.style.backgroundColor = "black";
      rightSide.style.border = "solid 6px " + colors[immune];
      // rightSide.style.backgroundColor = colors[immune];
      rightSide.textContent = `${shorts[immune]}`;
      // crossSVG.appendChild(lineSVG);
      rightSide.appendChild(img);
      middle.appendChild(rightSide);
    });

    // Leftside
    let superList
    summary.forEach(type => {
      superList = summary.filter(type => type.super.includes(curr.name));
    });
    // console.log('superList: ', superList);
    superList.forEach(type => {
      if (type.super.includes(curr.name) && (curr.weak.includes(type.name) || curr.immune.includes(type.name))) {
        let leftSide = document.createElement("span");
        leftSide.classList.add(type.name + "-Ldom-" + curr.name, "dom");
        // leftSide.textContent = `[${type.name}]`;
        leftSide.style.border = "solid 6px " + LightenDarkenColor(colors[type.name], -70);
        leftSide.style.backgroundColor = colors[type.name];
        leftSide.textContent = `${shorts[type.name]}`;
        middle.insertBefore(leftSide, middle.childNodes[0]);
      }
    })
    summary.forEach(type => {
      let dominate = document.querySelector("." + type.name + "-Ldom-" + curr.name);
      if (dominate) return;
      const supper = type.super.find(sup => sup === curr.name);
      if (!supper) return;
      let leftSide = document.createElement("span");
      leftSide.classList.add("neutral")
      leftSide.style.backgroundColor = colors[type.name];
      leftSide.style.border = "solid 6px " + colors[type.name];
      leftSide.textContent = `${shorts[type.name]}`;
      middle.insertBefore(leftSide, middle.childNodes[0]);
    });
    summary.forEach(type => {
      const weak = type.weak.find(sup => sup === curr.name);
      if (!weak) return;
      let leftSide = document.createElement("span");
      leftSide.classList.add("low")
      // leftSide.textContent = `-${type.name}-`;
      leftSide.style.border = "solid 6px " + colors[type.name];
      leftSide.style.backgroundColor = "black";
      leftSide.textContent = `${shorts[type.name]}`;
      middle.insertBefore(leftSide, middle.childNodes[0]);
    });
    summary.forEach(type => {
      const immune = type.immune.find(sup => sup === curr.name);
      if (!immune) return;
      let leftSide = document.createElement("span");
      // let cross = document.createElement("span");
      let img = document.createElement("img");
      img.src = "a.svg";
      // cross.style.position = "absolute";
      // cross.textContent = "X";
      // cross.style.color = "red";
      leftSide.classList.add("immune")
      leftSide.style.backgroundColor = colors[type.name];
      console.log('shorts[type.name]: ', shorts[type.name]);
      console.log('colors[type.name]: ', colors[type.name]);
      leftSide.textContent = `${shorts[type.name]}`;
      leftSide.style.backgroundColor = "black";
      leftSide.style.border = "solid 6px " + colors[type.name];
      leftSide.style.color = "red";
      leftSide.appendChild(img);
      // leftSide.appendChild(cross);
      middle.insertBefore(leftSide, middle.childNodes[0]);
    });
  });
  const steel = document.querySelector(".Steel-middle");
  let i = 0;
  let steelBool = true;
  steel.childNodes.forEach(elem => {
    if (elem.classList.contains("arrow")) {
      steelBool = false;
    }
    if (steelBool) {
      i++;
    }
  })
  root.childNodes.forEach(elem => {
    let bool = true;
    let curr = 0;
    let need = 0;
    elem.childNodes.forEach(elem2 => {
      if (elem2.classList.contains("arrow")) {
        bool = false;
      }
      if (bool) {
        curr++;
      }
    });
    need = i - curr;
    for (let j = 0; need > -1; need--) {
      let arrow = document.createElement("span");
      arrow.classList.add("placeholder");
      // arrow.textContent = " → ";
      elem.insertBefore(arrow, elem.childNodes[0]);
    }
  })
  let credit = document.createElement("span");
  credit.classList.add("credit");
  credit.textContent = "Made by Habbe";
  credit.style.margin = "0 10px";
  root.childNodes[root.childNodes.length - 1].appendChild(credit)
  console.log('root.childNodes[root.childNodes.length]: ', root.childNodes[root.childNodes.length - 1]);

})();
