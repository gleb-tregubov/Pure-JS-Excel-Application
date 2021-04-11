import {$} from '@core/Dom';

export function resizeHandler($root, event) {
  return new Promise(resolve => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const type = event.target.dataset.resize
    const sideProp = type === 'col' ? 'bottom' : 'right'
    let value
    let delta

    $resizer.css({opacity: 1, [sideProp]: -5000 + 'px'})

    document.onmousemove = e => {
      if (type === 'col') {
        const delta = e.pageX - coords.right
        value = coords.width + delta
        $resizer.css({right: -delta + 'px'})
      } else {
        delta = e.pageY - coords.bottom
        value = coords.height + delta
        $resizer.css({bottom: -delta + 'px'})
      }
      document.onmouseup = _ => {
        if (type === 'col') {
          $root
              .findAll(`[data-col="${$parent.data.col}"]`)
              .forEach(cell => cell.style.width = value + 'px')
        } else {
          $parent.css({height: value + 'px'})
        }

        // console.log($parent.data.row, 'parent data')
        resolve({
          value,
          id: type === 'col' ? $parent.data.col : $parent.data.row, // null
          // id: $parent.data[type],
          type
        })

        // console.log(value) // for redux
        $resizer.css({
          opacity: 0,
          right: 0,
          bottom: 0
        })
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  })
}
