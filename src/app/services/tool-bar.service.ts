import { Injectable } from '@angular/core';
import { ItemMenu } from '../models/tool-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ToolBarService {

  constructor(private translateService: TranslateService) { }

  public getToobarMenu(): ItemMenu[] {

    const datasourceMenu: ItemMenu[] = [];
    // Primera pestaña de opciones
    datasourceMenu.push(
      {
        id: 1,
        name: 'MnuBeginOptions',
        text: this.translateService.instant('toolbar.menu.start'),
        groups: []
      }
    );
    datasourceMenu[datasourceMenu.length - 1].groups.push(
      {
        id: 10,
        name: 'MnuFileGroup',
        text: this.translateService.instant('toolbar.submenu.main'),
        items: []
      }
    );
    datasourceMenu[datasourceMenu.length - 1].groups[datasourceMenu[datasourceMenu.length - 1].groups.length - 1].items.push(
      {
        id: 100,
        name: 'MnuNewDiagramItem',
        text: this.translateService.instant('toolbar.submenu.main.new'),
        tooltip: this.translateService.instant('toolbar.submenu.main.new'),
        icon: 'far fa-file',
        shortcut: 'Ctrl+Shift+F2'
      }
    );
    datasourceMenu[datasourceMenu.length - 1].groups[datasourceMenu[datasourceMenu.length - 1].groups.length - 1].items.push(
      {
        id: 101,
        name: 'MnuOpenDiagramItem',
        text: this.translateService.instant('toolbar.submenu.main.open'),
        tooltip: this.translateService.instant('toolbar.submenu.main.open'),
        icon: 'far fa-folder-open',
        shortcut: 'Ctrl+Shift+F3'
      }
    );
    datasourceMenu[datasourceMenu.length - 1].groups[datasourceMenu[datasourceMenu.length - 1].groups.length - 1].items.push(
      {
        id: 102,
        name: 'MnuSaveDiagramItem',
        text: this.translateService.instant('toolbar.submenu.main.save'),
        tooltip: this.translateService.instant('toolbar.submenu.main.save'),
        icon: 'far fa-save',
        shortcut: 'Ctrl+Shift+F4'
      }
    );
    datasourceMenu[datasourceMenu.length - 1].groups.push(
      {
        id: 11,
        name: 'MnuZoomGroup',
        text: this.translateService.instant('toolbar.submenu.zoom'),
        items: []
      }
    );
    datasourceMenu[datasourceMenu.length - 1].groups[datasourceMenu[datasourceMenu.length - 1].groups.length - 1].items.push(
      {
        id: 110,
        name: 'MnuFullscreenItem',
        text: this.translateService.instant('toolbar.submenu.zoom.fullscreen'),
        tooltip: this.translateService.instant('toolbar.submenu.zoom.fullscreen'),
        icon: 'fas fa-expand-arrows-alt',
        shortcut: 'Ctrl+Shift+F'
      }
    );
    datasourceMenu[datasourceMenu.length - 1].groups[datasourceMenu[datasourceMenu.length - 1].groups.length - 1].items.push(
      {
        id: 111,
        name: 'MnuResetZoomItem',
        text: this.translateService.instant('toolbar.submenu.zoom.reset'),
        tooltip: this.translateService.instant('toolbar.submenu.zoom.reset'),
        icon: 'fas fa-crosshairs',
        shortcut: 'Ctrl+0'
      }
    );
    datasourceMenu[datasourceMenu.length - 1].groups[datasourceMenu[datasourceMenu.length - 1].groups.length - 1].items.push(
      {
        id: 112,
        name: 'MnuZoomInItem',
        text: this.translateService.instant('toolbar.submenu.zoom.zoomIn'),
        tooltip: this.translateService.instant('toolbar.submenu.zoom.zoomIn'),
        icon: 'fas fa-search-plus',
        shortcut: 'Ctrl+Alt+1'
      }
    );
    datasourceMenu[datasourceMenu.length - 1].groups[datasourceMenu[datasourceMenu.length - 1].groups.length - 1].items.push(
      {
        id: 113,
        name: 'MnuZoomOutItem',
        text: this.translateService.instant('toolbar.submenu.zoom.zoomOut'),
        tooltip: this.translateService.instant('toolbar.submenu.zoom.zoomOut'),
        icon: 'fas fa-search-minus',
        shortcut: 'Ctrl+Shift+1'
      }
    );
    datasourceMenu[datasourceMenu.length - 1].groups.push(
      {
        id: 12,
        name: 'MnuEditGroup',
        text: this.translateService.instant('toolbar.submenu.edit'),
        items: []
      }
    );
    datasourceMenu[datasourceMenu.length - 1].groups[datasourceMenu[datasourceMenu.length - 1].groups.length - 1].items.push(
      {
        id: 120,
        name: 'MnuShowPropertiesPanelItem',
        text: this.translateService.instant('toolbar.submenu.edit.properties'),
        tooltip: this.translateService.instant('toolbar.submenu.edit.properties'),
        icon: 'fas fa-cog',
        shortcut: 'Ctrl+Shift+P'
      }
    );
    // Segunda pestaña de opciones
    datasourceMenu.push(
      {
        id: 2,
        name: 'MnuExport',
        text: this.translateService.instant('toolbar.menu.export'),
        groups: []
      }
    );
    datasourceMenu[datasourceMenu.length - 1].groups.push(
      {
        id: 20,
        name: 'MnuExportGroup',
        text: this.translateService.instant('toolbar.submenu.export'),
        items: []
      }
    );
    datasourceMenu[datasourceMenu.length - 1].groups[datasourceMenu[datasourceMenu.length - 1].groups.length - 1].items.push(
      {
        id: 200,
        name: 'MnuSaveAsBPMNDiagramItem',
        text: this.translateService.instant('toolbar.submenu.export.bpmn'),
        tooltip: this.translateService.instant('toolbar.submenu.export.bpmn'),
        icon: 'far fa-file-code',
        shortcut: 'Ctrl+Alt+F4'
      }
    );
    datasourceMenu[datasourceMenu.length - 1].groups[datasourceMenu[datasourceMenu.length - 1].groups.length - 1].items.push(
      {
        id: 201,
        name: 'MnuSaveAsImageDiagramItem',
        text: this.translateService.instant('toolbar.submenu.export.image'),
        tooltip: this.translateService.instant('toolbar.submenu.export.image'),
        icon: 'far fa-file-image',
        shortcut: 'Ctrl+Alt+F5'
      }
    );
    datasourceMenu[datasourceMenu.length - 1].groups.push(
      {
        id: 21,
        name: 'MnuImportGroup',
        text: this.translateService.instant('toolbar.submenu.import'),
        items: []
      }
    );
    datasourceMenu[datasourceMenu.length - 1].groups[datasourceMenu[datasourceMenu.length - 1].groups.length - 1].items.push(
      {
        id: 210,
        name: 'MnuOpenBPMNDiagramItem',
        text: this.translateService.instant('toolbar.submenu.import.bpmn'),
        tooltip: this.translateService.instant('toolbar.submenu.import.bpmn'),
        icon: 'far fa-file-code',
        shortcut: 'Ctrl+Alt+F6'
      }
    );
    // Tercera pestaña de opciones
    datasourceMenu.push(
      {
        id: 3,
        name: 'MnuHelp',
        text: this.translateService.instant('toolbar.menu.help'),
        groups: []
      }
    );
    datasourceMenu[datasourceMenu.length - 1].groups.push(
      {
        id: 30,
        name: 'MnuSuportGroup',
        text: this.translateService.instant('toolbar.submenu.suport'),
        items: []
      }
    );
    datasourceMenu[datasourceMenu.length - 1].groups[datasourceMenu[datasourceMenu.length - 1].groups.length - 1].items.push(
      {
        id: 300,
        name: 'MnuForumItem',
        text: this.translateService.instant('toolbar.submenu.suport.forum'),
        tooltip: this.translateService.instant('toolbar.submenu.suport.forum'),
        icon: 'far fa-comments',
        shortcut: 'Ctrl+Alt+F7'
      }
    );
    datasourceMenu[datasourceMenu.length - 1].groups.push(
      {
        id: 31,
        name: 'MnuAboutGroup',
        text: this.translateService.instant('toolbar.submenu.about'),
        items: []
      }
    );
    datasourceMenu[datasourceMenu.length - 1].groups[datasourceMenu[datasourceMenu.length - 1].groups.length - 1].items.push(
      {
        id: 310,
        name: 'MnuVersionNotesItem',
        text: this.translateService.instant('toolbar.submenu.about.versionNotes'),
        tooltip: this.translateService.instant('toolbar.submenu.about.versionNotes'),
        icon: 'far fa-sticky-note',
        shortcut: 'Ctrl+Alt+F8'
      }
    );
    datasourceMenu[datasourceMenu.length - 1].groups[datasourceMenu[datasourceMenu.length - 1].groups.length - 1].items.push(
      {
        id: 311,
        name: 'MnuAboutItem',
        text: this.translateService.instant('toolbar.submenu.about.about'),
        tooltip: this.translateService.instant('toolbar.submenu.about.about'),
        icon: 'fas fa-question',
        shortcut: 'Ctrl+Alt+F9'
      }
    );

    return datasourceMenu;
  }
}
