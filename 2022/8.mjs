import fs from 'fs'
import './enhanceArrays.mjs'

const input = `30373
25512
65332
33549
35390`
const data = fs.readFileSync('input-8.txt', 'utf-8')
const forest = data.split('\n').map(r => r.split('').map(Number))
const tForest = forest.transpose()
//console.log(forest)
//console.log(tForest)

let visible = 0
forest.forEach((row, x) => {
  row.forEach((tree, y) => {
    if (x === 0 || x === forest.length - 1 || y === 0 || y === row.length - 1) {
      visible += 1
    } else {
      if (
        row.slice(0, y).every(t => t < tree) ||
        row.slice(y + 1).every(t => t < tree) ||
        tForest[y].slice(0, x).every(t => t < tree) ||
        tForest[y].slice(x + 1).every(t => t < tree)
      ) {
        visible += 1
      }
    }
  })
})

console.log('P1:', visible)

function viewDistance(context, current) {
  if (!context.blocked) {
    context.visible += 1
    context.blocked = context.tree <= current
  }
  return context
}

let score = 0
forest.forEach((row, y) => {
  row.forEach((tree, x) => {
    if (!(y === 0 || y === forest.length - 1 || x === 0 || x === row.length - 1)) {
      const tScores = [
        row.slice(0, x).reverse().reduce(viewDistance, {tree, visible: 0, blocked: false}).visible,
        row.slice(x + 1).reduce(viewDistance, {tree, visible: 0, blocked: false}).visible,
        tForest[x].slice(0, y).reverse().reduce(viewDistance, {tree, visible: 0, blocked: false}).visible,
        tForest[x].slice(y + 1).reduce(viewDistance, {tree, visible: 0, blocked: false}).visible
      ]

      const tScore = tScores.reduce((p, s) => p * s, 1)
      score = Math.max(score, tScore)
    }
  })
})

console.log('P2:', score)
