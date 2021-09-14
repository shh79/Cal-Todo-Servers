let fs = require('fs');
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
    LoadTodo(Title, IsDone){
        const newToDo={title: Title, ID: this.ID, isDone: Boolean(IsDone)};
        this.todos.push(newToDo);
        this.ID=this.todos.length;
    }
    UploadTodo(){
        this.filterType='All';
        this.ID=0;
        this.todos=[];
        this.filterTodos=[];

        let data='';
        fs.readFile("../Database/DB.txt", (err, Data) => {
            if(err) throw err;

            data = Data;
            console.log("Todos uploaded successfully");
        });
        data = data.spilit('-');
        for(let i=0; i<data.length; ++i){
            this.LoadTodo(data.spilit(',')[0], data.spilit(',')[1]);
        }

        this.UpdateList(this.filterType);
    }
    DownloadTodo(){
        this.filterType = 'All';
        this.UpdateList(this.filterType);
        let result='';

        for(let i=0; i<this.todos.length; ++i){
            result+=`${this.todos[i].title},${this.todos[i].isDone}`;
            if(this.todos.length-1 != i){
                result+='-';
            }
        }

        fs.appendFile("../Database/DB.txt", result, (err) => {
            if(err) throw err;

            console.log("Todos downloaded to database successfully");
        })
    }
}