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

    public consultarPublicacoes(emailUsuario: string): any {
        firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
            .once('value')
            .then((snapshot: any) => {
                console.log(snapshot.val());
            });
    }
}

export { Bd };
