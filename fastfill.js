(async function run(){
    var el = document.querySelector('body');
    const response = await fetch('/index.html');
    const html = response.text();
    el.innerHTML += html;
})();