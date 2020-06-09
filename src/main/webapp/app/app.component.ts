import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, untilDestroyed } from '@core';
import { I18nService } from '@app/i18n';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { StartUpAlertHomeComponent } from '@modules/start-up-alert/components/start-up-alert-home/start-up-alert-home.component';
import { StaticValueService } from '@shared/util/static-value.service';

const log = new Logger('App');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  showSidenav = true;
  private _mobileQueryListener: () => void;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private translateService: TranslateService,
    private i18nService: I18nService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public dialog: MatDialog
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  onSideNaveChange(event: any): void {
    this.showSidenav = event;
  }

  ngOnInit() {
    // Start Up Dialog
    if (
      localStorage.getItem(StaticValueService.LOCAL_STORAGE_STARTUP_LAW) !==
      StaticValueService.LOCAL_STORAGE_STARTUP_LAW_ACCEPT
    ) {
      const dialogRef = this.dialog.open(StartUpAlertHomeComponent, {
        width: 'auto',
        disableClose: true,
      });

      dialogRef.afterClosed();
    }

    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }
    /* this.i18nService.language = environment.defaultLanguage;*/
    /* console.log( environment.defaultLanguage);*/

    // Setup translations
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);
    this.setLanguage(environment.defaultLanguage);

    const onNavigationEnd = this.router.events.pipe(filter((event) => event instanceof NavigationEnd));

    // Change page title on navigation or language change, based on route data
    merge(this.translateService.onLangChange, onNavigationEnd)
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        switchMap((route) => route.data),
        untilDestroyed(this)
      )
      .subscribe((event) => {
        const title = event.title;
        if (title) {
          this.titleService.setTitle(this.translateService.instant(title));
        }
      });
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  ngOnDestroy() {
    this.i18nService.destroy();
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
