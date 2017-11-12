app.service("musicHub", function() {
    this.artistas = [
        {nome:"Taylor Swift",
        imagem:"https://www.tribunaonline.com.br/wp-content/uploads/2016/05/taylor-swift.png",
        albuns:[{
            nome:"Reputation",
            musicas:[{
                titulo:"...Ready For It?",
                duracao:"3:01",
                ano:2017
            }, {
                titulo:"End Game (feat. Ed Sheeran and Future)",
                duracao:"3:01",
                ano:2017
            }],
            showTable: false
        },{
            nome:"1989",
            musicas:[{
                titulo:"Style",
                duracao:"3:10",
                ano:2014
            }, {
                titulo:"Clean",
                duracao:"3:10",
                ano:2014
            }],
            showTable: false
        }],
        ultimaMusica:{
            titulo:"...Ready For It?",
            duracao:"3:01",
            ano:2017
        }
        }
    ];

    this.playlists = [{
        nome:".play(Violao)",
        musicas:[]
    }, {
        nome:"BRB, Sia L8er",
        musicas:[]
    }];

    this.cadastrarArtista = (artista) => {
        var nome = artista.nome;
        var jaTem = false;
        for (art in this.artistas) {
            var aNome = this.artistas[art].nome;
            if (nome == aNome) {
                jaTem = true;
            };
        };

        if (jaTem) {
            return false;
        } else {
            artista.albuns = [];
            artista.ehFavorito = false;
            artista.tentouDesfavoritar = false;
            this.artistas.push(angular.copy(artista));
            return true;

        };
    };

    this.getArtista = (nome) => {
        for (i in this.artistas) {
            if (this.artistas[i].nome == nome) {
                return this.artistas[i];
            };
        };
        return null;
    };

    this.favoritar = (artista) => {
        var jaExistente = this.getArtista(artista.nome);
        if (jaExistente != null) {
            jaExistente.ehFavorito = true;
        };
    };

    this.desfavoritar = (artista) => {
        var jaExistente = this.getArtista(artista.nome);
        if (jaExistente != null) {
            jaExistente.ehFavorito = false;
            jaExistente.tentouDesfavoritar = false;
        };
    };

    this.tentouDesfavoritar = (artista) => {
        var jaExistente = this.getArtista(artista.nome);
        if (jaExistente != null) {
            jaExistente.tentouDesfavoritar = true;
        };
    };

    this.cancelar = (artista) => {
        var jaExistente = this.getArtista(artista.nome);
        if (jaExistente != null) {
            jaExistente.tentouDesfavoritar = false;
        };
    };

    this.cadastrarMusica = (musica, artista) => {

        var albuns = artista.albuns;
        var albumExistente = null;

        for (i in albuns) {
            if (albuns[i].nome == musica.album) {
                albumExistente = albuns[i];
            };
        };

        if (albumExistente != null) {
            var musicaExiste = null;
            var musicasDoAlbum = albumExistente.musicas;
            for (j in musicasDoAlbum) {
                if (musicasDoAlbum[j].titulo == musica.titulo) {
                    musicaExiste = musicasDoAlbum[j];
                };
            };

            if (musicaExiste != null) {
                return false;
            } else {
                albumExistente.musicas.push(musica);
                return true;
            };

        } else {
            var nomeAlbum = musica.album;
            var novoAlbum = {};
            novoAlbum.nome = nomeAlbum;
            novoAlbum.musicas = [];
            novoAlbum.musicas.push(musica);
            artista.albuns.push(novoAlbum);

            return true;
        };

    };

    this.escutarMusica = (artista, musica) => {
        let esseArtista = this.getArtista(artista.nome);
        esseArtista.ultimaMusica = musica;
    }
});