import {storage} from '@core/utils';

function toHTML(tableId) {
  const model = storage(tableId)
  const id = tableId.split(':')[1]
  const date = new Date(+id)
  console.log(date.getDate())
  // ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}
  return `
    <li class="db__record">
      <a href="#excel/${id}">${model.title}</a>
      <strong>${new Date(model.openedDate).toLocaleDateString()
        + ' '
        + new Date(model.openedDate).toLocaleTimeString()}</strong>
    </li>
  `
}

function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    localStorage.key(i).includes('excel')
        ? keys.push(localStorage.key(i))
        : null
  }
  return keys
}

export function createRecordsTable() {
  const keys = getAllKeys()
  console.log(keys)
  return !keys.length
    ? `<p>Вы пока не создали ни одной таблицы!</p>`
    : `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата создания</span>
    </div>
    <ul class="db__list">
      ${ keys.map(toHTML).join('') }
    </ul>
  `
}
