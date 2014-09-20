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
            return card
    }
}

function compute_avg_stack(players) {
    var sum = 0;
    for (var i in players) {
        sum += players.stack;
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

module.exports = {

    VERSION: "Jofogas's Zsozsobot v3.3",

  bet_request: function(g) {
    var myself = g.players[g.in_action];

    // just in case!!!
    if (myself.status != "active") {
        return "OK";
    }
    if (myself.hole_cards[0].rank == myself.hole_cards[1].rank) {
        l("Go all in");
        return myself.stack;
    }
    var average_stack = compute_avg_stack(g.players);
    l("Average stack is: ", average_stack); 
    l("My stack is : ", myself.stack);
    l("chip_factor returns: ", compute_chip_factor(g));

    if (myself.stack > average_stack * 0.7) {
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
