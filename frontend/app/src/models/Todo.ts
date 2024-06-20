export class Todo {
  id: number | undefined;
  title: string = '';
  completed: boolean = false;

  constructor(initializer?: any) {
    if(!initializer) return;
    if(initializer.id) this.id = initializer.id;
    if(initializer.title) this.title = initializer.title;
    if(initializer.completed) this.completed = initializer.completed;
  }
}
