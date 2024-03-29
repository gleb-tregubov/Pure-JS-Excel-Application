import {
  APPLY_STYLE, CHANGE_DATE,
  CHANGE_STYLES,
  CHANGE_TEXT,
  CHANGE_TITLE,
  TABLE_RESIZE
} from './types';

export function rootReducer(state, action) {
  // let prevState
  let field
  let val
  // console.log('Action', action)
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState'
      return {
        ...state,
        [field]: value(state, field, action)
      } // id колонки, value
    case CHANGE_TEXT:
      field = 'dataState'
      return {
        ...state,
        currentText: action.data.value,
        [field]: value(state, field, action)
      }
    case CHANGE_STYLES:
      return {
        ...state,
        currentStyles: action.data
      }
    case APPLY_STYLE:
      field = 'stylesState'
      val = state[field] || {}
      action.data.ids.map(id => {
        val[id] = {...val[id], ...action.data.value}
        // val[id] = toInlineStyles(action.data.value)
      })
      // eslint-disable-next-line no-debugger
      // eslint-disable-next-line no-debugger
      // debugger
      return {
        ...state,
        [field]: val,
        currentStyles: {...state.currentStyles, ...action.data.value}
      }
    case CHANGE_TITLE:
      field = 'title'
      return {
        ...state,
        [field]: action.data
      }
    case CHANGE_DATE:
      return {
        ...state,
        openedDate: new Date().toJSON()
      }
    default: return state
  }
}

function value(state, field, action) {
  const val = state[field] || {}
  val[action.data.id] = action.data.value
  return val
}
