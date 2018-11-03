import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Autenticacao } from '../../autenticacao.service';
import { BlockUIService } from '../../block-ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [ Validators.required, Validators.email ]),
    'senha': new FormControl(null, [ Validators.required, Validators.minLength(4) ])
  });

  constructor(
    private autenticacao: Autenticacao,
    private blockUIService: BlockUIService
  ) { }

  ngOnInit() {
  }

  exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro');
  }

  autenticar(): void {
    this.blockUIService.start();
    if (this.formulario.valid) {
      this.autenticacao.autenticar(this.formulario.value.email, this.formulario.value.senha)
        .then(() => this.blockUIService.stop())
        .catch(e => {
          this.blockUIService.stop();
          console.log(e);
          alert('Login inválido!');
      });
    } else {
      this.blockUIService.stop();
      alert('Login inválido!');
      return;
    }
  }
}
