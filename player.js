l = console.log();

function toNum(c) {
    switch(c) {
        case 'J':
            return 11;
            break;
        case 'Q':
            return 12;
            break;
        case 'K':
            return 13;
            break;
        case 'A':
            return 14;
            break;

        default:
            return card
    }
}

module.exports = {

    VERSION: "Jofogas's Zsozsobot v3",

  compute_avg_stack: function(players) {
      var sum = 0;
      for (var i in players) {
          sum += players.stack;
      }
      return sum / players.count;
  },

  bet_request: function(g) {
    var myself = g.players[g.in_action];

    if (myself.status != "active") {
        return "OK";
    }
    if (myself.hole_cards[1].rank == myself.hole_cards[1].rank) {
        return myself.stack;
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
        return 'what is this for?';
    }
};
