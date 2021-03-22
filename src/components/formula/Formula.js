import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/Dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    });
  }

  init() {
    super.init();

    this.$formula = this.$root.find('#formula')

    this.$on('table:select', $cell => {
      this.$formula.text($cell.text())
    })
    // Событие когда вводим значение в ячейку таблицы
    this.$on('table:input', $cell => {
      this.$formula.text($cell.text())
    })
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      // this.$emit('formula:done')
      this.$emit('formula:enter')
    }

    if (event.key === 'Tab') {
      event.preventDefault()
      // this.$emit('formula:done')
      this.$emit('formula:tab')
    }
  }

}
