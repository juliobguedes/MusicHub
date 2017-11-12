app.controller("playlistsController", function($scope, musicHub) {

    $scope.playlists = musicHub.playlists;

    $scope.playlistSelecionada = undefined;

    $scope.cadastrarPlaylist = (playlist) => {

    };

    $scope.selecionar = (playlist) => {
        if (playlist == $scope.playlistSelecionada) {
            $scope.playlistSelecionada = undefined;
        } else {
            $scope.playlistSelecionada = playlist;
        }
    }

});