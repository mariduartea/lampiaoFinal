const btnClosePost = () => {
    document.querySelector('.modal-post').style.display = "none";
}

const btnPost = document.querySelector('.addPOST');

btnPost.onclick = () => {
    document.querySelector('.modal-post').style.display = "flex";
}

const form_submit_post = () => {
    document.querySelector('.form-add-posts').submit();
}