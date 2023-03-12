
  function selectAll(source, skillName) {
    checkboxes = document.getElementsByName(skillName);
    for (var i = 0, n = checkboxes.length; i < n; i++) {
      checkboxes[i].checked = source.checked;
    }
}

function showLoadingMessage(){
    document.getElementById("loading").style.display = "block";
}
