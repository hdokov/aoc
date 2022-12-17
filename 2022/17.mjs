import fs from 'fs'
import './enhanceArrays.mjs'

const input = `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`

const simulation = true

const data = simulation ? input : fs.readFileSync('input-17.txt', 'utf-8')
const heights = fs.readFileSync('17.txt', 'utf-8').split('\n').map(Number)
console.log(heights.first(10))
const jets = data.split('').map(j => (j === '<' ? -1 : 1))

const shapes = [
  [[1, 1, 1, 1]],
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0]
  ],
  [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1]
  ],
  [[1], [1], [1], [1]],
  [
    [1, 1],
    [1, 1]
  ]
]

const shaft = []
for (let y = 0; y < 5000; y++) {
  shaft.push('0000000'.split('').map(Number))
}

function moveX(rock, direction) {
  //console.log(rock, direction)
  if (rock.x + direction < 0 || rock.x + rock.w + direction > 7) return

  const offsetX = rock.x + direction

  for (let x = 0; x < rock.w; x++) {
    for (let y = 0; y < rock.h; y++) {
      if (rock.shape[y][x] + shaft[y + rock.y][x + offsetX] > 1) return
    }
  }

  //console.log('moving')
  rock.x += direction
}

function moveY(rock) {
  if (rock.y === 0) return false

  const offsetY = rock.y - 1

  for (let x = 0; x < rock.w; x++) {
    for (let y = 0; y < rock.h; y++) {
      if (rock.shape[y][x] + shaft[y + offsetY][x + rock.x] > 1) return false
    }
  }

  rock.y--

  return true
}

function place(rock) {
  for (let x = 0; x < rock.w; x++) {
    for (let y = 0; y < rock.h; y++) {
      shaft[y + rock.y][x + rock.x] += rock.shape[y][x] * ((shapeIndex % 5) + 1)
    }
  }
}

const maxRocks = 11
const rocks = []

let shapeIndex = 0
let jetIndex = 0

for (let r = 0; r < maxRocks; r++) {
  const shape = shapes[shapeIndex++ % 5]
  const rock = {
    shape: shape,
    h: shape.length,
    w: shape[0].length,
    x: 2,
    y: rocks.length === 0 ? 3 : rocks[0].y + rocks[0].h + 3
  }

  //console.log(rock)

  for (let y = rock.y; y > -2; y--) {
    moveX(rock, jets[jetIndex++ % 40])
    if (!moveY(rock)) {
      place(rock)
      break
    }
  }

  rocks.unshift(rock)
  const h = shaft.map(JSON.stringify).indexOf(JSON.stringify([0, 0, 0, 0, 0, 0, 0]))
  if (h !== heights[r]) {
    console.log('diff', h, heights[r], r, jetIndex, shapeIndex)
    break
  }
}

const shapeS = ' @#$%&'

console.log(
  shaft
    .first(25)
    .reverse()
    .map(r => r.map(c => (c > 0 ? c : '.')).join(''))
    .join('\n')
)
console.log(rocks[0].y + rocks[0].h, rocks.length, jets.length, jetIndex)
console.log(shaft.map(JSON.stringify).indexOf(JSON.stringify([0, 0, 0, 0, 0, 0, 0])))
//3175
//1555113636385

//1474
//2100
