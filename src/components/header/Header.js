import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/Dom';
import * as actions from '@/redux/actions';
import {defaultTitle} from '@core/constants';
import {debounce} from '@core/utils';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML() {
    const state = this.store.getState()
    const title = state.title || defaultTitle
    return `
     <input type="text" data-type="title" class="input"
      value="${title}" />
  
      <div class="wrapper">
        <div class="button" data-button="remove">
          <span class="material-icons" data-button="remove"> delete </span>
        </div>

        <div class="button" data-button="exit">
          <span class="material-icons" data-button="exit"> exit_to_app </span>
        </div>
      </div>
    `
  }

  onInput(event) {
    const $tableTitle = $(event.target)
    if ($tableTitle.data.type === 'title') {
      // console.log($tableTitle.text())
      this.$dispatch(actions.changeTitle($tableTitle.text()))
    }
  }

  onClick(event) {
    const $button = $(event.target)
    if ($button.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
    if ($button.data.button === 'remove') {
      const decision = confirm('Вы действительно хотите удалить эту таблицу?')
      if (decision) {
        localStorage.removeItem(`excel:${ActiveRoute.param}`)
        ActiveRoute.navigate('')
      }
    }
  }
}
