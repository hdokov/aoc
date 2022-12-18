import fs from 'fs'
import './enhanceArrays.mjs'

const input = `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`

const simulation = false

const data = simulation ? input : fs.readFileSync('input-17-2.txt', 'utf-8')
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
  if (rock.x + direction < 0 || rock.x + rock.w + direction > 7) return

  const offsetX = rock.x + direction

  for (let x = 0; x < rock.w; x++) {
    for (let y = 0; y < rock.h; y++) {
      if (rock.shape[y][x] + shaft[y + rock.y][x + offsetX] > 1) return
    }
  }

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
      shaft[y + rock.y][x + rock.x] += rock.shape[y][x]
    }
  }
}

const maxRocks = 2022
const rocks = []

let shapeIndex = 0
let jetIndex = 0

for (let r = 0; r < maxRocks; r++) {
  const shape = shapes[r % 5]
  const rock = {
    shape: shape,
    h: shape.length,
    w: shape[0].length,
    x: 2,
    y: shaft.map(JSON.stringify).indexOf(JSON.stringify([0, 0, 0, 0, 0, 0, 0])) + 3
  }

  for (let y = rock.y; y > -2; y--) {
    moveX(rock, jets[jetIndex++ % 40])
    if (!moveY(rock)) {
      place(rock)
      break
    }
  }

  rocks.unshift(rock)
}

const shapeS = ' @#$%&'

// console.log(
//   shaft
//     .first(40)
//     .reverse()
//     .map(r => r.map(c => (c > 0 ? c : '.')).join(''))
//     .join('\n')
// )
console.log(rocks[0].y + rocks[0].h, rocks.length, jets.length, jetIndex)
console.log(shaft.map(JSON.stringify).indexOf(JSON.stringify([0, 0, 0, 0, 0, 0, 0])))
//3175
//1555113636385
