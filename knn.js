
/**
 * Calcula la distancia euclideana entre dos puntos.
 * 
 * @param Point pointA El punto base
 * @param Point pointB El punto final sobre el cual se calculara la distancia
 * @return La distancia entre los dos puntos - de tipo {Number}
 */
const euclideanDistanceFromAToB = ({ pointA, pointB }) => {
  const x1 = pointA.x
  const y1 = pointA.y
  const x2 = pointB.x
  const y2 = pointB.y
  
  const sum = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)
  
  return Math.sqrt(sum)
}

const classify = ({ point, k=3, labeledData }) => {

  // obtener todas las distancias
  const distances =
    labeledData.map(labeledPoint => {
        const distance = euclideanDistanceFromAToB({
          pointA: point,
          pointB: labeledPoint
        })

        // usamos la distancia para ordenar
        // y la clase para deducir posteriormente
        return { distance, label: labeledPoint.mvp }
      }
    )

  // considerar que la cantidad de elementos tal vez sea menor que K
  const realK = Math.min(distances.length, k)
  console.log('using k', realK)

  // ordenar los resultados (podria ser mejor usando otro tipo de estructura de datos)
  const kNearestPoints = distances.sort((a, b) => a.distance - b.distance).slice(0, realK)

  return decideLabel(kNearestPoints)
}

const decideLabel = knn => {

  const labelCounter = {}

  let maxLabel = null
  let counter = 0

  // cuenta la ocurrencia de cada etiqueta
  knn.forEach(n => {
    labelCounter[n.label] = (labelCounter[n.label] || 0) + 1

    if (labelCounter[n.label] > counter) {
      counter = labelCounter[n.label]
      maxLabel = n.label
    }
  })

  // retornar la clasificacion
  return maxLabel
}

module.exports = { classify }

