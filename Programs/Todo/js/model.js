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
        while(true){
            let flag = true;

            for(let i=0; i<this.todos.length;++i){
                flag = true;
                if(this.ID == this.todos[i].ID){
                    this.ID++;
                    flag = false;
                    break;
                }
            }

            if(flag){
                break;
            }
        }
        const newToDo={title: Title, ID: this.ID, isDone: false};
        this.todos.push(newToDo);
        this.ID=this.todos.length;
        console.table(this.todos);

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

        let data = ``;
        for(let i=0; i<this.todos.length; ++i){
            data += `${this.todos[i].title},${this.todos[i].ID},${this.todos[i].isDone}`;
            if(i != this.todos.length - 1){
                data += `-`;
            }
        }
        if(data == ``){
            data = 'null';
        }
        localStorage.setItem(0, data);

        this.ViewConnection(this.filterTodos);
    }
    FilterChanger(Type){
        this.filterType=Type;

        this.UpdateList(this.filterType);
    }
    LoadTodo(Title, IsDone){
        let flag = (IsDone.toLowerCase() === 'true');
        const newToDo={title: Title, ID: this.ID, isDone: flag};
        this.todos.push(newToDo);
        this.ID=this.todos.length;
    }
    LoadLocalStorage(){
        let data = localStorage[0];
        if(data != undefined && data != 'null'){
            data = data.split('-');

            for(let i=0 ; i<data.length ; ++i){
                let items = data[i].split(',');
                let newTodo = {title: items[0], ID: Number(items[1]), isDone: (items[2] === 'true')};
                this.todos.push(newTodo);
            }
        }
    }
    async Download(){
        let adderss = `/download/:${localStorage[0]}`;
        await fetch(adderss, {
            method: 'POST',
        });
    }
    SignOut(){
        localStorage.clear();
    }
}