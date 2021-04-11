import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {
  isCell, matrix, nextSelector,
  shouldResize,
} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/Dom';
import * as actions from '@/redux/actions'
import {defaultStyles} from '@core/constants';
import {parse} from '@core/parse';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  toHTML() {
    return createTable(30, this.store.getState())
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    const $cell = this.$root.find('[data-id="0:0"]')
    // this.selection.select($cell)
    // this.$emit('table:select', $cell)
    this.selectCell($cell)

    this.$on('formula:input', value => {
      this.selection.current
          .attr('data-value', value)
          .text(parse(value))
      this.updateTextInStore( value )
    })

    // Формула фокус
    // this.$on('formula:done', _ => {
    //   this.selection.current.focus()
    //   console.log(this.selection.current)
    // })

    // Привязываем прослушку на событие нажатия Enter у формулы
    this.$on('formula:enter', _ => {
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector('Enter', id))
      this.selection.select($next)
      console.log(id)
    })

    // Привязываем прослушку на событие нажатия Tab у формулы
    this.$on('formula:tab', _ => {
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector('Tab', id))
      this.selection.select($next)
      console.log(id)
    })

    this.$on('toolbar:applyStyle', value => {
      // console.log('From Table', style)
      this.selection.applyStyle(value)
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds
      }))
    })

    // this.$subscribe(state => {
    //   console.log('TableState', state)
    // })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    const styles = $cell.getStyle(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      console.log(data, 'data')
      this.$dispatch(actions.tableResize(data))
      // console.log('Resize data', data)
    } catch (e) {
      console.warn('Resize error', e.message)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    }

    if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map((id) => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)

      } else {
        // this.selection.select($target)
        // this.$emit('table:select', $target)
        this.selectCell($target)
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Tab',
      'Enter',
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight'
    ]

    const {key} = event

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      // this.selection.select($next)
      // this.$emit('table:select', $next)
      this.selectCell($next)
      return
    }
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  onInput(event) {
    // this.$emit('table:input', $(event.target))
    this.updateTextInStore( $(event.target).text() )
  }
}
