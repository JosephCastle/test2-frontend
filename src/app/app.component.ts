import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title: String = 'AngularCRUDApplication'
  version: String = "Version 2.1"

  constructor(private router: Router) {
  }

  HomeClick() {
    this.router.navigate(['Home']);
  }
}
