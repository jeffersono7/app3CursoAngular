import { Component, OnInit, ViewChild } from '@angular/core';
import { Autenticacao } from "../autenticacao.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('publicacoes') public publicacoes: any;

  constructor(private autenticacao: Autenticacao) { }

  ngOnInit() {
  }

  sair(): void {
    this.autenticacao.logout();
  }

  atualizarTimeLine(): void {
    this.publicacoes.atualizarTimeLine();
  }

}
