import data from './data.js';


// Получаем элемент кнопки формы и сохраняем его в переменную formBtn
const formBtn = document.querySelector(".btn-form");

// Получаем элемент формы и сохраняем его в переменную form
const form = document.querySelector(".fact-form");
const factList = document.querySelector(".fact-list");

// загрузка данных с сервера
loadFacts();
async function loadFacts() {


    const dataDB = await res.json();
    //const filteredDataDB = dataDB.filter((fact) => fact.category === 'society');
    createFctsList(dataDB);
}

// Создаем элементы DOM
factList.innerHTML = "";

function createFctsList(dataArray) {
    const htmlArr = dataArray.map((fact)=>
        `
    <li class="fact">
        <p>
            ${fact.text}
            <a class="source" href=${fact.source} target="_blank">(Source)</a>
        </p>
        <span class="tag" style="background-color: 
            ${data.CATEGORIES.find((cat) => cat.name === fact.category).color}
        ">${fact.category}</span>
    </li>
    `
    )
    const html = htmlArr.join("");
    factList.insertAdjacentHTML("afterbegin", html)
}

// Добавляем обработчик события "click" к кнопке формы
formBtn.addEventListener("click", function() {
    // Проверяем, содержит ли элемент формы класс 'hidden'
    if(form.classList.contains('hidden')) {
        // Если содержит, то удаляем класс 'hidden', делая форму видимой
        form.classList.remove("hidden");
        // Меняем текст кнопки на "Close"
        formBtn.textContent = "Close";
    } else {
        // Если класс 'hidden' отсутствует, то добавляем его, скрывая форму
        form.classList.add("hidden");
        // Меняем текст кнопки обратно на "Share a fact"
        formBtn.textContent = "Share a fact";
    }
});

