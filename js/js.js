function ToDo() {
  this.doom = {
    table: document.getElementById('table'),
    tbody: document.querySelector('.table tbody'),
    btnEdit: document.querySelectorAll('.edit'),
    addInput: document.getElementById('add'),
    addBtn: document.getElementById('add-btn'),
    doneCount: document.getElementById('done-count'),
  };
  this.renderMethod = () => {
    this.getLocal().forEach((item, index) => {
      let tr = document.createElement('tr');
      let th = document.createElement('th');
      let td = document.createElement('td');
      let td2 = document.createElement('td');
      let td3 = document.createElement('td');
      let btnDel = document.createElement('button');
      let btnEdit = document.createElement('button');
      let btnSave = document.createElement('button');
      let label = document.createElement('label');
      let input = document.createElement('input');

      th.setAttribute('scope', 'row');
      th.textContent = index + 1;
      label.textContent = item.name;
      input.setAttribute('type', 'text');
      btnEdit.classList = 'btn btn-dark my-1 my-sm-0 edit';
      btnEdit.textContent = 'Edit';
      btnDel.classList = 'btn btn-dark my-1 my-sm-0 remove';
      btnDel.textContent = 'Delete';
      btnSave.textContent = 'Save';
      btnSave.classList = 'btn btn-dark my-1 my-sm-0 save';

      btnEdit.addEventListener('click', this.edit);
      btnSave.addEventListener('click', this.save);
      btnDel.addEventListener('click', this.delete);
      label.addEventListener('click', this.select);

      td.appendChild(label);
      td.appendChild(input);

      item.isselected ? td.classList.add('done') : '';

      td2.appendChild(btnEdit);
      td2.appendChild(btnSave);
      td3.appendChild(btnDel);

      tr.setAttribute('data-index', item.id);
      tr.appendChild(th);
      tr.appendChild(td);
      tr.appendChild(td2);
      tr.appendChild(td3);

      this.doom.tbody.appendChild(tr);
    });
  };
  this.edit = (e) =>  {
    e.target.parentElement.parentElement.classList.add('edit');
    e.target.parentElement.parentElement.children[1].classList.remove('done');
    let input = e.target.parentElement.parentElement.children[1].children[1];
    let label = e.target.parentElement.parentElement.children[1].children[0].textContent;
    input.value = label;
  };
  this.save = (e) => {
    e.target.parentElement.parentElement.classList.remove('edit');
    let input = e.target.parentElement.parentElement.children[1].children[1];
    let todo = this.getLocal();
    let id = +e.target.parentElement.parentElement.dataset.index;
    let index = todo.findIndex((item) => item.id === id);
    todo[index].name = input.value;
    todo[index].isselected = false;
    this.setLocal(todo);
    this.doom.tbody.innerHTML = '';
    this.renderMethod();
    this.doneCount();
  };
  this.delete = (e) => {
    let todo = this.getLocal();
    let id = +e.target.parentElement.parentElement.dataset.index;
    let index = todo.findIndex((item) => item.id === id);
    todo.splice(index, 1);
    this.doom.tbody.innerHTML = '';
    this.setLocal(todo);
    this.renderMethod();
    this.doneCount();
  };
  this.create = () => {
    const create = (e) => {
      e.preventDefault();
      let todos = this.getLocal();
      todos.push({id: Math.random(), name: this.doom.addInput.value, isDone: false, isselected: false});
      this.doom.tbody.innerHTML = '';
      this.doom.addInput.value = '';
      this.setLocal(todos);
      this.renderMethod();
    };
    this.doom.addBtn.addEventListener('click', create);
    this.doom.addBtn.addEventListener('keypress', (e) => {e.keyCode === 13 ? create() : null});
  };
  this.doneCount = () => {
    let t = 0;
        this.getLocal().forEach(i => {
          i.isselected ? t++ : t += 0;
        });
    this.doom.doneCount.textContent = t;
  };
  this.select = (e) => {
    let todo = this.getLocal();
    let id = +e.target.parentElement.parentElement.dataset.index;
    let index = todo.findIndex((item) => item.id === id);
    todo[index].isselected = !todo[index].isselected;
    this.doom.tbody.innerHTML = '';
    this.setLocal(todo);
    this.renderMethod();
    this.doneCount();
  };
  this.setLocal = (obg) => {
      localStorage.setItem('todo', JSON.stringify(obg))
    console.log(obg);
  };
  this.getLocal =() => {
    return JSON.parse(localStorage.getItem('todo'));
  };
  this.initLocal =() => {
    console.log('initLocal');
    if (!localStorage.getItem('todo')) {
      localStorage.setItem('todo', JSON.stringify([
        {id: 0, name: 'do smth..', isDone: false, isselected: false},
        {id: 1, name: 'do smth2..', isDone: false, isselected: false},
      ]));
    }
  };
  this.init = () => {
    this.create();
    this.initLocal();
    this.renderMethod();
    this.doneCount();
  }
}

let toDo = new ToDo();
toDo.init();
