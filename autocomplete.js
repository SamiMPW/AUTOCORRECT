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


function autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(a);
      for (i = 0; i < arr.length; i++) {
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          b = document.createElement("DIV");
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
              b.addEventListener("click", function(e) {
              inp.value = this.getElementsByTagName("input")[0].value;
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        currentFocus++;
        addActive(x);
      } else if (e.keyCode == 38) { //up
        currentFocus--;
        addActive(x);
      } else if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }

document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}
