function debouncer(func, delay) {
  let debouncing;
  return function () {
    debouncing && clearTimeout(debouncing);
    debouncing = setTimeout(() => func.apply(this, arguments), delay);
  };
}

var inputBox = document.getElementById("query");
inputBox.addEventListener("input", debouncer(fetchData, 100));

async function fetchData() {
  try {
    await fetch(
      `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${inputBox.value}&ts=1&orderBy=name&limit=10&apikey=4534a9d1d2ee9674b2b206c6b578022e&hash=7a9559908ddc59166b41b7959fad48b3`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        appendData(res.data.results);
      });
  } catch (error) {
    console.log(error.message);
  }
}
const sugesstionBox = document.getElementById("sugesstionBox");

const appendData = (data) => {
  sugesstionBox.innerHTML = null;

  data &&
    data.forEach((e) => {
      let lists = document.createElement("div");
      lists.setAttribute("class", "lists");
      let nameBox = document.createElement("div");
      nameBox.setAttribute("id", "name");
      let character = document.createElement("p");
      character.setAttribute("class", "namewrap");
      character.innerHTML = e.name;
      nameBox.append(character);
      lists.append(nameBox);
      lists.addEventListener("click", () => {
        localStorage.setItem("superhero", JSON.stringify(e));
        window.location.href = "./comicPage.html";
        input.value = "";
      });
      sugesstionBox.append(lists);
    });
};
