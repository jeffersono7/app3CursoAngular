import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BlockUIService } from '../block-ui.service';
import { trigger, style, animate, state, transition, keyframes } from '@angular/animations';

@Component({
  selector: 'app-block-ui',
  templateUrl: './block-ui.component.html',
  styleUrls: ['./block-ui.component.css'],
  animations: [
    trigger('loading-ico', [
      state('created', style({})),
      transition('void => created', [
        style({ transform: 'rotate(-9999999deg)'}),
        animate('330s 0s ease-in-out')
      ])
    ])
  ]
})
export class BlockUiComponent implements OnInit {

  blockUIStatus = false;

  monitorBlockUI: Subject<boolean> = new Subject<boolean>();

  statusLoading;

  constructor(private blockUIService: BlockUIService) { }

  ngOnInit() {
    this.blockUIService.init(this.monitorBlockUI);
    this.monitorBlockUI.subscribe((status: boolean) => {
      this.blockUIStatus = status;
      this.statusLoading = status ? 'created' : undefined;
    });
  }

}
