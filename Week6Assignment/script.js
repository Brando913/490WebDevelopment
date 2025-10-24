const input = document.getElementById("itemInput")
const addBtn = document.getElementById("addBtn")
const list = document.getElementById("list")
const clearBtn = document.getElementById("clearBtn")
const counter = document.getElementById("counter")

function updateCounter(){
    const items = document.querySelectorAll("li");
    const counter = document.getElementById("counter");

    const count = items.length;
    counter.textContent = `${count} item${count !== 1 ? 's' : ''}`;
}
