import fs from 'fs'

function getResult(_err, data) {
  console.log(data.toString())
}

fs.readFile('1.mjs', getResult)
