$('.container-carousel').slick({
    // centerMode:true,
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1
  });


  const btnClose = () => {
    document.querySelector('.modal').style.display = "none";
  }
  
  // const modal = document.querySelector('.modal');
  
  const btn = document.querySelector('.editar-user');
  // const btnCriar = document.querySelector('.btn-criar');
  
  btn.onclick = () => {
    document.querySelector('.modal').style.display = "flex";
  }
  
  const form_submit = () => {
    document.getElementById("form-create-user").submit();
  } 
  