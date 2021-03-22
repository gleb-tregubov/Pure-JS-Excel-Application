import {range} from '@core/utils';

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function matrix($target, $current) {
  const target = $target.id(true)
  const current = $current.id(true)

  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)

  const ids = cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])

  return ids
}

export function nextSelector(key, {row, col}) {
  const MIN_VALUE = 0
  switch (key) {
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'ArrowUp':
      // row === 0 ? row : row--
      row = --row < MIN_VALUE ? MIN_VALUE : row--
      break
    case 'ArrowLeft':
      // col === 0 ? col : col--
      col = --col < MIN_VALUE ? MIN_VALUE : col--
      break
  }

  return `[data-id="${row}:${col}"]`
}
