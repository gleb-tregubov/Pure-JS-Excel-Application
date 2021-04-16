import {Page} from '@core/Page';
import {createStore} from '@core/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {defaultState} from '@/redux/initialState';
import {clone, debounce, storage} from '@core/utils';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';

export class ExcelPage extends Page {
  getRoot() {
    console.log('params', this.params)
    const initialState = storage(`excel:${this.params}`)
      || clone(defaultState)
    const store = createStore(rootReducer, initialState)
    // {colState: {}, rowState: {}}

    const stateListener = debounce(state => {
      console.log('App State', state)
      storage(`excel:${this.params}`, state)
    }, 300)

    store.subscribe(stateListener)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
