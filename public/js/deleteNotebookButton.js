const btnCloseDelete = () => {
    document.querySelector('.modal-delete').style.display = "none";
  }

const btnDelete = document.querySelector('.deletar-livro');

btnDelete.onclick = () => {
    document.querySelector('.modal-delete').style.display = "flex";
}

const form_submit_delete = () => {
    document.getElementById("form-del-notebook").submit();
}


