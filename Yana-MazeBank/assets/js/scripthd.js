document.addEventListener("DOMContentLoaded", function() {
    fetch("assets/header-footer/header.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("header").innerHTML = data;
        });
    fetch("assets/header-footer/footer.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("footer").innerHTML = data;
        });
});