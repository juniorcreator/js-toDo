function ToDo() {
  this.list = [
    {id: 0, name: 'do smth..', isDone: false, isselected: false},
    {id: 1, name: 'do smth2..', isDone: false, isselected: false},
  ];
  this.doom = {
    table: document.getElementById('table'),
    tbody: document.querySelector('.table tbody'),
    btnEdit: document.querySelectorAll('.edit'),
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

      td.appendChild(label);
      td.appendChild(input);

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
  this.edit = function()  {
    this.parentElement.parentElement.classList.add('edit');
    let input = this.parentElement.parentElement.children[1].children[1];
    let label = this.parentElement.parentElement.children[1].children[0].textContent;
    input.value = label;
  };
  this.save = (e) => {
    e.target.parentElement.parentElement.classList.remove('edit');
    let input = e.target.parentElement.parentElement.children[1].children[1];
    let label = e.target.parentElement.parentElement.children[1].children[0];
    let id = +e.target.parentElement.parentElement.dataset.index;
    let index = this.list.findIndex((item) => item.id === id);
    this.list[index].name = input.value;
    this.doom.tbody.innerHTML = '';
    this.renderMethod();
  };
  this.delete = (e) => {
    let id = +e.target.parentElement.parentElement.dataset.index;
    let index = this.list.findIndex((item) => item.id === id);
    this.list.splice(index, 1);
    this.doom.tbody.innerHTML = '';
    this.renderMethod();
  };
  this.removeFromArray = () => {

  };
  this.init = () => {
    this.renderMethod();
  }
}

let toDo = new ToDo();
toDo.init();

let test =  () => {
  let btnedit = document.querySelectorAll('.edit');

  for (let i = 0; i< btnedit.length; i++) {
    btnedit[0].addEventListener('click', function (e) {
       console.log(e.target);
     })
  }

  // console.log(btnedit[0]);
};
// test();