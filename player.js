l = console.log();

module.exports = {

    VERSION: "Jofogas's Zsozsobot v2",

    bet_request: function(g) {
        bet = g.current_buy_in - g.players[g.in_action]["bet"] + g.minimum_raise;
        l("fearlessly raising: ", bet);
        return bet;
    },

    showdown: function(g) {

    }
};
