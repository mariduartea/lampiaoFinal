//pegando todos os elementos requisitados
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");

//se o usuário pressionar qualquer tecla e soltar

inputBox.onkeyup = (e)=>{
    let userdata = e.target.value; //dados inseridos pelo usuário
    let emptyArray = [];
    if(userData){
        emptyArray = suggestion.filter((data)=>{
           // filtrar o valor da matriz e o caractere do usuário para minúsculas e retornar apenas as palavras que começam com a palavra inserida pelo usuário
            return data.tolocaleLowerCase().startWith(userData.tolocaleLowerCase());
        });
        emptyArray = emptyArray.map(()=>{
            return data = '<li>'+ data +'</li>';
        });
        console.log(emptyArray);
        searchWrapper.classList.add("active"); //Mostrar o box do autocomplete
        showSuggestions(emptyArray);
        let allList = suggbox.querySelectorAll("li");
        for (let i = 0; i < allList.lenght; i++) {
            //Adicionando o atributo onclick em toda Li Tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //Esconder o box do autocomplete
    }
}

function select(element){
    let selectUserData = element.textContent;
    inputBox.value = selectUserData; //passando os dados do item da lista selecionado pelo usuário em textfiled
    searchWrapper.classList.remove("active"); //Esconder o box do autocomplete
}

function showSuggestions(list){
    let listData;
    if(!list.lenght){
        userValue = inputBox.value;
        listData = '<li>' + userValue +'</li>';
    }else{
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
}