/**
 * Created by amarshanand on 27/7/17.
 */

// this function reads the contents of stdin, does its calculations, and dumps the final result
function compute(stdin) {

    var lines = stdin.split("\n");

    // we can compute much faster if we start with the results
    var winners = lines.pop().split(":");
    if(winners.length!=4 || winners[0]!=="Result")
        throw new Error("Fatal : last line is not the Result : "+lines[lines.length-1]);
    winners.shift(); // now, winners array tell us the winning horse# in sequence

    var win = {totalBetValue:0, winnersBetValue:0},
        place = {totalBetValue:0, winnersBetValue:[0,0,0]},
        exacta = {totalBetValue:0, winnersBetValue:0};

    for(var i=0; i<lines.length; i++) {

        var tokens = lines[i].split(":");
        if(tokens.length!=4 || tokens[0]!=="Bet") { console.log("Ignoring bad line : "+lines[i]); continue; }

        // format of the line is : BET:<product>:<selections>:<stake>
        var prod=tokens[1], horse=tokens[2], stake=tokens[3];

        if(prod==="W") {
            win.totalBetValue += parseFloat(stake);
            if(horse==winners[0]) win.winnersBetValue += parseFloat(stake);
        } else

        if(prod==="P") {
            place.totalBetValue += parseFloat(stake);
            var position = winners.indexOf(horse);
            if(position>=0) place.winnersBetValue[position] += parseFloat(stake);
        } else

        if(prod==="E") {
            exacta.totalBetValue += parseFloat(stake);
            var horseInOrder = horse.split(',');
            if(horseInOrder[0]==winners[0] && horseInOrder[1]==winners[1]) exacta.winnersBetValue += parseFloat(stake);
        }

    }

    var result = {winners:winners};

    if(win.totalBetValue>0) result.winDividend = ((1-0.15)*win.totalBetValue / win.winnersBetValue).toFixed(2);

    var placeTotalDividend = (1-0.12)*place.totalBetValue / 3;
    if(place.totalBetValue>0) result.placeDividend = place.winnersBetValue.map(function(bet){ return (placeTotalDividend/bet).toFixed(2) });

    if(exacta.totalBetValue>0) result.exactaDividend = ((1-0.18)*exacta.totalBetValue / exacta.winnersBetValue).toFixed(2);

    return result;

}



























