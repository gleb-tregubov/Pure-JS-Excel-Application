import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/Dom';
import * as actions from '@/redux/actions';
import {defaultTitle} from '@core/constants';
import {debounce} from '@core/utils';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
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
        <div class="button">
          <span class="material-icons"> delete </span>
        </div>

        <div class="button">
          <span class="material-icons"> exit_to_app </span>
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
}
