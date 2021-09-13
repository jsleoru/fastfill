(async function run(){
    var el = document.querySelector('body');
    const response = await fetch('https://fastfill.netlify.app/index.html');
    const html = await response.text();
    el.insertAdjacentHTML("afterbegin", html);
})();