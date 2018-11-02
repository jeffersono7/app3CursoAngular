import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Autenticacao } from '../../autenticacao.service';

import { Usuario } from '../usuario.model';

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

  constructor(
    private autenticacao: Autenticacao
    ) { }

  ngOnInit() {
  }

  exibirPainelLogin(): void {
    this.exibirPainel.emit('login');
  }

  public cadastrarUsuario(): void {
    if (this.formulario.valid) {
      const usuario: Usuario = new Usuario(
        this.formulario.value.email,
        this.formulario.value.nomeCompleto,
        this.formulario.value.nomeUsuario,
        this.formulario.value.senha
      );
      this.autenticacao.cadastrarUsuario(usuario);
    } else {
      return;
    }
  }

}
