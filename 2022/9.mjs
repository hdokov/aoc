import fs from 'fs'
import './enhanceArrays.mjs'

const input = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`

const input2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`

const data = fs.readFileSync('input-9.txt', 'utf-8')
const moves = data.split('\n').map(s => s.split(' '))
const moves2 = data.split('\n').map(s => s.split(' '))

function moveTail(p1, p2) {
  const diffX = p1.x - p2.x
  const diffY = p1.y - p2.y
  if (!(Math.abs(diffX) < 2 && Math.abs(diffY) < 2)) {
    if (Math.abs(diffX) === 2) {
      p2.x += diffX / 2
      if (diffY !== 0) {
        p2.y += diffY > 0 ? 1 : -1
      }
    } else {
      p2.y += diffY / 2
      if (diffX !== 0) {
        p2.x += diffX > 0 ? 1 : -1
      }
    }
  }
}

const vectors = {U: {x: 0, y: 1}, D: {x: 0, y: -1}, L: {x: -1, y: 0}, R: {x: 1, y: 0}}

const hp = {x: 0, y: 0}
const tp = {x: 0, y: 0}
const tpVisited = [{...tp}]

moves.forEach(m => {
  const [d, v] = m

  const md = vectors[d]

  for (let i = 0; i < v; i++) {
    hp.x += md.x
    hp.y += md.y
    moveTail(hp, tp)
    tpVisited.push({...tp})
  }
})
console.log('P1:', tpVisited.map(m => `x${m.x}-y${m.y}`).unique().length)

const ps = [
  {x: 0, y: 0},
  {x: 0, y: 0},
  {x: 0, y: 0},
  {x: 0, y: 0},
  {x: 0, y: 0},
  {x: 0, y: 0},
  {x: 0, y: 0},
  {x: 0, y: 0},
  {x: 0, y: 0},
  {x: 0, y: 0}
]
const tp9Visited = [{x: 0, y: 0}]

moves2.forEach(m => {
  const [d, v] = m

  const md = vectors[d]

  for (let i = 0; i < v; i++) {
    ps[0].x += md.x
    ps[0].y += md.y
    for (let j = 1; j < 10; j++) {
      moveTail(ps[j - 1], ps[j])
    }
    tp9Visited.push({...ps[9]})
  }
})
console.log('P2:', tp9Visited.map(m => `x|${m.x}|y|${m.y}`).unique().length)
