import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(): void {
    const config = {
      apiKey: 'AIzaSyCCz0oZdTI4WjpD9USAkJfbW2voI_-gw_U',
      authDomain: 'curso-angular-instagram.firebaseapp.com',
      databaseURL: 'https://curso-angular-instagram.firebaseio.com',
      projectId: 'curso-angular-instagram',
      storageBucket: 'curso-angular-instagram.appspot.com',
      messagingSenderId: '618206850917'
    };
    firebase.initializeApp(config);
  }
}
