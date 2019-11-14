function ToDo() {
  this.list = [
    {id: 0, name: 'do smth..', isDone: false, isselected: false},
    {id: 1, name: 'do smth2..', isDone: false, isselected: false},
  ];
  this.doom = {
    table: document.getElementById('table'),
    tbody: document.querySelector('.table tbody'),
    btnEdit: document.querySelectorAll('.edit'),
    addInput: document.getElementById('add'),
    addBtn: document.getElementById('add-btn'),
    doneCount: document.getElementById('done-count'),
  };
  this.renderMethod = () => {
    console.log(this.list, 'renderMethod');

    this.list.forEach((item, index) => {
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
    let id = +e.target.parentElement.parentElement.dataset.index;
    let index = this.list.findIndex((item) => item.id === id);
    this.list[index].name = input.value;
    this.list[index].isselected = false;
    this.doom.tbody.innerHTML = '';
    this.renderMethod();
    this.doneCount();
  };
  this.delete = (e) => {
    let id = +e.target.parentElement.parentElement.dataset.index;
    let index = this.list.findIndex((item) => item.id === id);
    this.list.splice(index, 1);
    this.doom.tbody.innerHTML = '';
    this.renderMethod();
    this.doneCount();
  };
  this.create = () => {
    const create = (e) => {
      e.preventDefault();
      this.list.push({id: Math.random(), name: this.doom.addInput.value, isDone: false, isselected: false});
      this.doom.tbody.innerHTML = '';
      this.doom.addInput.value = '';
      this.renderMethod();
      console.log(this.list);
    };
    console.log(this);
    this.doom.addBtn.addEventListener('click', create);
    this.doom.addBtn.addEventListener('keypress', (e) => {e.keyCode === 13 ? create() : null});
  };
  this.doneCount = () => {
    let t = 0;
        this.list.forEach(i => {
          i.isselected ? t++ : t += 0;
        });
    this.doom.doneCount.textContent = t;
  };
  this.select = (e) => {
    let id = +e.target.parentElement.parentElement.dataset.index;
    let index = this.list.findIndex((item) => item.id === id);
    this.list[index].isselected = !this.list[index].isselected;
    this.doom.tbody.innerHTML = '';
    this.renderMethod();
    this.doneCount();
  };
  this.removeFromArray = () => {

  };
  this.init = () => {
    this.renderMethod();
    this.create();
    this.doneCount();
  }
}

let toDo = new ToDo();
toDo.init();
