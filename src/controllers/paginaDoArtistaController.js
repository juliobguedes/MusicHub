app.controller("paginaDoArtistaController", function($scope, $stateParams, ngToast, musicHub) {
    $scope.artista = musicHub.artistaSelecionado;
    console.log($scope.artista);
});