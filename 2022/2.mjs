import fs from 'fs'

const input = `A Y
B X
C Z
`

function getResult(_err, data) {
  let score = 0
  //data = input
  const shapes = {X: 1, Y: 2, Z: 3, A: 'Z', B: 'X', C: 'Y'}

  const maps = {X: 'A', Y: 'B', Z: 'C'}

  for (const line of data.toString().split('\n')) {
    if (line === '') {
      continue
    }

    const [opp, my] = line.split(' ')

    const outcome = opp === maps[my] ? 3 : shapes[opp] === my ? 0 : 6
    // console.log(outcome, opp, my)
    score += shapes[my] + outcome
  }

  console.log(score)
}

function getResult2(_err, data) {
  let score = 0
  //data = input
  const shapes = {X: 0, Y: 3, Z: 6, A: ['Y', 'Z', 'X'], B: ['X', 'Y', 'Z'], C: ['Z', 'X', 'Y']}

  for (const line of data.toString().split('\n')) {
    if (line === '') {
      continue
    }

    const [opp, my] = line.split(' ')

    const outcome = shapes[opp].indexOf(my) + 1
    //console.log(outcome, opp, my, shapes[my])
    score += shapes[my] + outcome
  }

  console.log(score)
}

fs.readFile('input-2.txt', getResult)
fs.readFile('input-2.txt', getResult2)
