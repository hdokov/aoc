import fs from 'fs'

const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`

function getResult(_err, data) {
  let sum = 0
  //data = input

  for (const line of data.toString().split('\n')) {
    if (line === '') {
      continue
    }

    const first = line.substring(0, line.length / 2).split('')
    const second = line.substring(line.length / 2).split('')

    const item = first.filter(c => second.includes(c))[0]
    const val = item.charCodeAt(0) < 91 ? item.charCodeAt(0) - 38 : item.charCodeAt(0) - 96
    //console.log(item)

    sum += val
  }

  console.log(sum)
}

function getResult2(_err, data) {
  let sum = 0
  //data = input

  let currentGroup = []
  for (const [i, line] of data.toString().split('\n').entries()) {
    if (line === '') {
      continue
    }

    if ((i + 1) % 3 === 0) {
      currentGroup.push(line)

      const badge = currentGroup[0]
        .split('')
        .filter(c => currentGroup[1].includes(c))
        .filter(c => currentGroup[2].includes(c))[0]

      sum += badge.charCodeAt(0) < 91 ? badge.charCodeAt(0) - 38 : badge.charCodeAt(0) - 96
      currentGroup = []
    } else {
      currentGroup.push(line)
    }
  }

  console.log(sum)
}

fs.readFile('input-3.txt', getResult)
fs.readFile('input-3.txt', getResult2)
