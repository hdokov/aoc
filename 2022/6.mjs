import fs from 'fs'
import './enhanceArrays.mjs'

const input = `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`
const data = fs.readFileSync('input-6.txt', 'utf-8')

const signal = data.split('')

for (let i = 3; i < signal.length; i++) {
  const slice = signal.slice(i - 4, i)
  if (slice.unique().length === 4) {
    console.log('P1:', i)
    break
  }
}

for (let i = 13; i < signal.length; i++) {
  const slice = signal.slice(i - 14, i)
  if (slice.unique().length === 14) {
    console.log('P2:', i)
    break
  }
}
