import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/Dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText', 'colState'],
      ...options
    });
  }

  init() {
    super.init();

    this.$formula = this.$root.find('#formula')

    this.$on('table:select', $cell => {
      this.$formula.text($cell.data.value)
    })
    // Событие когда вводим значение в ячейку таблицы
    // this.$on('table:input', $cell => {
    //   this.$formula.text($cell.text())
    // })
    // -------------------------------------------------
    // this.$subscribe(state => {
    //   console.log('FormulaState', state)
    //   this.$formula.text(state.currentText)
    // })
    // -------------------------------------------------

    // this.$subscribe(state => {
    //   console.log('FormulaState', state)
    // })
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText)
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
