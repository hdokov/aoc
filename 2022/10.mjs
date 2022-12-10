import fs from 'fs'
import './enhanceArrays.mjs'

const input = ``
const data = fs.readFileSync('input-10.txt', 'utf-8')

let x = 1
let c = 1
const vals = []
const significantCycles = [20, 60, 100, 140, 180, 220]
data
  .split('\n')
  .map(l => l.split(' '))
  .forEach(([inst, val], i) => {
    if (significantCycles.includes(c) || (inst === 'addx' && significantCycles.includes(c + 1))) {
      vals.push(x * (significantCycles.includes(c) ? c : c + 1))
    }
    c += inst === 'addx' ? 2 : 1
    x += Number(val || '')
  })
console.log(
  'P1:',
  vals.reduce((s, v) => s + v, 0)
)

x = 1
c = 1
let lines = []
let currentLine = []

function draw() {
  if ((c - 1) % 40 === 0 && c !== 1) {
    lines.push(currentLine)
    currentLine = []
  }
  if ([x - 1, x, x + 1].includes((c - 1) % 40)) {
    currentLine.push('#')
  } else {
    currentLine.push('.')
  }
  c += 1
}
data
  .split('\n')
  .map(l => l.split(' '))
  .forEach(([inst, val]) => {
    draw()
    if (inst === 'addx') {
      draw()
      x += Number(val || '')
    }
  })

console.log('P2:')
lines.forEach(l => console.log(l.join('')))
console.log(currentLine.join(''))
