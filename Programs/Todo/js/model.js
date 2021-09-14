class model{
    constructor(){
        this.filterType='All';
        this.ID=0;
        this.todos=[];
        this.filterTodos=[];
    }
    ListConnection(connection){
        this.ViewConnection=connection;
    }
    FindIndexToDoByID(ID){
        //return this.todos.indexOf(todo => todo.ID==ID);

        for(let i=0;i<this.todos.length;++i){
            if(this.todos[i].ID == ID){
                return i;
            }
        }
    }
    AddTodo(Title){
        const newToDo={title: Title, ID: this.ID, isDone: false};
        this.todos.push(newToDo);
        this.ID=this.todos.length;

        this.UpdateList(this.filterType);
    }
    EditTodo(ID,NewTitle){
        this.todos[this.FindIndexToDoByID(ID)].title=NewTitle;

        this.UpdateList(this.filterType);
    }
    RemoveTodo(ID){
        let selected = this.FindIndexToDoByID(ID);
        this.todos.splice(selected,1);

        this.UpdateList(this.filterType);
    }
    DoneToDo(ID){
        let index=this.FindIndexToDoByID(ID);
        const ToDo=this.todos[index];
        if(ToDo.isDone){
            this.todos[index].isDone=false;
        }
        else{
            this.todos[index].isDone=true;
        }

        this.UpdateList(this.filterType);
    }
    UpdateList(filterType){
        switch(filterType){
            case 'All':
                this.filterTodos=this.todos;
                break;
            case 'Active':
                this.filterTodos=this.todos.filter(todo => todo.isDone==false);
                break;
            case 'Completed':
                this.filterTodos=this.todos.filter(todo => todo.isDone==true);
                break;
        }
        this.ViewConnection(this.filterTodos);
    }
    FilterChanger(Type){
        this.filterType=Type;

        this.UpdateList(this.filterType);
    }
}