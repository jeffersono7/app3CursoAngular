import { Component, OnInit } from '@angular/core';
import { Bd } from '../../bd.service';
import * as firebase from 'firebase';
import { BlockUIService } from '../../block-ui.service';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  email: string;
  publicacoes: any;

  constructor(private bd: Bd, private blockUIService: BlockUIService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      this.email = user.email;

      this.atualizarTimeLine();
    });
  }

  public atualizarTimeLine(): void {
    this.blockUIService.start();
    this.bd.consultarPublicacoes(this.email)
      .then((publicacoes: any) => {
        // console.log(publicacoes);
        this.publicacoes = publicacoes;
        this.blockUIService.stop();
      });
  }

}
