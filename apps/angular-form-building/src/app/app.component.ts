import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  styles: `h1{text-align: center}`,
  template: `<h1>Welcome to Angular Form Building Demo App</h1>
    <router-outlet></router-outlet>`,
})
export class AppComponent {
  title = 'Angular Form Building';
}
