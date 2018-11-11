import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Progresso } from './progresso.service';

@Injectable()
class Bd {

    constructor(private progresso: Progresso) {}

    public publicar(publicacao: any): void {

        let nomeImagem = Date.now();

        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({ titulo: publicacao.titulo })
            .then((response: any) => {
                nomeImagem = response.key;
                firebase.storage().ref().child(`imagens/${nomeImagem}`)
                    .put(publicacao.imagem)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot: any) => {
                        // acompanhamento do progresso do upload
                        this.progresso.status = 'andamento';
                        this.progresso.estado = snapshot;
                    }, (error) => {
                        this.progresso.status = 'erro';
                    }, () => {
                        // finalização do processo
                        this.progresso.status = 'concluido';
                        // firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
                        //     .push({ titulo: publicacao.titulo, url_imagem: nomeImagem });
                    });
            });
    }

    public consultarPublicacoes(emailUsuario: string): Promise<any> {
        // consultar publicações (database)
        return new Promise((resolve, reject) => {
            firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
                .orderByKey()
                .once('value')
                .then((snapshot: any) => {
                    // console.log(snapshot.val());

                    const publicacoes: Array<any> = [];

                    snapshot.forEach((childSnapshot: any) => {

                        const publicacao = childSnapshot.val();
                        publicacao.key = childSnapshot.key;

                        publicacoes.push(publicacao);
                    });
                    // console.log(publicacoes);
                    // resolve(publicacoes);
                    return publicacoes.reverse();
                })
                .then((publicacoes) => {
                    // console.log(publicacoes);
                    // consultar a url da imagem (storage)
                    publicacoes.forEach((publicacao) => {

                        firebase.storage().ref()
                        .child(`imagens/${publicacao.key}`)
                        .getDownloadURL()
                        .then((url: string) => {
                            publicacao.urlImagem = url;

                            // consultar o nome do usuário
                            firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                                .once('value')
                                .then((snapshot: any) => {
                                    publicacao.nomeUsuario = snapshot.val().nomeUsuario;
                                });
                            });
                    });
                    resolve(publicacoes);
                });
            });
    }
}

export { Bd };
