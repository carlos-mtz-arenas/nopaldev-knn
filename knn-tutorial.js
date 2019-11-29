const Point = require('./point.js')
const { classify } = require('./knn.js')

const { readFile } = require('fs')

readFile('./sample_data1.csv', 'utf8', (err, content) => {

  if (err) {
    console.error('Could not open file', err)
    return false
  }

  // conseguir todas las filas
  const rows = content.trim().split('\n')

  // transformar la informacion, excepto las cabeceras
  const labeledData = convertDataToPoints(rows.slice(1, rows.length))

  // crear una de nuestras observaciones (jose, por ejemplo)
  const dev1 = new Point({ x: 6, y: 2, name: 'jose' })
  const dev2 = new Point({ x: 8, y: 3, name: 'miguel' })
  const dev3 = new Point({ x: 7, y: 1, name: 'nancy' })

  new Array(dev1, dev2, dev3).forEach( developer => {
    const outputLabel = classify({
      point: developer,
      labeledData
    })

    console.log(`developer ${developer.name} is mvp? ${outputLabel}`)
  })

})

const convertDataToPoints = (data) => {

  const points = data.map(row => {
    const cols = row.split(',')
    const p = new Point(
      {
        name: cols[0],
        x: cols[1],
        y: cols[2],
        mvp: cols[3] === 'true'
      }) 

    return p
  })

  return points
}
