import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
item: FirebaseObjectObservable<any[]>;
  constructor(af: AngularFire) {
    this.item = af.database.object('/items/description');

    this.item.subscribe(x => console.log(x));
  }
}
