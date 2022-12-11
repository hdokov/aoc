Array.prototype.transpose = function () {
  return this[0].map((x, i) => this.map(x => x[i]))
}

Array.prototype.last = function (size) {
  if (size) {
    return this.slice(this.length - size, this.length)
  } else {
    return this[this.length - 1]
  }
}

Array.prototype.first = function (size) {
  if (size) {
    return this.slice(0, size)
  } else {
    return this[0]
  }
}

Array.prototype.intersection = function (other) {
  return this.filter(e => other.includes(e))
}

Array.prototype.exclude = function (other) {
  return this.filter(e => !other.includes(e))
}

Array.prototype.unique = function () {
  return [...new Set(this)]
}

Array.prototype.sortN = function () {
  return this.sort((a, b) => a - b)
}

Array.prototype.inGroupsOf = function (size, callback) {
  const result = []
  size = size ? size : 1
  for (const i of this.keys()) {
    if ((i + 1) % size === 0) {
      const group = this.slice(i - size + 1, i + 1)
      callback && callback(group)
      result.push(group)
    }
  }
  return result
}

Array.prototype.dup = function () {
  return JSON.parse(JSON.stringify(this))
}

export default ''
//console.log([1, 2, 3, 4, 5, 6].inGroupsOf(2, g => console.log('g', g)))
