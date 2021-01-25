// Encapsula los atributos de un conjunto de opciones en el menú
export interface ItemMenu {
  id: number;
  name: string;
  text: string;
  groups: ItemMenuGroup[];
}

// Encapsula los atributos de un conjunto de opciones en el menú
export interface ItemMenuGroup {
  id: number;
  name: string;
  text: string;
  items: ItemMenuOption[];
}

// Encapsula los atributos de una opción en el menú
export interface ItemMenuOption {
  id: number;
  name: string;
  text: string;
  icon: string;
  tooltip: string;
  shortcut?: string;
}
