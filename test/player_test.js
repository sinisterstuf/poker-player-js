var assert = require("assert")
var player = require('../player')
var game_state_sample = require("./data/game-state-example.json")

describe("player", function() {
    describe("#bet_request", function() {
        it("should return a number", function() {
            assert.equal(
                typeof(player.bet_request(JSON.parse( game_state_sample )).toString()),
                "number"
            )
        })
    })
})
