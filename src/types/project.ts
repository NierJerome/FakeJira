// TODO 把所有ID都改为number类型

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
  kanbanId: number;
  typeId: number;
  note: string;
}
