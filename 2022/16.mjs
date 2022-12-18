import fs from 'fs'
import {exit} from 'process'
import './enhanceArrays.mjs'

const input = `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`

const simulation = false
const s = new Date()

const data = simulation ? input : fs.readFileSync('16.txt', 'utf-8')

const points = data.split('\n').map(l => {
  const [valve, debit, ...leadsTo] = l.match(/([A-Z]{2})|(\d+)/g)
  return {valve, debit: Number(debit), leadsTo}
})
const pointsMap = points.reduce((o, p) => ({...o, [p.valve]: p}), {})
//console.log(points)

const meaningfulPoints = points.filter(p => p.debit > 0).sort((a, b) => b.debit - a.debit)
//console.log(meaningfulPoints)
function shortestPath(from, to, visited) {
  visited.push(from.valve)
  //console.log(from.valve, visited, k)
  if (from.leadsTo.includes(to.valve)) return visited.length

  const toVisit = from.leadsTo.filter(p => !visited.includes(p))

  if (toVisit.length === 0) return 1000

  return Math.min(...toVisit.map(i => shortestPath(pointsMap[i], to, [...visited])))
}

const mappedPoints = points
  .map(p => ({
    ...p,
    distance: meaningfulPoints
      .filter(p1 => p1.valve !== p.valve)
      .map(i => [i.valve, shortestPath(p, i, [])])
      .reduce((p, n) => ({...p, [n[0]]: n[1]}), {})
  }))
  .reduce((o, p) => ({...o, [p.valve]: p}), {})

console.log(mappedPoints)
console.log('mappedPoints', (new Date() - s) / 1000)

function visit(identifier, timeRemaining, visited) {
  if (timeRemaining < 2) return 0
  const point = mappedPoints[identifier]
  visited.push(identifier)
  if (point.debit > 0) {
    timeRemaining -= 1
  }
  return (
    timeRemaining * point.debit +
    Math.max(
      ...meaningfulPoints
        .filter(p => !visited.includes(p.valve))
        .map(p => visit(p.valve, timeRemaining - point.distance[p.valve], [...visited])),
      0
    )
  )
}

let k = 0
function doubleVisit(identifier1, identifier2, timeRemaining1, timeRemaining2, visited) {
  k++
  if (k > 3000000000) {
    console.log('boom')
    exit('boom')
  }
  if (k % 100000 === 0) {
    console.log(k / 1000)
  }
  const p1 = mappedPoints[identifier1]
  const p2 = mappedPoints[identifier2]
  //console.log(k, identifier, visited, timeRemaining)
  const nv = [...visited, identifier1, identifier2]
  if (p1.debit > 0) {
    timeRemaining1 -= 1
  }
  if (p2.debit > 0) {
    timeRemaining2 -= 1
  }

  const rmp = meaningfulPoints.filter(p => !nv.includes(p.valve)).first(10)

  let result = timeRemaining1 * p1.debit + timeRemaining2 * p2.debit

  if (rmp.length === 1) {
    result += Math.max(timeRemaining1 - 1 - p1.distance[rmp[0].valve], timeRemaining2 - 1 - p2.distance[rmp[0].valve])
  } else if (rmp.length > 1) {
    const toVisit = rmp.map((p1, i1) => {
      return rmp
        .map((p2, i2) => {
          if (i1 === i2) return undefined

          return [p1, p2]
        })
        .filter(Boolean)
    })
    result += Math.max(
      ...toVisit.flat().map(([np1, np2]) => {
        const t1 = timeRemaining1 - p1.distance[np1.valve]
        const t2 = timeRemaining2 - p2.distance[np2.valve]

        if (t1 < 2 && t2 < 2) {
          //console.log(0, visited, rmp)
          return 0
        }

        if (t1 < 2) return visit(p2.valve, t2, nv)
        if (t2 < 2) return visit(p1.valve, t1, nv)

        return doubleVisit(np1.valve, np2.valve, t1, t2, nv)
      }),
      0
    )
  }

  return result
}

console.log('P1:', visit('AA', 30, []), (new Date() - s) / 1000)
console.log('P2:', doubleVisit('AA', 'AA', 26, 26, []), (new Date() - s) / 1000)
//2776 high
