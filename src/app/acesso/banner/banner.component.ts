import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';

import { Imagem } from './imagem.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner', [
      state('escondido', style({
        opacity: 0
      })),
      state('visivel', style({
        opacity: 1
      })),
      transition('escondido <=> visivel', animate('1s ease-in')),
    ])
  ]
})
export class BannerComponent implements OnInit {

  public estado = 'escondido';

  public imagens: Array<Imagem> = [
    { estado: 'visivel', url: '/assets/banner-acesso/img_1.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_2.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_3.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_4.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_5.png' }
  ];

  constructor() { }

  ngOnInit() {
    setTimeout(() => this.logicaRotacao(), 3000);
  }

  // ocultar imagem
  public logicaRotacao(): void {
    for (let i = 0; i <= 4; i++) {
      if (this.imagens[i].estado === 'visivel') {
        this.imagens[i].estado = 'escondido';
        // exibir a próxima imagem
        this.imagens[ i === 4 ? 0 : i + 1].estado = 'visivel';
        break;
      }
    }
    setTimeout(() => this.logicaRotacao(), 3000);
  }
}
