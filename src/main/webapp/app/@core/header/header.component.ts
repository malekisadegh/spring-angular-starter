import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showMenu = true;
  @Output() sidenavChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router, private cookieService: CookieService) {}

  ngOnInit() {}

  toggleSidenav() {
    this.showMenu = !this.showMenu;
    this.sidenavChange.emit(this.showMenu);
  }

  logout() {
    this.cookieService.delete('access_token');
    window.location.reload();
  }

  get username(): string | null {
    /*  const credentials = this.credentialsService.credentials;
    return credentials ? credentials.username : null;*/
    return 'user';
  }
}
