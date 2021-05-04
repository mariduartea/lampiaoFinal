$('.container-carousel').slick({
  centerMode: true,
  dots: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1
});

const btnClose = () => {
  document.querySelector('.modal').style.display = "none";
}

// const modal = document.querySelector('.modal');

const btn = document.querySelector('.cadastrar-book');
// const btnCriar = document.querySelector('.btn-criar');

btn.onclick = () => {
  document.querySelector('.modal').style.display = "flex";
}

const form_submit = () => {
  document.getElementById("form-create-book").submit();
} 

// btnCriar.onclick = () => {
//   document.querySelector("#btn-submit-book");
// }




// let formContact = document.querySelector('#form_contact');

// formContact.addEventListener("submit", (event) => {
    // interrompo o envio do formlário
    // event.preventDefault();

    // validar se todos os campos estão preenchido
    // validar se nome tem 2 ou mais caracteres
    // validar se telefone tem no minimo 8 caracteres
    // validar se o campo email tem @ (Google - validação email com regex)
    // let nomeValue = document.querySelector("#input_nome").value;
    // let emailValue = document.querySelector("#input_email");
    // let telefoneValue = document.querySelector("#input_telefone").value;
    // let mensagemValue = document.querySelector("#input_mensagem").value;
//     document.querySelector("#input-name").value
//     document.querySelector("#input-isbn").value
//     document.querySelector("#input-pc").value
//     document.querySelector("#input-writer").value
//     document.querySelector("#input-genre").value
//     document.querySelector("#input-year").value
//     document.querySelector("#input-img").value
//      formContact.submit();

//  })
// document.querySelector('.cadastrar-book').addEventListener('click', function () {
//   document.querySelector('.modal').classList.add('flex');
// });

// setTimeout( () => {
//   document.querySelector('.modal').style.display = "flex";
// } , 3000)
