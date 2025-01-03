var stations = [
  "Aldgate",
  "Aldgate East",
  "Angel",
  "Baker Street",
  "Bank",
  "Barbican",
  "Battersea Power Station",
  "Bayswater",
  "Blackfriars",
  "Bond Street",
  "Borough",
  "Cannon Street",
  "Chancery Lane",
  "Charing Cross",
  "Covent Garden",
  "Earl's Court",
  "Edgware Road (Bakerloo)",
  "Edgware Road (Circle)",
  "Elephant & Castle",
  "Embankment",
  "Euston",
  "Euston Square",
  "Farringdon",
  "Gloucester Road",
  "Goodge Street",
  "Great Portland Street",
  "Green Park",
  "Holborn",
  "Hyde Park Corner",
  "King's Cross St. Pancras",
  "Knightsbridge",
  "Lambeth North",
  "Lancaster Gate",
  "Leicester Square",
  "Liverpool Street",
  "London Bridge",
  "Mansion House",
  "Marble Arch",
  "Marylebone",
  "Monument",
  "Moorgate",
  "Old Street",
  "Oxford Circus",
  "Paddington",
  "Piccadilly Circus",
  "Pimlico",
  "Queensway",
  "Regent's Park",
  "Russell Square",
  "South Kensington",
  "Southwark",
  "St. James's Park",
  "St. Paul's",
  "Temple",
  "Tottenham Court Road",
  "Tower Hill",
  "Vauxhall",
  "Victoria",
  "Warren Street",
  "Waterloo",
  "Westminster"
]


function autocomplete(input, options) {
  let currentIndex;

  input.addEventListener("input", function () {
    let container, item, i, value = this.value;
    closeSuggestions();
    if (!value) return;

    currentIndex = -1;
    container = document.createElement("div");
    container.setAttribute("class", "autocomplete-items");
    container.setAttribute("id", this.id + "autocomplete-list");
    this.parentNode.appendChild(container);

    for (i = 0; i < options.length; i++) {
      if (options[i].substr(0, value.length).toUpperCase() === value.toUpperCase()) {
        item = document.createElement("div");
        item.innerHTML = "<strong>" + options[i].substr(0, value.length) + "</strong>";
        item.innerHTML += options[i].substr(value.length);
        item.innerHTML += "<input type='hidden' value='" + options[i] + "'>";
        item.addEventListener("click", function () {
          input.value = this.getElementsByTagName("input")[0].value;
          closeSuggestions();
        });
        container.appendChild(item);
      }
    }
  });

  input.addEventListener("keydown", function (e) {
    let list = document.getElementById(this.id + "autocomplete-list");
    if (list) list = list.getElementsByTagName("div");

    if (e.keyCode === 40) {
      currentIndex++;
      highlightActive(list);
    } else if (e.keyCode === 38) {
      currentIndex--;
      highlightActive(list);
    } else if (e.keyCode === 13) {
      e.preventDefault();
      if (currentIndex > -1 && list) list[currentIndex].click();
    }
  });

  function highlightActive(list) {
    if (!list) return;
    removeHighlight(list);
    if (currentIndex >= list.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = list.length - 1;
    list[currentIndex].classList.add("autocomplete-active");
  }

  function removeHighlight(list) {
    for (let i = 0; i < list.length; i++) {
      list[i].classList.remove("autocomplete-active");
    }
  }

  function closeSuggestions(exclude) {
    const lists = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < lists.length; i++) {
      if (exclude !== lists[i] && exclude !== input) {
        lists[i].parentNode.removeChild(lists[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
    closeSuggestions(e.target);
  });
}
