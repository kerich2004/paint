const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const sidebar = document.querySelector('.sidebar')
const colorInput = document.querySelector('.color')
const widthInput = document.querySelector('.width')
let lineWidth = 1
let color = 'black'
let shapes = []
const draw = {
  line: drawLine,
  ellipse: drawEllipse,
  rect: drawRect,

}

sidebar.onclick = (e) => {
  const elem = e.target

  if (elem == sidebar) return

  const btn = elem.closest('button')

  select(btn)

  if (btn.querySelector('.circle')) enableEllipse()
  if (btn.querySelector('.line')) enableLine()
  if (btn.querySelector('.square')) enableRect()
  if (btn.matches('.clear')) clear()
}

function clear() {
  shapes = []
  clearCanvas()
}

function select(btn) {
  color = colorInput.value
  lineWidth = widthInput.value

  if (btn.querySelector('.shape')) canvas.className = 'active-shape'
  else canvas.className = ''

  const activeBtn = document.querySelector('.active-button')

  if (activeBtn) activeBtn.classList.remove('active-button')

  btn.classList.add('active-button')

  if (activeBtn?.querySelector('.shape') && !btn.querySelector('.shape')) {
    setTimeout(() => select(activeBtn), 500)
  }
}

function enableEllipse() {
  let x1, y1, x2, y2
  canvas.onmousedown = (e) => {
    x1 = e.offsetX
    y1 = e.offsetY

    canvas.onmousemove = (e) => {
      x2 = e.offsetX
      y2 = e.offsetY
      clearCanvas()
      drawEllipse(x1, y1, x2, y2, lineWidth, color)
      renderShapes()
    }

    canvas.onmouseup = () => {
      const ellipse = { type: "ellipse", x1, x2, y1, y2, lineWidth, color}
      shapes.push(ellipse)
      canvas.onmousemove = null
      canvas.onmouseup = null
      renderShapes()
    }
  }
}

function enableLine() {

  let x1, y1, x2, y2
  canvas.onmousedown = (e) => {
    x1 = e.offsetX
    y1 = e.offsetY

    canvas.onmousemove = (e) => {
      x2 = e.offsetX
      y2 = e.offsetY
      clearCanvas()
      renderShapes()
      drawLine(x1, y1, x2, y2, lineWidth, color)
    }
    canvas.onmouseup = () => {
      const line = { type: "line", x1, x2, y1, y2, lineWidth, color}
      shapes.push(line)
      canvas.onmousemove = null
      canvas.onmouseup = null
      clearCanvas()
      renderShapes()
    }
  }
}

function enableRect() {

  let x1, y1, x2, y2
  let line = {}
  canvas.onmousedown = (e) => {
    x1 = e.offsetX
    y1 = e.offsetY

    canvas.onmousemove = (e) => {
      x2 = e.offsetX
      y2 = e.offsetY
      clearCanvas()
      renderShapes()
      drawRect(x1, y1, x2, y2, lineWidth, color)
    }
    canvas.onmouseup = () => {
      const rect = { type: "rect", x1, x2, y1, y2, lineWidth, color}
      shapes.push(rect)
      canvas.onmousemove = null
      canvas.onmouseup = null
      clearCanvas()
      renderShapes()
    }
  }
}

function drawEllipse(x1, y1, x2, y2, lineWidth, color) {
  const x = (x1 + x2) / 2
  const y = (y1 + y2) / 2
  const radiusX = Math.abs((x2 - x1) / 2)
  const radiusY = Math.abs((y2 - y1) / 2)

  ctx.strokeStyle = color
  ctx.lineWidth = lineWidth

  ctx.beginPath()
  ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 7)
  ctx.stroke()
}

function drawLine(x1, y1, x2, y2, lineWidth, color) {
  ctx.strokeStyle = color
  ctx.lineWidth = lineWidth
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
}

function drawRect(x1, y1, x2, y2, lineWidth, color) {
  ctx.strokeStyle = color
  ctx.lineWidth = lineWidth
  const width = Math.abs(x1 - x2)
  const height = Math.abs(y1-y2)
  ctx.beginPath()
  ctx.rect(Math.min(x1,x2), Math.min(y1,y2), width, height)
  ctx.stroke()
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function renderShapes() {
  for (const shape of shapes) {
    const { type, x1, y1, x2, y2, lineWidth, color } = shape
    draw[type](x1, y1, x2, y2, lineWidth, color)
  }
}