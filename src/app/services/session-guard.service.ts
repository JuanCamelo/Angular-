import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class SessionGuardService {

  constructor(
    private sessionService: SessionService,
    private configService: ConfigService
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const isLoggedIn = !!this.sessionService.session;

    if (!this.configService.config || !this.configService.config.urlRedirectLogin) {
      await this.configService.getAppConfig();
    }

    if (!isLoggedIn) {
      const regex = /(#\/index.*)|(#\/redirect-external.*)/gi;
      let url = window.location.href.replace(regex, '');
      url = `${(url.endsWith('/') ? url : `${url}/`)}#/redirect-external?token=$token`;
      window.location.href = this.configService.config.urlRedirectLogin.replace('$navigateTo', btoa(url));
      return false;
    }
    return true;
  }
}
