import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';

export class Autenticacao {
    public cadastrarUsuario(usuario: Usuario): void {
        firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then(res => {
                // remover senha do atributo senha do objeto usuário
                delete usuario.senha;

                // registrando dados complementares do usuário no path email na base64
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set( usuario ).then(() => console.log('ok')).catch(e => console.log('Erro: ', e));
            })
            .catch((error: Error) => {
                console.log('Error: ', error);
            });
    }
}
