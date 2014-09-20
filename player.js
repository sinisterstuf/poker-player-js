l = console.log();

module.exports = {

    VERSION: "Jofogas's Zsozsobot v3.1",

  compute_avg_stack: function(players) {
      var sum = 0;
      for (var i in players) {
          sum += players.stack;
      }
      return sum / players.length;
  },

  bet_request: function(g) {
    var myself = g.players[g.in_action];

    if (myself.status != "active") {
        return "OK";
    }
    if (myself.hole_cards[1].rank == myself.hole_cards[1].rank) {
        return player.stack;
    }
    var average_stack = compute_avg_stack(g.players);

    if (myself.stack > average_stack) {
        /* brave */
        var bet = g.current_buy_in - myself["bet"] + g.minimum_raise * 2;
        l("fearlessly raising: ", bet);
        return bet;
    }
    else {
        /* tight */
        l("fearfully not raising: ", 0);
        return 0;
    }
  },

    showdown: function(g) {

    }
};
