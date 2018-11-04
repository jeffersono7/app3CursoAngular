import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Autenticacao } from '../../autenticacao.service';

import { Usuario } from '../usuario.model';
import { BlockUIService } from '../../block-ui.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [ Validators.required, Validators.email ]),
    'nomeCompleto': new FormControl(null, Validators.required),
    'nomeUsuario': new FormControl(null, [ Validators.required, Validators.minLength(4) ]),
    'senha': new FormControl(null, [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  statusCadastro = { status: undefined, msg: undefined};

  constructor(
    private autenticacao: Autenticacao,
    private blockUIService: BlockUIService
    ) { }

  ngOnInit() {
  }

  exibirPainelLogin(): void {
    this.exibirPainel.emit('login');
  }

  public cadastrarUsuario(): void {
    this.blockUIService.start();
    if (this.formulario.valid) {
      const usuario: Usuario = new Usuario(
        this.formulario.value.email,
        this.formulario.value.nomeCompleto,
        this.formulario.value.nomeUsuario,
        this.formulario.value.senha
      );
      this.autenticacao.cadastrarUsuario(usuario)
        .then((res: any) => {
          this.blockUIService.stop();
          this.exibirPainel.emit('login');
        })
        .catch((e: Error) => {
          this.blockUIService.stop();
          if (e.message === 'dados-invalidos') {
            this.statusCadastro.msg = 'Dados inválidos! Por favor verifique e tente novamente!';
          } else {
            this.statusCadastro.msg = 'Servidor indisponível temporariamente! Tente novamente mais tarde';
          }
          this.statusCadastro.status = 'error';
        });
    } else {
      this.blockUIService.stop();
      return;
    }
  }

}
