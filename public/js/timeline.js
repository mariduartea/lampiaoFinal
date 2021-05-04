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

const modal = document.querySelector('.modal');

const btn = document.querySelector('.cadastrar-book');

btn.onclick = function() {
  modal.style.display = "flex";
}

document.querySelector('.cadastrar-book').addEventListener('click', function () {
  document.querySelector('.model').classList.add('flex');
});

// setTimeout( () => {
//   document.querySelector('.modal').style.display = "flex";
// } , 3000)
