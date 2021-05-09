const btn = document.querySelector('.adicionar-livro');

btn.onclick = () => {
    document.querySelector('.modal').style.display = "flex";
    document.getElementById("status").onchange = function() {
      document.getElementById("grade").disabled = (this.value == "Lendo" || this.value == "Quero ler");
    }
    document.getElementById("status").change(); //to trigger on load
}

const form_submit = () => {
    document.getElementById("form-add-to-notebbok").submit();
}

