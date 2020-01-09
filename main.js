$(document).ready(function() {
    // uso handlebars per utilizzare le variabili nell html per la data -- migliorare la visibilità dello script
    var template_html = $("#giorno-template").html();
    var template_function = Handlebars.compile(template_html);
    var data_iniziale = "2018-01-01";
    var moment_iniziale = moment(data_iniziale);
    // visualizzo il calendario di gennaio
    stampa_mese(moment_iniziale);
    // intercetto il click su next
    $("#mese_next").click(function() {
        // aggiungo un mese
        moment_iniziale.add(1, "months");
        // visualizzo il calendario aggiornato
        stampa_mese(moment_iniziale);
    });
    // Intercetto il click sul mese Precedente
    $("#mese_prev").click(function() {
        // tolgo un mese
        moment_iniziale.subtract(1, "months");
        // visualizzo il calendario aggiornato
        stampa_mese(moment_iniziale);
    });

    function stampa_mese(data_mese) {
        // svuoto il calendario
        $("#calendario").empty()
        // prendo i giorni del mese da visualizzare 1-31
        var giorni_mese = data_mese.daysInMonth();
        var mese_testuale = data_mese.format("MMMM");
        // imposto il titolo con il mese corrente
        $("#mese-corrente").text(mese_testuale);
        // uso il ciclo for per appendere al calendario i giorni del mese partendo da 1 per arrivare al max a 31
        for (var i = 1; i <= giorni_mese; i++) {
            // creo il context con la variabile
            var context = {
                day: i + " " + mese_testuale
            };
            // salvo il contenuto in html_finale
            var html_finale = template_function(context);
            // appendo il contenuto html finale salvato nel calendario
            $("#calendario").append(html_finale)
        }
    }
});
