app.controller("artistasController", function($scope, ngToast, musicHub) {
    
    $scope.artistas = musicHub.artistas;

    var artistaCadastrado = () => {
        ngToast.create({
            className: 'success',
            content: 'Artista cadastrado.'
        });
    };

    var artistaComMesmoNome = () => {
        ngToast.create({
            className: 'warning',
            content: 'Não é possível ter dois artistas cadastrados com o mesmo nome.'
        });
    };

    $scope.cadastrarArtista = function(artista) {
        if (artista.imagem === undefined) {
            artista.imagem = "http://agency.governmentjobs.com/agencypageassets/frederickco/Assets/Images/ProfilePlaceholder250x250.png";
        }
        var deuCerto = musicHub.cadastrarArtista(artista);
        if (deuCerto) {
            delete $scope.artista;
            artistaCadastrado();

        } else {
            artistaComMesmoNome();

        };
    };

    $scope.favoritar = (artista) => {
        musicHub.favoritar(artista);
    };

    $scope.desfavoritar = (artista) => {
        musicHub.desfavoritar(artista);
    };

    $scope.cancelar = (artista) => {
        musicHub.cancelarDesfav(artista);
    };

    $scope.tentouDesfavoritar = (artista) => {
        musicHub.tentouDesfavoritar(artista);
    };

    $scope.selecionarArtista = (artista) => {
        musicHub.selecionarArtista(artista);
    };
    
    $scope.ordenarPor = (campo) => {
        $scope.ordem = campo;
        $scope.nr = !$scope.nr;
    };
    
});