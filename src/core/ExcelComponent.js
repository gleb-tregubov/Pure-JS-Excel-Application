import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {

  // Конструктор

  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []

    console.log(options)

    this.prepare()
  }

  // Подготовительный метода
  // вызывается в конструкторе
  prepare() {

  }

  // Емитем ивент с передаваемой датой
  $emit(event, data) {
    this.emitter.emit(event, data)
  }

  // Добавляем слушателя на ивент
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  // Возвращаем html
  toHTML() {
    return ''
  }

  // Инициализируем компоненты
  init() {
    this.initDOMListeners()
  }

  // Разрушаем компоненты
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
