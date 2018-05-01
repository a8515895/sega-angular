/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
interface JQuery {
  confirm(options?: any, callback?: Function) : any;
}
