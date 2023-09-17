const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const sidebar = document.querySelector('.sidebar')

sidebar.onclick = (e) => {
  const elem = e.target
  if (elem == sidebar) return
  const btn = elem.closest('button')
  select(btn)

  if (elem.classList.contains('circle')) enableDrawingCircle()
}

function select(btn) {
  if (btn.matches(':has(.shape)')) canvas.className = 'active-shape'
  else canvas.className = ''
  const activeBtn = document.querySelector('.active-button')
  if (activeBtn) activeBtn.className = ''
  btn.className = 'active-button'
}

function enableDrawingCircle() {
  let x1, y1, x2, y2
  canvas.onmousedown = (e) => {
    x1 = e.offsetX
    y1 = e.offsetY

    canvas.onmousemove = (e) => {
      x2 = e.offsetX
      y2 = e.offsetY
      clearCanvas()
      drawEllipse(x1, y1, x2, y2)
    }

    canvas.onmouseup = () => {
      // canvas.onmousedown = null
      canvas.onmousemove = null
      canvas.onmouseup = null
    }
  }
}

function drawEllipse(x1, y1, x2, y2) {
  const x = (x1 + x2) / 2
  const y = (y1 + y2) / 2
  const radiusX = Math.abs((x2 - x1) / 2)
  const radiusY = Math.abs((y2 - y1) / 2)

  ctx.beginPath()
  ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 7)
  ctx.stroke()
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

