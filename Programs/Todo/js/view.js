class view{
    constructor(){
        this.List=document.querySelector(".DoList");
        this.TodoTitle=document.querySelector("#DoTitle");
        this.ServerSection = document.querySelector(".server");
    }
    GetTitle(){
        return this.TodoTitle.value;
    }
    ClearTilteBar(){
        this.TodoTitle.value="";
    }
    ShowTodos(todos){
        this.List.innerHTML=``;

        for(let i=todos.length-1;i>=0;--i){
            let type=(todos[i].isDone)? 'Completed' : 'Active';
            let BTNTitle =(todos[i].isDone)? 'ReDo' : 'Done';
            let newTodo = `
            <div class="DoItem ${type}">
                <p>${todos[i].title}</p>
                <div class="ButtonOfItems">
                    <button class="RemoveBTN">Remove</button>
                    <button>Edit</button>
                    <button>${BTNTitle}</button>
                </div>
                <div class="IDKeeper">${todos[i].ID}</div>
            </div>
            `;
            this.List.innerHTML += newTodo;
        }
    }
    FilterButtonsEventer(Connection){
        let Filters=document.querySelector(".filters");
        Filters=Filters.querySelectorAll("button");
        
        for(let i=0; i<Filters.length; ++i){
            Filters[i].addEventListener('click', event => {

                for(let j=0;j<Filters.length;++j){
                    Filters[j].classList.remove("active");
                }
                
                event.target.classList.add("active");
    
                let type=event.target.innerText;
                Connection(type);
            });
        }

    }
    SubmitTodo(Connection){
        let SubmitBTN = document.querySelector("#SubmitBTN");
        SubmitBTN.addEventListener('click', event => {
            if(this.GetTitle()){
                Connection(this.GetTitle());
                this.ClearTilteBar();
            }
            else{
                alert("Please fill the blank !!!");
            }
        });
    }
    RemoveTodo(Connection){
        this.List.addEventListener('click', event => {
            if(event.target.innerText=="Remove"){
                let ID=Number(event.target.parentElement.parentElement.querySelector(".IDKeeper").innerText);
                Connection(ID);
            }
        });
    }
    EditTodo(Connection){
        this.List.addEventListener('click', event => {
            if(event.target.innerText=="Edit"){

                let textBox=document.getElementById("EditTitle");
                textBox.disabled=false;
                document.getElementById("YesBTN").setAttribute("disabled","false");
                document.getElementById("NoBTN").setAttribute("disabled","false");
                textBox.value = event.target.parentElement.parentElement.querySelector('p').innerText;
                document.getElementById("editID").innerText = event.target.parentElement.parentElement.querySelector(".IDKeeper").innerText;
                
                // document.getElementById("YesBTN").disabled=false;
                // document.getElementById("NoBTN").disabled=false;
                

            }
        });

        let section=document.querySelector(".EditBTNs");

        section.addEventListener('click', event => {
            
            if(event.target.parentElement.id=="NoBTN"){
                document.getElementById("EditTitle").value="";
                document.getElementById("EditTitle").setAttribute("disabled","true");
                document.getElementById("YesBTN").setAttribute("disabled","true");
                document.getElementById("NoBTN").setAttribute("disabled","true");
            }

            if(event.target.parentElement.id=="YesBTN"){
                let NewTitle=document.getElementById("EditTitle").value;
                let ID=Number(document.getElementById("editID").innerText);

                document.getElementById("EditTitle").value="";
                document.getElementById("EditTitle").setAttribute("disabled","true");
                document.getElementById("YesBTN").setAttribute("disabled","true");
                document.getElementById("NoBTN").setAttribute("disabled","true");

                if(NewTitle != ""){
                    if(ID>=0){
                        Connection(ID,NewTitle);
                    }
                }
                else{
                    alert("Please fill the blank !!!");
                }
            }
        });

    }
    DoneTodo(Connection){
        this.List.addEventListener('click', event => {

            let Items=document.querySelectorAll(".IDKeeper");

            if(event.target.innerText=="Done"){
                let ID=Number(event.target.parentElement.parentElement.querySelector(".IDKeeper").innerText);
                
                for(let i=0;i<Items.length;++i){
                    if(Items[i].innerText==ID){
                        Items[i].parentElement.querySelector(".ButtonOfItems").childNodes[5].innerText="ReDo";
                    }
                }
                event.target.classList.add("active");
                Connection(ID);
            }
            else if(event.target.innerText=="ReDo"){
                let ID=Number(event.target.parentElement.parentElement.querySelector(".IDKeeper").innerText);
                event.target.innerText="Done";
                event.target.classList.remove("active");
                Connection(ID);
            }
        });
    }
    Download(Connection){
        this.ServerSection.addEventListener("click", event => {
            let flag = document.querySelector("#hint").classList.contains("hidden");
            if(flag){
                if(event.target.innerText=="Download"){
                    let isConfirm = confirm("Are you sure for download todos to your database?");
                    if(isConfirm){
                        Connection();
                    }
                }
            }
            else{
                alert("You are a guest and you can't to upload and download on database.");
            }
        });
    }
    SignOut(Connection){
        document.querySelector("#signoutBtn").addEventListener('click', (event) => {
            let isConfirm = confirm("Are you sure for signout?");
            if(isConfirm){
                event.target.href = "/Login/";
                Connection();
            }
            else{
                event.target.href = "";
            }
        });
    }
    SignInUpBtn(Connection){
        document.querySelector(".gotoLogin").addEventListener('click', (event) => {
            event.target.href = "/Login/";
            Connection();
        });
    }
}