import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { EnumsSelfManagement } from 'src/app/enums/selfmanagement.enum';
import { RouteInfo } from 'src/app/models/RouteInfo';

@Component({
  selector: 'oph-title-breadcums',
  templateUrl: './title-breadcums.component.html',
  styleUrls: ['./title-breadcums.component.scss']
})
export class TitleBreadcumsComponent implements OnInit {

  selfmanagement = false; // Identificador de autogestión
  urlBreadCumsList: RouteInfo[] = [];
  private _routesList: RouteInfo[] = [];

  @Input() showHome = false

  @Input()
  set routesList(routesList: RouteInfo[]) {
    this.findRoute(routesList)
    this._routesList = routesList;
  }

  get routesList(): RouteInfo[] { return this._routesList; }


  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((e: any) => {
      this.findRoute(this.routesList)
    });
    this._validateSelFmanagement()
  }

  /**
   * Se encarga de leer el arbol de rutas y obtener nombres y paths
   */

  findRoute(routesList: RouteInfo[] = []) {
    let basePath: string[] = (this.router.url).substr(1).split('/');
    let tempPath: string[] = ['/']
    let urlBreadCumsList = []
    basePath.map(url => {
      tempPath = [...tempPath, url]
      const route = routesList.find(route => route.path === url.split('?')[0])
      if (!route) return;
      urlBreadCumsList = [...urlBreadCumsList, { ...route, path: tempPath ,queryParamsHandling: 'merge'  } ]
    })

    this.urlBreadCumsList = urlBreadCumsList
  }

  private _validateSelFmanagement(){
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.selfmanagement = params['selfmanagement'] === EnumsSelfManagement.TYPE_OK
      });
  }
  
}
