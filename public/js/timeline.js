$(".container-carousel").slick({
  // normal options...
  // centerMode: true,
  dots: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,

  // the magic
  responsive: [{

      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        infinite: true
      }

    }, {

      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        dots: true
      }

    }, {

      breakpoint: 300,
      settings: {
        slidesToShow: 1,
        dots: true
      }
      // settings: "unslick" // destroys slick

    }]
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

