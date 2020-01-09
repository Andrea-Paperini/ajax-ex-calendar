$(document).ready(function() {
    var data_iniziale = "2018-01-01";
    var moment_iniziale = moment(data_iniziale);
    // prendo i giorni del mese da visualizzare 1-31
    var giorni_mese = moment_iniziale.daysInMonth();
    // uso il ciclo for per appendere al calendario i giorni del mese partendo da 1 per arrivare al max a 31
    for (var i = 1; i <= giorni_mese; i++) {
        $("#calendario").append("<li>" + i + "</li>")
    }
});
