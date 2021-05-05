console.log('books');
$('.container-carousel').slick({
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  });

  //FECHA O MODAL DE ADICIONAR LIVRO
  const btnClose = () => {
    document.querySelector('.modal').style.display = "none";
  }
  //FEHCA O MODAL DE ADICIONAR A SINOPSE
  const btnCloseSyn = () => {
    document.querySelector('.modal-synopsis').style.display = "none";
  }  
  // const modal = document.querySelector('.modal');  
  const btn = document.querySelector('.adicionar-livro');
  const btnSyn = document.querySelector('.addSynopsis');
  
  // const btnCriar = document.querySelector('.btn-criar');
  
  btn.onclick = () => {
    document.querySelector('.modal').style.display = "flex";
  }
  btnSyn.onclick = () => {
    document.querySelector('.modal-synopsis').style.display = "flex";
  }

  const form_submit = () => {
    document.getElementById("form-add-to-notebbok").submit();
  } 
  const form_submit_syn = () => {
    document.getElementById("form-add-synopsis").submit();
  }

  