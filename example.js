var weasel  = new Weasel(),
    results = weasel.find();

var ul = document.getElementById("resultsList"),
    p  = document.getElementById("resultsIntro");

p.innerHTML = "Search took " + (results.length + 1) + " iterations:";
for (var i=0; i < results.length; i++) {
  ul.innerHTML += "<li>" + results[i] + "</li>";
};
