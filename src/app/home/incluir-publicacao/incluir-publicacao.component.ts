import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Bd } from '../../bd.service';
import * as firebase from 'firebase';
import { Progresso } from '../../progresso.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  email: string;
  private imagem: any;

  public progressoPublicacao = 'pendente';
  public porcentagemUpload: number;

  formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null, Validators.required)
  });

  constructor(private bd: Bd, private progresso: Progresso) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    });
  }

  prepararImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files;
  }

  publicar(): void {
    if (this.formulario.valid && this.imagem !== undefined) {
      this.bd.publicar({
        email: this.email,
        titulo: this.formulario.value.titulo,
        imagem: this.imagem[0]
      });
      const acompanhamentoUpload = Observable.interval(1500);
      const continua = new Subject();

      continua.next(true);

      acompanhamentoUpload
        .takeUntil(continua)
        .subscribe(() => {
          this.progressoPublicacao = 'andamento';

          this.porcentagemUpload = Math.round((this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes) * 100);

          if (this.progresso.status === 'concluido') {
            this.progressoPublicacao = 'concluido';
            continua.next(false);
          }
        });
    } else {
      return;
    }
  }
}
