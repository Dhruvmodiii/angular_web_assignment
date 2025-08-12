import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="nav">
      <a routerLink="" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Home</a>
      <a routerLink="api-data" routerLinkActive="active">API Data</a>
      <a routerLink="form" routerLinkActive="active">Form</a>
    </nav>
  `,
  styles: [`
    .nav { display:flex; gap:1rem; padding:1rem; background:#111; }
    a { color:#ddd; text-decoration:none; }
    .active { color:#fff; border-bottom:2px solid #8ecae6; }
  `]
})
export class NavbarComponent {}
