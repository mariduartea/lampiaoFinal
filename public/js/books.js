console.log('books');
$('.container-carousel').slick({
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  });

  const btnClose = () => {
    document.querySelector('.modal').style.display = "none";
  }
  
  // const modal = document.querySelector('.modal');
  
  const btn = document.querySelector('.adicionar-livro');
  // const btnCriar = document.querySelector('.btn-criar');
  
  btn.onclick = () => {
    document.querySelector('.modal').style.display = "flex";
  }
  
  const form_submit = () => {
    document.getElementById("form-create-book").submit();
  } 
  
 