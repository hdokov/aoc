import fs from 'fs'
import './enhanceArrays.mjs'

const input = `$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`
const data = fs.readFileSync('input-7.txt', 'utf-8')

const structure = {root: {size: 0}}
const currentPath = ['root']
data.split('\n').forEach(l => {
  if (l.startsWith('$')) {
    if (l.startsWith('$ cd')) {
      if (l.endsWith('..')) {
        currentPath.pop()
      } else {
        const dirName = l.split(' ').last()
        currentPath.push(dirName)
      }
    }
  } else {
    if (l.startsWith('dir')) {
      const name = l.split(' ').last()
      currentPath.dup().reduce((tree, d) => {
        if (d === currentPath.last()) {
          tree[d][name] = {size: 0}
        }
        return tree[d]
      }, structure)
    } else {
      const [size, _name] = l.split(' ')
      currentPath.reduce((tree, d) => {
        tree[d].size += Number(size)
        return tree[d]
      }, structure)
    }
  }
})

function childSizes(dir) {
  return Object.entries(dir)
    .filter(([k, v]) => k !== 'size')
    .map(([k, v]) => childSizes(v))
    .flat()
    .concat(dir.size)
}
// console.log(JSON.stringify(structure))
const sizes = childSizes(structure).filter(Boolean)
//console.log('sizes:', sizes)

console.log(
  'P1:',
  sizes.reduce((sum, size) => {
    if (size < 100000) {
      sum += size
    }
    return sum
  }, 0)
)

const spaceRemaining = 70000000 - structure.root.size
const spaceNeeded = 30000000 - spaceRemaining

console.log(
  'P2:',
  sizes
    .filter(s => s > spaceNeeded)
    .sortN()
    .first()
)
