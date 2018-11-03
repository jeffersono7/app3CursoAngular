import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';

@Injectable()
export class Autenticacao {

    public tokenId: string;

    constructor(
        private router: Router
    ) {}

    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then(res => {
                // remover senha do atributo senha do objeto usuário
                delete usuario.senha;

                // registrando dados complementares do usuário no path email na base64
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set( usuario ).then(() => console.log('ok')).catch(e => console.log('Erro: ', e));
            })
            .catch((error: Error) => {
                console.log('Error: ', error);
                throw error;
            });
    }

    public autenticar(email: string, senha: string): Promise<any> {
        return firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(res => {
                firebase.auth().currentUser.getIdToken()
                    .then((idToken: string) => {
                        // window.localStorage.setItem('tokenId-app3', idToken);
                        this.tokenId = idToken;
                        localStorage.setItem('idToken-app3', idToken);
                        this.router.navigate(['/home']);
                    });
            })
            .catch(e => {
                console.log('Error login: ', e);
                throw e;
            });
    }

    public isAutenticated(): boolean {
        if (localStorage.getItem('idToken-app3')) {
            this.tokenId = localStorage.getItem('idToken-app3');
        }
        return this.tokenId ? true : false;
    }

    public logout(): void {
        // localStorage.removeItem('idToken-app3');
        firebase.auth().signOut().then(res => {
            localStorage.clear();
            delete this.tokenId;
            this.router.navigate(['/']);
        });
    }
}
