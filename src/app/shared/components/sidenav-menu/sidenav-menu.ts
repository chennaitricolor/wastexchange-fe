export interface Menu {
  id: number;
  link: string;
  name: string;
  parentId: number;
  children?: Menu[];
  icon: string;
  expanded?: boolean;
  authorizedPersona?: string[];
}
