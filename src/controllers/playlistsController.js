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

});