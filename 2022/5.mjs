import fs from 'fs'

const data = fs.readFileSync('input-5.txt', 'utf-8').split(/\r?\n/).filter(Boolean)
// .map(s => s.split(',').map(s => s.split('-').map(Number)))
