app.controller("playlistsController", function($scope, musicHub, ngToast) {

    var playlistCadastrada = () => {
        ngToast.create({
            className: 'success',
            content: 'Playlist cadastrada.'
        });
    };

    var playlistComMesmoNome = () => {
        ngToast.create({
            className: 'warning',
            content: 'Não é possível ter duas playlists cadastradas com o mesmo nome.'
        });
    };

    $scope.playlists = musicHub.playlists;

    $scope.playlistSelecionada = undefined;

    $scope.cadastrarPlaylist = (playlist) => {
        let deuCerto = musicHub.cadastrarPlaylist(playlist);
        if (deuCerto) {
            playlistCadastrada();
            delete $scope.playlist;
        } else {
            playlistComMesmoNome();
        };
    };

    $scope.selecionar = (playlist) => {
        if (playlist == $scope.playlistSelecionada) {
            $scope.playlistSelecionada = undefined;
        } else {
            $scope.playlistSelecionada = playlist;
        }
    };

    $scope.tentouRemover = (musica) => {
        musicHub.tentouRemover($scope.playlistSelecionada, musica);
    };

    $scope.remover = (musica) => {
        musicHub.removerMusica($scope.playlistSelecionada, musica);
        $scope.playlists = musicHub.playlists;
    };

    $scope.cancelar = (musica) => {
        musicHub.cancelarMusica($scope.playlistSelecionada, musica);
    };

    $scope.tentouRemoverPlaylist = (playlist) => {
        musicHub.tentouRemoverPlaylist(playlist);
    };

    $scope.removerPlaylist = (playlist) => {
        musicHub.removerPlaylist(playlist);
        $scope.playlists = musicHub.playlists;
        if (playlist == $scope.playlistSelecionada) {
            $scope.playlistSelecionada = undefined;
        }
    };

    $scope.cancelarPlaylist = (playlist) => {
        musicHub.cancelarPlaylist(playlist);
    };

});