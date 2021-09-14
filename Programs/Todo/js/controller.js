class controller{
    constructor(model,view,file){
        this.model=model;
        this.view=view;
        this.file=file;

        this.model.ListConnection(this.UpdateListConnection);
        this.view.FilterButtonsEventer(this.FilterConnection);
        this.view.SubmitTodo(this.SubmitConnection);
        this.view.RemoveTodo(this.RemoveConnection);
        this.view.EditTodo(this.EditConnection);
        this.view.DoneTodo(this.DoneConnection);
        this.view.UploadTodo(this.UploadConnection);
        this.view.DownloadTodo(this.DownloadConnection);

        this.UpdateListConnection(this.model.todos);
    }

    UpdateListConnection = todos => {
        this.view.ShowTodos(todos);
    }

    FilterConnection = type => {
        this.model.FilterChanger(type);
    }

    SubmitConnection = Title => {
        this.model.AddTodo(Title);
    }

    EditConnection = (ID, NewTitle) => {
        this.model.EditTodo(ID,NewTitle);
    }

    RemoveConnection = ID => {
        this.model.RemoveTodo(ID);
    }

    DoneConnection = ID => {
        this.model.DoneToDo(ID);
    }

    UploadConnection = () => {
        this.model.UploadTodo(file.ReadDB);
    }
    DownloadConnection = () => {
        this.model.DownloadTodo(file.WriteDB);
    }
}