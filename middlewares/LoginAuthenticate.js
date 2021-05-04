

module.exports = (request, response, next) => {
    if(request.session.usuarioLogado){
        next();
    }
    else{
        response.redirect('/user/login');
    }
}

