import fs from 'fs'

const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`

function getResult(_err, data) {
  let max = 0
  let current = 0
  for (const line of data.toString().split('\n')) {
    if (line === '') {
      max = current > max ? current : max
      current = 0
    } else {
      current += new Number(line)
    }
  }

  console.log(max)
}

function getResult2(_err, data) {
  let max1 = 0
  let max2 = 0
  let max3 = 0
  let current = 0
  for (const line of data.toString().split('\n')) {
    if (line === '') {
      if (current > max1) {
        max3 = max2
        max2 = max1
        max1 = current
      } else if (current > max2) {
        max3 = max2
        max2 = current
      } else if (current > max3) {
        max3 = current
      }
      //console.log(current, max1, max2, max3)
      current = 0
    } else {
      current += new Number(line)
    }
  }

  console.log(max1 + max2 + max3)
}

fs.readFile('input-1-1.txt', getResult)
fs.readFile('input-1-1.txt', getResult2)
