import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showMenu = true;
  @Output() sidenavChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  ngOnInit() {}

  toggleSidenav() {
    this.showMenu = !this.showMenu;
    this.sidenavChange.emit(this.showMenu);
  }

  logout() {
    //this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get username(): string | null {
    /*  const credentials = this.credentialsService.credentials;
    return credentials ? credentials.username : null;*/
    return 'user';
  }
}
