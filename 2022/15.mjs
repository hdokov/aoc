import fs from 'fs'
import './enhanceArrays.mjs'

const input = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`

const simulation = false

const data = simulation ? input : fs.readFileSync('input-15.txt', 'utf-8')

function distance(p1, p2) {
  return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1])
}

const points = data
  .split('\n')
  .map(l =>
    l
      .match(/([-\d]+)/g)
      .map(Number)
      .inGroupsOf(2)
  )
  .map(l => ({s: l[0], b: l[1], d: distance(l[0], l[1])}))

const [minX, maxX] = points.reduce((p, c) => [Math.min(p[0], c.s[0] - c.d), Math.max(p[1], c.s[0] + c.d)], [0, 0])
const row = simulation ? 10 : 2000000
let covered = 0
for (let i = minX; i <= maxX; i++) {
  if (points.some(p => distance(p.s, [i, row]) <= p.d) && !points.some(p => p.b[0] === i && p.b[1] === row)) {
    covered += 1
  }
}
console.log('P1:', covered)

const max = simulation ? 20 : 4000000

let b = undefined
const s = new Date()
for (let x = 0; x <= max; x++) {
  const sorted = points
    .map(p => {
      const xOffset = p.d - Math.abs(p.s[0] - x)

      if (xOffset < 0) return undefined

      return [Math.max(p.s[1] - xOffset, 0), Math.min(p.s[1] + xOffset, max)]
    })
    .filter(Boolean)
    .sort((a, b) => a[0] - b[0])
  sorted.reduce((c, n) => {
    if (c.length === 0) return n

    if (c[1] < n[0] - 1) {
      b = [x, n[0] - 1]
    }

    return [c[0], Math.max(c[1], n[1])]
  }, [])
  if (b) break
}
console.log('P2:', b, b[0] * 4000000 + b[1])
