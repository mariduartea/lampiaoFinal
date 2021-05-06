//pegando todos os elementos requisitados
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");

let btns = document.querySelectorAll('.search-list');
let list = [].slice.call(btns);
let innertext = list.map(function(e) { return e.innerText; });
console.log(innertext);

let nums = document.querySelectorAll('.search-num');
let lista = [].slice.call(nums);
let innernum = lista.map(function(e) { return e.innerText; });
console.log(innernum);

inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //dados inseridos pelo usuário
    let emptyArray = [];
    if(userData){
        emptyArray = innertext.filter((data)=>{
           // filtrar o valor da matriz e o caractere do usuário para minúsculas e retornar apenas as palavras que começam com a palavra inserida pelo usuário
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            let i = innertext.indexOf(data);
            console.log(i);
            console.log(data);
            console.log(innernum[i]);
            let link = `http://localhost:3000/books/${innernum[i]}`;
            return data = "<li><a href='"+link+"'>"+ data + "</a></li>";
        });
        console.log(emptyArray);
        searchWrapper.classList.add("active"); //Mostrar o box do autocomplete
        
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.lenght; i++) {
            // Adicionando o atributo onclick em toda Li Tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //Esconder o box do autocomplete
    }
    showSuggestions(emptyArray);
}

function select(element){
    let selectUserData = element.textContent;
    inputBox.value = selectUserData; //passando os dados do item da lista selecionado pelo usuário em textfiled
    searchWrapper.classList.remove("active"); //Esconder o box do autocomplete
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = "<li>" + userValue +"</li>";
    }else{
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
}