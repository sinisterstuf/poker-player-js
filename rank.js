exports.groupBy = groupBy
exports.count = count
exports.rank = rank

function groupBy(array, key) {
  var resultMap = {}

  array.forEach(function(item) {
    var value = item[key];

    if (typeof resultMap[value] == "undefined") {
      resultMap[value] = []
    }

    resultMap[value].push(item)
  })

  return resultMap
}

function count(map) {
  var resultMap = {}

  for (key in map) {
    resultMap[key] = map[key].length
  }

  return resultMap;
}

function indexOf(map, needle) {
  for (key in map) {
    var item = map[key]

    if (item == needle)
      return key
  }

  return -1
}

function rank(cards) {
  var byRank = groupBy(cards, 'rank')
  var rankCounts = count(byRank)

  if (indexOf(rankCounts, 2) != -1)
    return ['pair']

  return []
}
