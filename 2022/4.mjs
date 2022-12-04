import fs from 'fs'

const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`

function getResult(_err, data) {
  let cnt = 0
  //data = input

  for (const line of data.toString().split('\n')) {
    if (line === '') {
      continue
    }

    const [first, second] = line.split(',').map(p => p.split('-').map(Number))

    const combined = first.concat(second).sort((a, b) => a - b)
    const compare = [combined[0], combined[combined.length - 1]].join('-')

    if (first.join('-') === compare || second.join('-') === compare) {
      cnt += 1
    }
  }

  console.log(cnt)
}

function getResult2(_err, data) {
  let cnt = 0
  //data = input

  for (const line of data.toString().split('\n')) {
    if (line === '') {
      continue
    }

    const [first, second] = line.split(',').map(p => p.split('-').map(Number))

    if (
      (first[0] <= second[0] && first[1] >= second[0]) ||
      (first[0] <= second[1] && first[1] >= second[1]) ||
      (second[0] <= first[0] && second[1] >= first[0]) ||
      (second[0] <= first[1] && second[1] >= first[1])
    ) {
      //console.log(compare)
      cnt += 1
    }
  }

  console.log(cnt)
}

fs.readFile('input-4.txt', getResult)
fs.readFile('input-4.txt', getResult2)
