const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const sidebar = document.querySelector('.sidebar')
let lineArray = []

sidebar.onclick = (e) => {
  const elem = e.target
  if (elem == sidebar) return
  const btn = elem.closest('button')
  select(btn)

  if (elem.querySelector('.circle')) enableDrawingCircle(elem)
  if (elem.querySelector('.line')) enableLine(elem)
  if (elem.querySelector('.square')) enableSquare(elem)
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
      canvas.onmousemove = null
      canvas.onmouseup = null
    }
  }
}

function enableLine() {

  let x1, y1, x2, y2
  let lineObject = {}
  canvas.onmousedown = (e) => {
    x1 = e.offsetX
    y1 = e.offsetY

    canvas.onmousemove = (e) => {
      x2 = e.offsetX
      y2 = e.offsetY
      clearCanvas()
      drawLine(x1, y1, x2, y2)
    }
    canvas.onmouseup = () => {
      lineObject = { x1, x2, y1, y2 }
      canvas.onmousemove = null
      canvas.onmouseup = null
    }
  }
}

function enableSquare() {

  let x1, y1, x2, y2
  let lineObject = {}
  canvas.onmousedown = (e) => {
    x1 = e.offsetX
    y1 = e.offsetY

    canvas.onmousemove = (e) => {
      x2 = e.offsetX
      y2 = e.offsetY
      clearCanvas()
      drawSquare(x1, y1, x2, y2)
    }
    canvas.onmouseup = () => {
      lineObject = { x1, x2, y1, y2 }
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

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
}

function drawSquare(x1, y1, x2, y2) {
  const sideLength = Math.abs(x2 - x1)
  ctx.beginPath()
  ctx.rect(x1, y1, sideLength, sideLength)
  ctx.stroke()
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

// renderCanvas();
// function renderCanvas(lineObject) {
//   lineArray.push(lineObject)
//   for (char of lineArray) {
//     ctx.beginPath()
//     ctx.moveTo(char.x1, char.y1)
//     ctx.lineTo(char.x2, char.y2)
//     ctx.stroke()
//   }
//   console.log(lineArray)
// }