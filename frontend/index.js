let loading = false;

function ballCrusher () {
    event.preventDefault();
    console.log("owch.");
    // window.location.href = "sauls-balls.html";
    document.getElementById("form").style.display = 'none';
    loading = true;
    document.getElementById("loading").style.display = 'initial';
}
