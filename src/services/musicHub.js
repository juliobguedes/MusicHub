app.service("musicHub", function() {
    this.artistas = [
        {nome:"Taylor Swift",
        imagem:"https://www.tribunaonline.com.br/wp-content/uploads/2016/05/taylor-swift.png",
        nota:4,
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
        musicas:[],
        tentouRemover: false,
        remover: false}, {
        nome:"BRB, Sia L8er",
        musicas:[],
        tentouRemover: false,
        remover: false
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

    this.cancelarDesfav = (artista) => {
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
            artista.ultimaMusica = musica;

            return true;
        };

    };

    this.escutarMusica = (artista, musica) => {
        let esseArtista = this.getArtista(artista.nome);
        esseArtista.ultimaMusica = musica;
    };

    this.cadastrarPlaylist = (playlist) => {
        var jaTem = false;
        for (i in this.playlists) {
            if (this.playlists[i].nome == playlist.nome) {
                jaTem = true;
            }
        }

        if (jaTem) {
            return false;
        } else {
            playlist.tentouRemover = false;
            playlist.remover = true;
            this.playlists.push(angular.copy(playlist));
            return true;
        }
    };

    this.cadastraMusicaNaPlaylist = (playlist, musica) => {
        let jaTem = false;
        let local = this.getPlaylist(playlist);
        for (i in local.musicas) {
            if (local.musicas[i] == musica) {
                jaTem = true;
            }
        }

        if (!(jaTem)) {
            let copyMusica = angular.copy(musica);
            copyMusica.tentouRemover = false;
            copyMusica.remover = false;
            playlist.musicas.push(copyMusica);
        }
    }

    this.getPlaylist = (playlist) => {
        let local = this.playlists;
        for (p in local) {
            if (local[p].nome == playlist.nome) {
                return local[p];
            }
        }
    };

    this.tentouRemover = (playlist, musica) => {
        let local = this.getPlaylist(playlist);
        for (i in local.musicas) {
            if (local.musicas[i].nome == musica.nome) {
                console.log('aew');
                local.musicas[i].tentouRemover = true;
            }
        }
    };

    this.cancelarMusica = (playlist, musica) => {
        let local = this.getPlaylist(playlist);
        for (i in local.musicas) {
            if (local.musicas[i].nome == musica.nome) {
                local.musicas[i].tentouRemover = false;
            }
        }
    };

    this.removerMusica = (playlist, musica) => {
        musica.remover = true;
        let thisPlaylist = this.getPlaylist(playlist);
        thisPlaylist.musicas = playlist.musicas.filter(function(musica) {
            if (!(musica.remover)) {
                return musica;
            };
        });
    };

    this.removerPlaylist = (playlist) => {
        let local = this.getPlaylist(playlist);
        local.remover = true;
        this.playlists = this.playlists.filter(function(playlist) {
            if (!(playlist.remover)) {
                return playlist;
            };
        });
    };

    this.cancelarPlaylist = (playlist) => {
        let local = this.getPlaylist(playlist);
        local.tentouRemover = false;
    };

    this.tentouRemoverPlaylist = (playlist) => {
        let local = this.getPlaylist(playlist);
        local.tentouRemover = true;
    };

});