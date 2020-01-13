$(document).ready(function() {
    var api_url = 'https://flynn.boolean.careers/exercises/api/holidays';
    // uso handlebars per utilizzare le variabili nell html per la data -- migliorare la visibilità dello script
    var template_html = $("#giorno-template").html();
    var template_function = Handlebars.compile(template_html);
    var data_iniziale = "2018-01-01";
    var moment_data = moment(data_iniziale);
    // creo 2 variabili per stabilire la fine e l'inizio del calendario per il controllo
    var inizio_calendario = "2018-01-01";
    var fine_calendario = "2018-12-01";
    stampa_festivita(moment_data);
    // visualizzo il calendario di gennaio
    stampa_mese(moment_data);
    // intercetto il click su next
    $("#mese_next").click(function() {
        // controllo se la data diventa dell'anno nuovo
        if (moment_data.isSameOrAfter(fine_calendario)) {
            // stampo un errore nel caso in cui la data non rientra nell'anno 2018
            alert("Mese non disponibile");
            $(this).prop("disabled", true);
        } else {
            // aggiungo un mese
            moment_data.add(1, "months");
            // visualizzo il calendario aggiornato
            stampa_mese(moment_data);
            stampa_festivita(moment_data);
            $("#mese_prev").prop("disabled", false);
        }
    });
    // Intercetto il click sul mese Precedente
    $("#mese_prev").click(function() {
        // controllo se la data diventa dell'anno precendente
        if (moment_data.month() === 0) {
            // stampo un errore nel caso in cui la data non rientra nell'anno 2018
            alert("Mese non disponibile");
            $(this).prop("disabled", true);
        } else {
            // tolgo un mese
            moment_data.subtract(1, "months");
            // visualizzo il calendario aggiornato
            stampa_mese(moment_data);
            stampa_festivita(moment_data);
            $("#mese_next").prop("disabled", false);
        }
    });

    function stampa_mese(data_mese) {
        // svuoto il calendario
        $("#calendario").empty()
        // clono la data del mese per sommare i giorni
        var data_mese_giorno = moment(data_mese);
        // prendo i giorni del mese da visualizzare 1-31
        var giorni_mese = data_mese.daysInMonth();
        var mese_testuale = data_mese.format("MMMM");
        // imposto il titolo con il mese corrente
        $("#mese-corrente").text(mese_testuale);
        // uso il ciclo for per appendere al calendario i giorni del mese partendo da 1 per arrivare al max a 31
        for (var i = 1; i <= giorni_mese; i++) {
            // creo il context con la variabile
            var context = {
                day: i + " " + mese_testuale,
                // stabilisco il formato
                standard_day: data_mese_giorno.format("YYYY-MM-DD")
            };
            // salvo il contenuto in html_finale
            var html_finale = template_function(context);
            // appendo il contenuto html finale salvato nel calendario
            $("#calendario").append(html_finale);
            data_mese_giorno.add(1, "days");
        }
    }

    function stampa_festivita(data_mese) {
        // chiamata ajax per le festività del mese corrente
        $.ajax({
            'url': api_url,
            'method': 'GET',
            'data': {
                'year': 2018,
                'month': moment_data.month()
            },
            'success': function(data) {
                var festivita = data.response;
                for (var i = 0; i < festivita.length; i++) {
                    var festivita_corrente = festivita[i];
                    var data_festa = festivita_corrente.date;
                    // recupero la data della festività
                    var nome_festa = festivita_corrente.name;
                    // recupero il nome della festività
                    // scorro tutti gli li e controllo il data
                    $("#calendario li").each(function() {
                        // recupero il giorno di li
                        var giorno_li = $(this).attr("data-giorno")
                        // verifico se il giorno del calendario è un giorno di festa
                        if (giorno_li == data_festa) {
                            // se lo è, aggiungo la classe festa (inserisce il colore rosso), e il nome della festa, recuperato in precendenza
                            $(this).addClass("festa");
                            $(this).append(" - " + nome_festa);
                        }
                    })
                }
                console.log(festivita);
            },
            'error': function() {
                // avviso nel caso si verifichi un errore nel collegamento con l'API
                alert('errore');
            }
        })
    }
});
