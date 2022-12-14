import fs from 'fs'
import './enhanceArrays.mjs'

const input = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`
const data = fs.readFileSync('input-14.txt', 'utf-8')

const rocks = data.split('\n').map(l => l.split(' -> ').map(r => r.split(',').map(Number)))

let [minX, maxX, maxY] = rocks
  .map(l => l.reduce((p, n) => [Math.min(p[0], n[0]), Math.max(p[1], n[0]), Math.max(p[2], n[1])], [500, 500, 0]))
  .reduce((p, n) => [Math.min(p[0], n[0]), Math.max(p[1], n[1]), Math.max(p[2], n[2])], [500, 500, 0])

// Disable for P1
if (true) {
  rocks.push([
    [0, maxY + 2],
    [1000, maxY + 2]
  ])
  minX = 0
  maxX = 1000
  maxY = maxY + 2
}

const field = []
for (let i = minX; i <= maxX; i++) {
  const col = []
  for (let j = 0; j <= maxY; j++) {
    col.push('.')
  }
  field.push(col)
}

rocks.forEach(l => {
  l.forEach((r, i) => {
    if (i === l.length - 1) {
      return
    }
    const r1 = l[i + 1]
    if (r[0] === r1[0]) {
      for (let k = Math.min(r[1], r1[1]); k <= Math.max(r[1], r1[1]); k++) {
        field[r[0] - minX][k] = '#'
      }
    } else if (r[1] === r1[1]) {
      for (let k = Math.min(r[0], r1[0]); k <= Math.max(r[0], r1[0]); k++) {
        field[k - minX][r[1]] = '#'
      }
    } else {
      console.log('Invalid line', r, r1)
    }
  })
})

//field.transpose().map(l => console.log(l.join('')))
let k = 0
while (k < 1000000) {
  const sp = [500 - minX, 0]
  if (field[sp[0]][0] === '*') {
    break
  }
  let fellOut = false
  for (let y = 0; y <= maxY; y++) {
    if (field[sp[0]][y] === '.') {
      if (y === maxY) {
        fellOut = true
        break
      }
      sp[1] = y
    } else {
      if (sp[0] === 0) {
        fellOut = true
        break
      }
      if (field[sp[0] - 1][y] === '.') {
        sp[0] -= 1
        sp[1] = y
      } else if (sp[0] === field.length - 1) {
        fellOut = true
        break
      } else if (field[sp[0] + 1][y] === '.') {
        sp[0] += 1
        sp[1] = y
      } else {
        field[sp[0]][sp[1]] = '*'
        break
      }
    }
  }
  if (fellOut) {
    break
  } else {
    k += 1
  }
}
//field[500 - minX][0] = '+'
//field.transpose().map(l => console.log(l.join('')))
console.log('P1:', k)
