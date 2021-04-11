import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {

  // Конструктор

  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.unsubscribers = []
    this.store = options.store
    // this.storeSub = null
    this.subsribers = options.subscribers || []

    // console.log(options)

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

  $dispatch(action) {
    this.store.dispatch(action)
  }

  storeChanged() {

  }

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  // $subscribe(fn) {
  //   this.storeSub = this.store.subscribe(fn)
  //   // sub.unsubscribe(0
  // }

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
    // this.storeSub.unsubscribe()
  }
}
