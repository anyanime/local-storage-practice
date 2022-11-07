'use strict'

// getting html Element
let input = document.getElementById('item');
let btn = document.getElementById('form');
let listItems = document.getElementById('load');
let items = JSON.parse(localStorage.getItem('items')) || [];

//store the value in the local storage and show it on webpage
let store = (e) => {
    e.preventDefault();

    let item = input.value;
    const list = {
        item,
        done: false
    }

    items.push(list);
    showList(items, listItems)
    localStorage.setItem('items', JSON.stringify(items));

    input.value = '';
    console.table(items)
}



let showList = (loads = [], loadList) => {
    loadList.innerHTML = loads.map((load, i) => {
        return `
               <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${load.done ? 'checked' : ''} />
          <label for="item${i}">${load.item}</label>
        </li>
        `;
    }).join('');
}

let done = (e) => {
    if(!e.target.matches('input')) return; //skip this unless it's an input
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    showList(items, listItems);
}

showList(items, listItems)

 btn.addEventListener('submit', store);
 listItems.addEventListener('click', done);