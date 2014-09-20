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

function keyOf(array, needle, first_index) {
  if (typeof first_index == "undefined")
    first_index = 0

  for (var index = first_index; index < array.length; index++) {
    var item = array[index]

    if (item == needle)
      return key
  }

  return -1
}

function rank(cards) {
  var byRank = groupBy(cards, 'rank')
  var bySuit = groupBy(cards, 'suit')
  var rankCounts = count(byRank)
  var suitCounts = count(bySuit)
  var result = []

  var numberOfPairs = 0
  var hasFlush = false

  for (var rank in rankCounts) {
    if (rankCounts[rank] == 2) {
      numberOfPairs++
    }
  }

  for (var suit in suitCounts) {
    if (suitCounts[suit] == 5 ||
        suitCounts[suit] == 6 ||
        suitCounts[suit] == 7)
    {
      hasFlush = true
    }
  }

  if (numberOfPairs > 0) {
    if (numberOfPairs > 1) {
      result.push('two_pairs')
    } else {
      result.push('pair')
    }
  }

  if (hasFlush) {
    result.push('flush')
  }

  return result
}
