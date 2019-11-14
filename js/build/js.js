'use strict';

function ToDo() {
  var _this = this;

  this.list = [{ id: 0, name: 'do smth..', isDone: false, isselected: false }, { id: 1, name: 'do smth2..', isDone: false, isselected: false }];
  this.doom = {
    table: document.getElementById('table'),
    tbody: document.querySelector('.table tbody'),
    btnEdit: document.querySelectorAll('.edit'),
    addInput: document.getElementById('add'),
    addBtn: document.getElementById('add-btn'),
    doneCount: document.getElementById('done-count')
  };
  this.renderMethod = function () {
    console.log(_this.list, 'renderMethod');

    _this.list.forEach(function (item, index) {
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
    var id = +e.target.parentElement.parentElement.dataset.index;
    var index = _this.list.findIndex(function (item) {
      return item.id === id;
    });
    _this.list[index].name = input.value;
    _this.list[index].isselected = false;
    _this.doom.tbody.innerHTML = '';
    _this.renderMethod();
    _this.doneCount();
  };
  this.delete = function (e) {
    var id = +e.target.parentElement.parentElement.dataset.index;
    var index = _this.list.findIndex(function (item) {
      return item.id === id;
    });
    _this.list.splice(index, 1);
    _this.doom.tbody.innerHTML = '';
    _this.renderMethod();
    _this.doneCount();
  };
  this.create = function () {
    var create = function create(e) {
      e.preventDefault();
      _this.list.push({ id: Math.random(), name: _this.doom.addInput.value, isDone: false, isselected: false });
      _this.doom.tbody.innerHTML = '';
      _this.doom.addInput.value = '';
      _this.renderMethod();
      console.log(_this.list);
    };
    console.log(_this);
    _this.doom.addBtn.addEventListener('click', create);
    _this.doom.addBtn.addEventListener('keypress', function (e) {
      e.keyCode === 13 ? create() : null;
    });
  };
  this.doneCount = function () {
    var t = 0;
    _this.list.forEach(function (i) {
      i.isselected ? t++ : t += 0;
    });
    _this.doom.doneCount.textContent = t;
  };
  this.select = function (e) {
    var id = +e.target.parentElement.parentElement.dataset.index;
    var index = _this.list.findIndex(function (item) {
      return item.id === id;
    });
    _this.list[index].isselected = !_this.list[index].isselected;
    _this.doom.tbody.innerHTML = '';
    _this.renderMethod();
    _this.doneCount();
  };
  this.removeFromArray = function () {};
  this.init = function () {
    _this.renderMethod();
    _this.create();
    _this.doneCount();
  };
}

var toDo = new ToDo();
toDo.init();