var rank = require('./rank');
var is_game_random = (Math.random() < 0.5);
var is_thrower = (is_game_random ? (Math.random() < 0.3) : false);

var l = console.log;

function toNum(c) {
    switch (c) {
        case 'J':
            return 11;
        case 'Q':
            return 12;
        case 'K':
            return 13;
        case 'A':
            return 14;

        default:
            return c;
    }
}

function compute_avg_stack(players) {
    var sum = 0;
    for (var i in players) {
        if (players[i].status == "active") {
            sum += players[i].stack;
        }
    }
    return sum / players.length;
}

function compute_chip_factor(g) {
    var average_stack = compute_avg_stack(g.players);
    var myself = g.players[g.in_action];

    var strength = (myself.stack > average_stack) ? (myself.stack / average_stack) : 0.5;

    if (g.current_buy_in < g.pot) {
        return strength;
    }
    else {
        return strength * g.pot / g.current_buy_in;
    }
}

function lameCards(cards) {
    // return TRUE if the cards are LAME
    l(
        "my cards: ",
        cards[0].rank,
        cards[0].suit,
        " ",
        cards[1].rank,
        cards[1].suit
     )

    if (
        (toNum(cards[0].rank) < 4 || toNum(cards[1].rank) < 4) &&
        cards[0].rank != cards[1].rank
       ) {
        return true
    } else {
        return false
    }
}

module.exports = {

    VERSION: "Jofogas's Zsozsobot v5.1",

  bet_request: function(g) {
    l("----", this.VERSION);
    l(new Date());
    var myself = g.players[g.in_action];
    var call = g.current_buy_in - myself["bet"];
    var raise = Math.round(call + g.current_buy_in * (1 + Math.random()));



    if (is_thrower) {
        throw "Random error";
    }
    if (is_game_random) {
      if ((toNum(myself.hole_cards[1].rank) > 9 && toNum(myself.hole_cards[0].rank) == toNum(myself.hole_cards[1].rank)) || Math.random() > 0.8) {
        l("Go all in");
        return myself.stack;
      }
      if (Math.random() > 0.8 || (g.current_buy_in <= g.small_blind * 4 && Math.random() > 0.3)) {
        l("call");
        return call;
      }
      else {
        l("fold");
        return 0;
      }
    }



    // just in case!!!
    if (myself.status != "active") {
        return "OK";
    }

    // don't bet before flop if our hand is crap
    if (g.community_cards.length < 1) {
        // we're before flop
        if (lameCards(myself.hole_cards)) {
            l("folding because cards too lame");
            return 0;
        } else {
            if (toNum(myself.hole_cards[1].rank) > 9 && toNum(myself.hole_cards[0].rank) > 9) {
              l("Go all in");
              return myself.stack;
            }
            if (compute_chip_factor(g) > 3) {
              l("calling because cards seem OK");
              return call;
            }
            else {
              l("folding because we are scared");
              return 0;
            }
        }
    }

    var average_stack = compute_avg_stack(g.players);
    l("Average stack is: ", average_stack);
    l("My stack is : ", myself.stack);
    l("chip_factor returns: ", compute_chip_factor(g));

    if (compute_chip_factor(g) > 3 || Math.random() > 0.6) {
        /* brave */
        l("fearlessly raising: ", raise);
        return raise;
    }
    else if (compute_avg_stack >= 1) {
        /* tight */
        l("calling because cards seem OK");
        return call;
    }
    else {
        /* tighter */
        l("fold");
        return 0;
    }
  },

    showdown: function(g) {
        return 'what is this for?';
    }
};
