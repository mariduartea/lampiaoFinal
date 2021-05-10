const btn = document.querySelector('.deletar-livro');

btn.onclick = () => {
    document.querySelector('.modal').style.display = "flex";
}

const form_submit = () => {
    document.getElementById("form-del-notebook").submit();
}
