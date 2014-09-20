console.log(Math.random());
var rank = require('./rank');

l = console.log;

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

    VERSION: "Jofogas's Zsozsobot v4.5",

  bet_request: function(g) {
    l("----", this.VERSION);
    l(new Date());
    var myself = g.players[g.in_action];
    var call = g.current_buy_in - myself["bet"];
    var raise = Math.round(call + g.current_buy_in * (1 + Math.random()));

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
            if (toNum(myself.hole_cards[0].rank) > 9) {
              l("Go all in");
              return myself.stack;
            }
            l("calling because cards seem OK");
            return call;
        }
    }

    var average_stack = compute_avg_stack(g.players);
    l("Average stack is: ", average_stack);
    l("My stack is : ", myself.stack);
    l("chip_factor returns: ", compute_chip_factor(g));

    if (myself.stack > average_stack * 0.99 || Math.random() > 0.6) {
        /* brave */
        l("fearlessly raising: ", raise);
        return raise;
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
