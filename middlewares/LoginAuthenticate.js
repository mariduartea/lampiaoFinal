

module.exports = (request, response, next) => {
    if(request.session.usuarioLogado != null){
        next();
    }
    else{
        response.redirect('/user/login');
    }
}

