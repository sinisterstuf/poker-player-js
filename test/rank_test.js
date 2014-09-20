var assert = require("assert")
var rank = require("../rank.js")

function card(str) {
  var SUITS = {'s': 'spades', 'h': 'hearts', 'd': 'diamonds', 'c': 'clubs'}

  if (str.length != 2)
    assert.fail(str.length, 2, "String length must be 2")

  return {'suit': SUITS[str.charAt(0).toLowerCase()], 'rank': str.charAt(1).toUpperCase()}
}

function cards() {
  return Array.prototype.map.call(arguments, function(item) {
    return card(item)
  })
}

describe("rank", function() {
  describe("#groupBy", function() {
    it("should return empty map for empty array", function() {
      assert.deepEqual(rank.groupBy([], 'a'), {})
    })

    it("should group items", function() {
      var input = [{a: 1}, {a: 1, b: 2}, {a: 3}, {a: 5}]
      var expected = {'1': [{a: 1}, {a: 1, b: 2}], '3': [{a: 3}], '5': [{a: 5}]}
      assert.deepEqual(rank.groupBy(input, 'a'), expected)
    })
  })

  describe("#count", function() {
    it("should return empty map for empty array", function() {
      assert.deepEqual(rank.groupBy([], 'a'), {})
    })

    it("should count items", function() {
      var input = {'1': [{a: 1}, {a: 1, b: 2}], '3': [{a: 3}], '5': [{a: 5}]}
      var expected = {'1': 2, '3': 1, '5': 1}
      assert.deepEqual(rank.count(input, 'a'), expected)
    })
  })

  describe("#rank", function() {
    it("should return nothing on empty input", function() {
      assert.deepEqual(rank.rank([]), [])
    })

    it("should return nothing for cards smaller than 9", function() {
      assert.deepEqual(rank.rank([card('H5'), card('S6')]), [])
    })

    it("should return pair for pairs", function() {
      assert.deepEqual(rank.rank([card("H5"), card("S5")]), ['pair'])
    })

    it("should return two pairs in case of two pairs", function() {
      assert.deepEqual(rank.rank(cards("C3", "S1", "H2", "D1", "D2")), ['two_pairs'])
    })

    it("should return flush if there's at least five cards and they are in the same suit", function() {
      assert.deepEqual(rank.rank(cards("H2", "H4", "H6", "H7", "H8")), ['flush'])
    })
  })
})
