const submitBtn = document.querySelector('.submit-btn');
const clearBtn = document.querySelector('.clear-button');
const groceryList = document.querySelector('.grocery-list');
const groceryInput = document.getElementById('grocery');
const _alert = document.querySelector('.alert');
const groceryContent = document.querySelector('.grocery-content');

let editCheck=false;
let editText='';
let editId='';

window.addEventListener('DOMContentLoaded',loadStorage);
submitBtn.addEventListener('click',AddItemGrocery);

clearBtn.addEventListener('click', function(){
    localStorage.removeItem('list');
    groceryList.innerHTML="";
})

function loadStorage(){
    let list = getListStorage();
    groceryContent.classList.add('show-content');
    let string=list.map((item)=>{
        return `<article class="grocery-item" data-id="${item.id}">
                                    <p class="title">${item.value}</p>
                                        <div class="btn-container">
                                                <button type="button" class="edit-btn">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                        
                                            <button type="button" class="delete-btn">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                </article>`;
    }).join("");
    groceryList.innerHTML=string;
}
function AddItemGrocery(e){
    e.preventDefault();
    let value = groceryInput.value;
    let numb = new Date();
    let id = numb.getTime().toString();
    
    if(value!=="" && !editCheck){
        groceryContent.classList.add('show-content');
        let article = document.createElement('article');
        article.setAttribute('data-id',id);
        article.classList.add('grocery-item');
        article.innerHTML=`
                <p class="title">${value}</p>
                <div class="btn-container">
                        <button type="button" class="edit-btn">
                        <i class="fas fa-edit"></i>
                    </button>
                 
                    <button type="button" class="delete-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>`;
        groceryList.appendChild(article);
        let deleteBtn = article.querySelector('.delete-btn');
        deleteBtn.addEventListener('click',deleteGroceryList);
        let editBtn = article.querySelector('.edit-btn');
        editBtn.addEventListener('click',editGroceryList);
        getGroceryStorage(id,value);
        alertNotice('Thêm thành công.','success');
        setToDefault();
    }
    else if(editCheck && value!==""){
        editGroceryStorage(groceryInput.value);
        editText.textContent= groceryInput.value;
        alertNotice("Sửa thành công",'success');
        setToDefault();
    }
    else{
        alertNotice('Mời nhập ký tự.','danger');
    }
}

function getGroceryStorage(id,value){
    let list = localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
    list.push({id:id,value:value});
    localStorage.setItem('list', JSON.stringify(list));
}
function getListStorage(){
    return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
}
function deleteGroceryList(e){
    let id = e.target.parentElement.parentElement.dataset.id;
    let target = e.target.parentElement.parentElement;
    target.remove();
    let list = getListStorage();
    list =list.filter((item)=>{
        if(item.id!==id){
            return item;
        }
    })
    console.log(list);
    localStorage.setItem('list',JSON.stringify(list));
}

function editGroceryList(e){
    groceryInput.value=e.target.parentElement.previousElementSibling.textContent;
    editId = e.target.parentElement.parentElement.dataset.id;
    editCheck = true;
    editText = e.target.parentElement.previousElementSibling;
    console.log(editId);
    submitBtn.textContent="Edit";
}
function editGroceryStorage(value){
    let list = getListStorage();
    list.map((item)=>{
        console.log(item);
        if(item.id === editId){
            item.value = value;
           console.log('zz')
        }
        return item;
    });
    console.log(list);
    localStorage.setItem('list',JSON.stringify(list));
}
function setToDefault(){
    groceryInput.value="";
    submitBtn.textContent="Submit";
    editCheck=false;
    editText='';
    editId='';
}
function alertNotice(text,action){
    _alert.innerHTML= text;
    _alert.classList.add(`alert-${action}`);
    setTimeout(function(){
        _alert.innerHTML="";
     _alert.classList.remove(`alert-${action}`);
    },1000);
}