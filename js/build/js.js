'use strict';

function ToDo() {
  var _this = this;

  this.doom = {
    table: document.getElementById('table'),
    tbody: document.querySelector('.table tbody'),
    btnEdit: document.querySelectorAll('.edit'),
    addInput: document.getElementById('add'),
    addBtn: document.getElementById('add-btn'),
    doneCount: document.getElementById('done-count')
  };
  this.renderMethod = function () {
    _this.getLocal().forEach(function (item, index) {
      var tr = document.createElement('tr');
      var th = document.createElement('th');
      var td = document.createElement('td');
      var td2 = document.createElement('td');
      var td3 = document.createElement('td');
      var btnDel = document.createElement('button');
      var btnEdit = document.createElement('button');
      var btnSave = document.createElement('button');
      var label = document.createElement('label');
      var input = document.createElement('input');

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

      btnEdit.addEventListener('click', _this.edit);
      btnSave.addEventListener('click', _this.save);
      btnDel.addEventListener('click', _this.delete);
      label.addEventListener('click', _this.select);

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

      _this.doom.tbody.appendChild(tr);
    });
  };
  this.edit = function (e) {
    e.target.parentElement.parentElement.classList.add('edit');
    e.target.parentElement.parentElement.children[1].classList.remove('done');
    var input = e.target.parentElement.parentElement.children[1].children[1];
    var label = e.target.parentElement.parentElement.children[1].children[0].textContent;
    input.value = label;
  };
  this.save = function (e) {
    e.target.parentElement.parentElement.classList.remove('edit');
    var input = e.target.parentElement.parentElement.children[1].children[1];
    var todo = _this.getLocal();
    var id = +e.target.parentElement.parentElement.dataset.index;
    var index = todo.findIndex(function (item) {
      return item.id === id;
    });
    todo[index].name = input.value;
    todo[index].isselected = false;
    _this.setLocal(todo);
    _this.doom.tbody.innerHTML = '';
    _this.renderMethod();
    _this.doneCount();
  };
  this.delete = function (e) {
    var todo = _this.getLocal();
    var id = +e.target.parentElement.parentElement.dataset.index;
    var index = todo.findIndex(function (item) {
      return item.id === id;
    });
    todo.splice(index, 1);
    _this.doom.tbody.innerHTML = '';
    _this.setLocal(todo);
    _this.renderMethod();
    _this.doneCount();
  };
  this.create = function () {
    var create = function create(e) {
      e.preventDefault();
      var todos = _this.getLocal();
      todos.push({ id: Math.random(), name: _this.doom.addInput.value, isDone: false, isselected: false });
      _this.doom.tbody.innerHTML = '';
      _this.doom.addInput.value = '';
      _this.setLocal(todos);
      _this.renderMethod();
    };
    _this.doom.addBtn.addEventListener('click', create);
    _this.doom.addBtn.addEventListener('keypress', function (e) {
      e.keyCode === 13 ? create() : null;
    });
  };
  this.doneCount = function () {
    var t = 0;
    _this.getLocal().forEach(function (i) {
      i.isselected ? t++ : t += 0;
    });
    _this.doom.doneCount.textContent = t;
  };
  this.select = function (e) {
    var todo = _this.getLocal();
    var id = +e.target.parentElement.parentElement.dataset.index;
    var index = todo.findIndex(function (item) {
      return item.id === id;
    });
    todo[index].isselected = !todo[index].isselected;
    _this.doom.tbody.innerHTML = '';
    _this.setLocal(todo);
    _this.renderMethod();
    _this.doneCount();
  };
  this.setLocal = function (obg) {
    localStorage.setItem('todo', JSON.stringify(obg));
    console.log(obg);
  };
  this.getLocal = function () {
    return JSON.parse(localStorage.getItem('todo'));
  };
  this.initLocal = function () {
    console.log('initLocal');
    if (!localStorage.getItem('todo') || _this.getLocal().length < 1) {
      localStorage.setItem('todo', JSON.stringify([{ id: 0, name: 'do smth..', isDone: false, isselected: false }, { id: 1, name: 'do smth2..', isDone: false, isselected: false }]));
    }
  };
  this.init = function () {
    _this.create();
    _this.initLocal();
    _this.renderMethod();
    _this.doneCount();
  };
}

var toDo = new ToDo();
toDo.init();