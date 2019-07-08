class MyList extends HTMLUListElement {
    constructor() {
        super();
        const lis = document.querySelectorAll(':root li');
        Array.from(lis).forEach(li => {
            li.textContent = `你好, ${li.textContent}`;
        });
    }
 }
 customElements.define('my-list', MyList, {extends:'ul'});
