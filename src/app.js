const app = angular.module("musicHub", ['ui.router', 'ngToast']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider.state("artistas", {
        url:"/artistas",
        templateUrl:"templates/artistas.html",
        controller:"artistasController"
    }).state("musicas", {
        url:"/",
        templateUrl:"templates/musicas.html",
        controller:"musicasController"
    }).state("paginaDoArtista", {
        url:"/artistas/:nome",
        templateUrl:"templates/paginaDoArtista.html",
        controller:"paginaDoArtistaController",
        resolve: {
            artista: function($stateParams, musicHub) {
                return musicHub.getArtista($stateParams.nome)
            }
        }
    }).state("playlists", {
        url:"/playlists",
        templateUrl:"templates/paginaDasPlaylists.html",
        controller:"playlistsController"
    });

});