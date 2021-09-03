(async function run(){
    var el = document.querySelector('body');
    const response = await fetch('/index.html');
    const html = await response.text();
    el.innerHTML += html;
})();