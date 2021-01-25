import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
import { ConfigService } from 'src/app/services/config.service';
import { SSBService } from 'src/app/services/ssb.service';

@Component({
  selector: 'oph-redirect-external-page',
  templateUrl: './redirect-external-page.component.html',
  styleUrls: ['./redirect-external-page.component.css']
})
export class RedirectExternalPageComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService,
    private ssbService: SSBService,
    private sharedService: SharedService,
    private configService: ConfigService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(async (params) => {
      this.sharedService.showLoader(true);
      if (!this.configService.config || !this.configService.config.urlRedirectLogin)
        await this.configService.getAppConfig();
      if (!params.token) {
        if (!this.sessionService.session) {
          this.redirectLogin();
        } else {
          this.router.navigate(['/examen-fisico']);
        }
      }
      debugger
      this.ssbService.validateToken(params.token).subscribe(response => {
        try {
          this.sharedService.showLoader(false);
          if (response.isSuccessful) {
            this.sessionService.session = response.result;
            this.saveRegistroMedico(params.registroMedicoId)
            this.router.navigate(['/examen-fisico']);
          } else if (response.isError) {
            this.sharedService.error(response.errorMessage);
            this.redirectLogin();
          } else {
            this.sharedService.warning(response.messages.join('\n'));
            this.redirectLogin();
          }
        } catch (error) {
          this.redirectLogin();
        }
      });
    });
  }

  saveRegistroMedico(registroMedicoId: string) {
    if (!registroMedicoId)
      this.sharedService.warning('No existe id de registro medico');
    this.sessionService.registroMedicoId = registroMedicoId || 'idNull'
  }

  redirectLogin() {
    this.sessionService.clean();
  }

}
