/**
 * Created by amarshanand on 27/7/17.
 */

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("compute").addEventListener('click', function() {
        try {
            var result = compute(document.getElementById("stdin").value.trim());
        } catch (err){
            document.getElementById("stdout").value = err; return;
        }
        var winStdout = result.winDividend ? "Win:"+result.winners[0]+":$"+result.winDividend+"\n" : "";
        var placeStdout = "";
        if(result.placeDividend) for(var i=0; i<3; i++)  placeStdout += "Place:"+result.winners[i]+":$"+result.placeDividend[i]+"\n";
        var exactaStdout = result.exactaDividend ? "Exacta:"+result.winners[0]+","+result.winners[1]+":$"+result.exactaDividend+"\n" : "";
        document.getElementById("stdout").value = winStdout+placeStdout+exactaStdout;
    });
});




