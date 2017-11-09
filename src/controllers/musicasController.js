app.controller("musicasController", function($scope, musicHub, ngToast) {
    $scope.artistas = musicHub.artistas;

    $scope.cadastrar = (musica, artista) => {
        var deuCerto = musicHub.cadastrarMusica(musica, artista);
        if (deuCerto) {
            delete $scope.musica;
            delete $scope.artista;
            ngToast.create({
                className: 'success',
                content: 'Musica cadastrada'
            });
        } else {
            ngToast.create({
                className: 'warning',
                content: 'Não é possível ter duas músicas com o mesmo nome.'
            });
        }
    };
});