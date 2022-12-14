import fs from 'fs'
import './enhanceArrays.mjs'

const input = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`
const data = fs.readFileSync('input-11.txt', 'utf-8')

const monkeys = data.split('\n\n').map(s => {
  const [name, items, operation, test, t, f] = s.split('\n')
  return {
    name: name.split(':').first().toLowerCase(),
    items: items.split(': ').last().split(',').map(Number),
    operation: operation.split('new = ').last(),
    test: Number(test.split('by ').last()),
    t: t.split('to ').last(),
    f: f.split('to ').last(),
    inspects: 0
  }
})

for (let k = 0; k < 20; k++) {
  monkeys.forEach(m => {
    let old = m.items.shift()
    while (old) {
      const n = Math.floor(eval(m.operation) / 3)
      const next = n % m.test === 0 ? m.t : m.f
      monkeys.find(m1 => m1.name === next).items.push(n)
      m.inspects += 1
      old = m.items.shift()
    }
  })
}
console.log(
  'P1:',
  monkeys
    .map(m => m.inspects)
    .sortN()
    .last(2)
    .reduce((a, b) => a * b, 1)
)

const monkeys2 = data.split('\n\n').map(s => {
  const [name, items, operation, test, t, f] = s.split('\n')
  return {
    name: name.split(':').first().toLowerCase(),
    items: items.split(': ').last().split(',').map(Number),
    operation: operation.split('new = ').last(),
    test: Number(test.split('by ').last()),
    t: t.split('to ').last(),
    f: f.split('to ').last(),
    inspects: 0
  }
})

const denominator = monkeys2.map(m => m.test).reduce((a, b) => a * b, 1)
//console.log(monkeys2, eval('(3/100)'))
for (let k = 0; k < 10000; k++) {
  monkeys2.forEach(m => {
    let old = m.items.shift()
    while (old) {
      let n = eval(m.operation)
      const next = n % m.test === 0 ? m.t : m.f

      if (n > denominator) {
        n = n % denominator
      }

      monkeys2.find(m1 => m1.name === next).items.push(n)
      m.inspects += 1
      old = m.items.shift()
    }
  })
}
//console.log(new Date() - start)
console.log(
  'P2:',
  monkeys2.map(m => `${m.name}: ${m.inspects}`),
  monkeys2
    .map(m => m.inspects)
    .sortN()
    .last(2)
    .reduce((a, b) => a * b, 1)
)
