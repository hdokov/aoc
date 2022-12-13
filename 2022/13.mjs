import fs from 'fs'
import './enhanceArrays.mjs'

const input = ``
const data = fs.readFileSync('input-13.txt', 'utf-8')

const pairs = data.split('\n\n').map(p => p.split('\n').map(eval))

function compare(f, s) {
  if (!Array.isArray(f) && !Array.isArray(s)) {
    return f - s
  } else if (!Array.isArray(f)) {
    return compare(Array.of(f), s)
  } else if (!Array.isArray(s)) {
    return compare(f, Array.of(s))
  } else {
    for (let i = 0; i < Math.min(f.length, s.length); i++) {
      const result = compare(f[i], s[i])
      if (result !== 0) {
        return result
      }
    }
    return f.length - s.length
  }
}

console.log(
  'P1:',
  pairs
    .map(([f, s], i) => {
      const r = compare(f, s)
      //console.log(f, s, r)
      return r < 0 ? i + 1 : 0
    })
    .reduce((a, b) => a + b, 0)
)

const control = [[[2]], [[6]]]
console.log(
  'P2:',
  data
    .split('\n')
    .filter(Boolean)
    .map(eval)
    .concat(control)
    .sort(compare)
    .map((l, i) => {
      //console.log(l, i)
      const s = JSON.stringify(l)
      return control.map(JSON.stringify).includes(s) ? i + 1 : 0
    })
    .filter(n => n > 0)
    .reduce((a, b) => a * b, 1)
)
