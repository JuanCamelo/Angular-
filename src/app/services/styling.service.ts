import { Injectable } from '@angular/core';
import { Theme } from '../models/theme';

@Injectable({
  providedIn: 'root'
})
export class StylingService {

  constructor() { }

  setLabelColorStyle(el: HTMLElement, theme: Theme) {
    if (el) {
      el.style.color = theme.assets.labelColor;
      el.querySelectorAll('span.dx-field-item-label-text').forEach(iEl => {
        (iEl as HTMLElement).style.color = theme.assets.labelColor;
      });
    }
  }

  setGridHeaderColorStyle(el: HTMLElement, theme: Theme) {
    if (el) {
      el.style.backgroundColor = theme.assets.gridHeaderColor;
      el.querySelectorAll('.dx-datagrid-headers .dx-datagrid-table .dx-row > td[role=columnheader]').forEach(iEl => {
        (iEl as HTMLElement).style.backgroundColor = theme.assets.gridHeaderColor;
      });
    }
  }

  setGridHeaderTextColorStyle(el: HTMLElement, theme: Theme) {
    if (el) {
      el.style.color = theme.assets.gridHeaderTextColor;
      el.querySelectorAll('.dx-datagrid-headers .dx-datagrid-table .dx-row > td[role=columnheader]').forEach(iEl => {
        (iEl as HTMLElement).style.color = theme.assets.gridHeaderTextColor;
      });
    }
  }

  setTabSubTitleColorStyle(el: HTMLElement, theme: Theme) {
    if (el) {
      el.style.color = theme.assets.subTitleColor;
      document.querySelectorAll('ul.nav-tabs').forEach(iEl => {
        (iEl as HTMLElement).style.backgroundColor = theme.assets.primaryColor;
      });
      document.querySelectorAll('a.nav-link').forEach(iEl => {
        (iEl as HTMLElement).style.color = theme.assets.subTitleColor;
        (iEl as HTMLElement).style.backgroundColor = theme.assets.primaryColor;
      });
      document.querySelectorAll('a.nav-link i').forEach(iEl => {
        (iEl as HTMLElement).style.color = theme.assets.subTitleColor;
        (iEl as HTMLElement).style.backgroundColor = theme.assets.primaryColor;
      });
      document.querySelectorAll('.nav-tabs .nav-item a.nav-link.active').forEach(iEl => {
        (iEl as HTMLElement).style.borderBottomColor = theme.assets.secundaryColor;
      });
    }
  }

  setSubTitleColorStyle(el: HTMLElement, theme: Theme) {
    if (el) {
      el.style.color = theme.assets.subTitleColor;
      el.querySelectorAll('span.dx-tab-text').forEach(iEl => {
        (iEl as HTMLElement).style.color = theme.assets.subTitleColor;
      });
      el.querySelectorAll('span.dx-form-group-caption').forEach(iEl => {
        (iEl as HTMLElement).style.color = theme.assets.subTitleColor;
      });
      document.querySelectorAll('p.title-category').forEach(iEl => {
        (iEl as HTMLElement).style.color = theme.assets.subTitleColor;
      });
    }
  }

  setTitleColorStyle(el: HTMLElement, theme: Theme) {
    if (el) {
      el.style.backgroundColor = theme.assets.titleColor;
      el.querySelectorAll('.card-header').forEach(iEl => {
        (iEl as HTMLElement).style.backgroundColor = theme.assets.titleColor;
      });
      document.querySelectorAll('div.dx-popup-title').forEach(iEl => {
        (iEl as HTMLElement).style.backgroundColor = theme.assets.titleColor;
      });
    }
  }

  setTitleTextColorStyle(el: HTMLElement, theme: Theme) {
    if (el) {
      el.style.color = theme.assets.titleTextColor;
      document.querySelectorAll('div.dx-popup-title').forEach(iEl => {
        (iEl as HTMLElement).style.color = theme.assets.titleTextColor;
      });
      document.querySelectorAll('div.dx-popup-title i').forEach(iEl => {
        (iEl as HTMLElement).style.color = theme.assets.titleTextColor;
      });
      el.querySelectorAll('.card-header button').forEach(iEl => {
        (iEl as HTMLElement).classList.remove('btn-link');
        (iEl as HTMLElement).style.color = theme.assets.titleTextColor;
      });
    }
  }

  setPrimaryButtonColorStyle(el: HTMLElement, theme: Theme) {
    if (el) {
      document.querySelectorAll('.dx-button.primary-button-color').forEach(iEl => {
        (iEl as HTMLElement).style.backgroundColor = theme.assets.primaryButtonColor;
      });
    }
  }

  setPrimaryButtonTextColorStyle(el: HTMLElement, theme: Theme) {
    if (el) {
      document.querySelectorAll('.dx-button.primary-button-color').forEach(iEl => {
        (iEl as HTMLElement).style.color = theme.assets.primaryButtonTextColor;
      });
    }
  }

  setPrimaryColorStyle(el: HTMLElement, theme: Theme) {
    if (el) {
      el.style.backgroundColor = theme.assets.primaryColor;
    }
  }

  setPrimaryTextColorStyle(el: HTMLElement, theme: Theme) {
    if (el) {
      el.style.color = theme.assets.primaryTextColor;
      el.querySelectorAll('i').forEach(iEl => {
        iEl.style.color = theme.assets.primaryTextColor;
      });
    }
  }

  setSecundaryColorStyle(el: HTMLElement, theme: Theme) {
    if (el) {
      el.style.backgroundColor = theme.assets.secundaryColor;
    }
  }

  setSecundaryTextColorStyle(el: HTMLElement, theme: Theme) {
    if (el) {
      el.style.color = theme.assets.secundaryTextColor;
      el.querySelectorAll('i').forEach(iEl => {
        iEl.style.color = theme.assets.secundaryTextColor;
      });
    }
  }

  setSecundaryButtonColorStyle(el: HTMLElement, theme: Theme) {
    if (el) {
      document.querySelectorAll('.dx-button.secundary-button-color').forEach(iEl => {
        (iEl as HTMLElement).style.backgroundColor = theme.assets.secundaryButtonColor;
      });
    }
  }

  setSecundaryButtonTextColorStyle(el: HTMLElement, theme: Theme) {
    if (el) {
      document.querySelectorAll('.dx-button.secundary-button-color').forEach(iEl => {
        (iEl as HTMLElement).style.color = theme.assets.secundaryButtonTextColor;
      });
    }
  }

  setToolBarColors(el: HTMLElement, theme: Theme) {
    if (el) {
      // Toolbar normal
      document.querySelectorAll('.optb-main-content').forEach(iEl => {
        (iEl as HTMLElement).style.backgroundColor = theme.assets.toolBarColor;
        (iEl as HTMLElement).style.color = theme.assets.toolBarTextColor;
      });
      document.querySelectorAll('.optb-group-content').forEach(iEl => {
        (iEl as HTMLElement).style.borderColor = theme.assets.toolBarTextColor;
      });
      // Toolbar de renderizador de tareas
      document.querySelectorAll('.bpm-task-displayer-top').forEach(iEl => {
        (iEl as HTMLElement).style.backgroundColor = theme.assets.toolBarColor;
        (iEl as HTMLElement).style.color = theme.assets.toolBarTextColor;
        (iEl as HTMLElement).style.borderColor = theme.assets.toolBarTextColor;
      });
      document.querySelectorAll('.bpm-task-displayer-title-left').forEach(iEl => {
        (iEl as HTMLElement).style.borderColor = theme.assets.toolBarTextColor;
      });
      document.querySelectorAll('.bpm-task-displayer-buttonToolbar').forEach(iEl => {
        (iEl as HTMLElement).style.backgroundColor = theme.assets.toolBarColor;
      });
      document.querySelectorAll('.bpm-task-displayer-dxButton').forEach(iEl => {
        (iEl as HTMLElement).style.backgroundColor = theme.assets.toolBarTextColor;
        (iEl as HTMLElement).style.borderColor = theme.assets.toolBarColor;
        (iEl as HTMLElement).style.color = theme.assets.toolBarColor;
      });
      document.querySelectorAll('.bpm-task-displayer-dxButton > .dx-button-content > .dx-icon').forEach(iEl => {
        (iEl as HTMLElement).style.color = theme.assets.toolBarColor;
      });
    }
  }
}