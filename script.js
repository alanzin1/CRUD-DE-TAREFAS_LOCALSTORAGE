const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sTarefa = document.querySelector('#m-tarefa')
const sDesc = document.querySelector('#m-desc')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sTarefa.value = itens[index].tarefa
    sDesc.value = itens[index].desc
    id = index
  } else {
    sTarefa.value = ''
    sDesc.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.tarefa}</td>
    <td>${item.desc}</td>
  
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sTarefa.value == '' || sDesc.value == '' ) {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].tarefa = sTarefa.value
    itens[id].desc = sDesc.value
  } else {
    itens.push({'tarefa': sTarefa.value, 'desc': sDesc.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
