Array.prototype.transpose = function () {
  return this[0].map((x, i) => this.map(x => x[i]))
}

Array.prototype.last = function (size) {
  const slice = size ? size : 1
  return this.slice(this.length - slice, this.length)
}

Array.prototype.first = function (size) {
  const slice = size ? size : 1
  return this.slice(0, slice)
}

Array.prototype.inGroupsOf = function (size, callback) {
  for (const i of this.keys()) {
    if ((i + 1) % size === 0) {
      callback(this.slice(i - size + 1, i + 1))
    }
  }
  return this
}

export default ''
//console.log([1, 2, 3, 4, 5, 6].inGroupsOf(2, g => console.log('g', g)))
