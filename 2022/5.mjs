import fs from 'fs'
import './enhanceArrays.mjs'

const input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`
const transpose = m => m[0].map((x, i) => m.map(x => x[i]))
const data = fs.readFileSync('input-5.txt', 'utf-8')

const [crates, moves] = data.split(/\r?\n\r?\n/).filter(Boolean)

const crates2 = transpose(
  crates
    .split('\n')
    .reverse()
    .map(c => {
      const result = []
      for (const [i, line] of c.split('').entries()) {
        if (i === 1 || (i - 1) % 4 === 0) {
          result.push(line)
        }
      }
      return result
    })
).map(a => a.filter(e => e !== ' ' && isNaN(new Number(e))))

//console.log(crates2)

const moves2 = moves
  .split('\n')
  .filter(Boolean)
  .map(l =>
    l
      .split(/(move|from|to)/)
      .filter(l => l !== '' && !isNaN(new Number(l)))
      .map(n => new Number(n).valueOf())
  )
//console.log(moves2)

// Part 1
const cratesCopy = crates2.dup()
moves2.forEach(m => {
  for (let i = 0; i < m[0]; i++) {
    cratesCopy[m[2] - 1].push(cratesCopy[m[1] - 1].pop())
  }
})
//console.log(cratesCopy)
console.log('P1', cratesCopy.map(l => l[l.length - 1]).join(''))

// Part 2
moves2.forEach(m => {
  const moved = []
  for (let i = 0; i < m[0]; i++) {
    moved.push(crates2[m[1] - 1].pop())
  }
  //console.log(m, moved)
  crates2[m[2] - 1] = crates2[m[2] - 1].concat(moved.reverse())
})
//console.log(crates2)

console.log('P2', crates2.map(l => l[l.length - 1]).join(''))
