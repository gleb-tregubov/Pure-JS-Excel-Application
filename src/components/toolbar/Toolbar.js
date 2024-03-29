import {createToolbar} from '@/components/toolbar/toolbar.template';
import {$} from '@core/Dom';
import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {defaultStyles} from '@core/constants';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    });
  }

  prepare() {
    this.initState(defaultStyles)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles)
    // console.log('changes from toolbar', changes)
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)

      this.$emit('toolbar:applyStyle', value)

      const key = Object.keys(value)[0]
      const property = {[key]: value[key]}
      this.setState(property)
    }
  }

}
