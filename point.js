class Point {
  constructor({ x=0, y=0, mvp=false, name='anonymous' }) {
    this.x = x
    this.y = y
    this.mvp = mvp
    this.name = name
  }
}

module.exports = Point
