import {storage} from '@core/utils';
import {defaultStyles, defaultTitle} from '@core/constants';

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  currentText: '',
  stylesState: {},
  currentStyles: defaultStyles
}

// const normalize = state => ({
//   ...state,
//   currentStyles: defaultStyles,
//   currentText: '',
//   title: defaultTitle
// })

export const initialState = storage('excel-state') || defaultState
