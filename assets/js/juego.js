/**
 * 2C = Two of Clubs (Treboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

(() => { // Patron Modulo
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];
    let puntosJugador = 0,
        puntosComputadora = 0;

    //Referencias de HTML
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector ('#btnDetener');
    const btnNuevoJuego = document.querySelector ('#btnNuevoJuego');

    const divCartasJugador = document.querySelector('#jugador-cartas');
    const divCartasComputadora = document.querySelector('#computadora-cartas');
    const puntosHtml = document.querySelectorAll('small');


    //Esta funcion crea un anueva baraja
    const crearDeck = () => {
        for (let i = 2; i <= 10; i++){
            for (let tipo of tipos){
                deck.push( i + tipo);
            }
        }

        for (let tipo of tipos){
            for(let esp of especiales){
                deck.push(esp + tipo);
            }
        }

        //console.log( deck );

        deck = _.shuffle(deck);
        //console.log(deck);
        return deck;
    }

    crearDeck ();

    //Esta funcion me permite tomar una carta
    const pedirCarta = () => {
        if( deck.length === 0){
            throw 'No hay cartas en el deck';
        }

        const carta = deck.pop();

        //console.log(deck);
        //console.log(carta); // carta debe ser de la baraja
        return carta;
    }

    pedirCarta();

    //Funcion para saber el valor de la carta
    const valorCarta = ( carta ) =>{

        const valor = carta.substring (0, carta.length - 1);
        return (isNaN ( valor )) ?
                ( valor === 'A') ? 11 : 10
                : valor * 1;
    }

    const valor = valorCarta(pedirCarta());
    console.log({valor});

    //Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {

        do {

            const carta = pedirCarta();

            puntosComputadora = puntosComputadora + valorCarta(carta);
            puntosHtml[0].innerText = ('Puntuacion: ' + puntosComputadora);
        
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasComputadora.append(imgCarta);

            if (puntosMinimos > 21){
                break;
            } else if (puntosComputadora === 21)
            console.warn('F, la maquina te humillo con su 21');
            

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));


        
        
    }

    //Eventos
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        btnNuevoJuego.disabled = true;

        puntosJugador = puntosJugador + valorCarta(carta);
        puntosHtml[1].innerText = ('Puntuacion: ' + puntosJugador);

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugador.append(imgCarta);

        if(puntosJugador > 21){
            console.warn('Lo siento mucho, te pasaste, gana la IA');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
            

        } else if (puntosJugador === 21){
            console.warn('21, genial');
            console.warn('Jugador gana con 21');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
        if (puntosJugador >= 21){
            btnNuevoJuego.disabled = false;
        }
    });

    btnDetener.addEventListener('click', () => {
        
        btnPedir.disabled = true;
        turnoComputadora(puntosJugador);
        btnDetener.disabled = true;
        btnNuevoJuego.disabled = false;

        if (puntosComputadora > 21){
            console.warn('Felicidades le ganaste a la IA ya que saco mas de 21');
            
        } else if ((puntosComputadora >= puntosJugador) && (puntosComputadora < 21)  ){
            console.warn('F te gano una maquina');
            
        } 
    });

    btnNuevoJuego.addEventListener('click', () => {

        console.clear();
        deck = crearDeck();
        //deck = [];

        puntosComputadora = 0;
        puntosJugador = 0;

        puntosHtml[0].innerText = 'Puntuacion 0';
        puntosHtml[1].innerText = 'Puntuacion 0';

        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    });
    


})();



