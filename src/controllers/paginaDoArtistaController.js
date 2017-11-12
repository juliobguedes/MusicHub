app.controller("paginaDoArtistaController", function($scope, artista, musicHub) {
    $scope.artista = artista;

    $scope.albumSelecionado = undefined;

    $scope.selecionar = (album) => {
        if (album == $scope.albumSelecionado) {
            $scope.albumSelecionado = undefined;
        } else {
            $scope.albumSelecionado = album;
        }
    }

    $scope.favoritar = (artista) => {
        musicHub.favoritar(artista);
    };

    $scope.desfavoritar = (artista) => {
        musicHub.desfavoritar(artista);
    };

    $scope.cancelar = (artista) => {
        musicHub.cancelar(artista);
    };

    $scope.tentouDesfavoritar = (artista) => {
        musicHub.tentouDesfavoritar(artista);
    };

    $scope.escutar = (musica) => {
        musicHub.escutarMusica($scope.artista, musica);
    };
});