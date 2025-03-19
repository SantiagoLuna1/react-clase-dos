import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './Memotest.css';
import FancyButton from '../small/FancyButton';
import imagen1 from './Imagenes-memotest/bullbasaur.png';
import imagen2 from './Imagenes-memotest/charmander.png';
import imagen3 from './Imagenes-memotest/eevee.png';
import imagen4 from './Imagenes-memotest/meowth.png';
import imagen5 from './Imagenes-memotest/pidgey.png';
import imagen6 from './Imagenes-memotest/pikachu.png';
import imagen7 from './Imagenes-memotest/squirtle.png';
import imagen8 from './Imagenes-memotest/venonat.png';

//componente carta
const Carta = ({ imagen, volteada, onClick }) => {
  return (
    <div className={cx('carta', { 'carta--volteada': volteada })} onClick={onClick}>
      {volteada ? <img src={imagen} alt="Carta" /> : <div className="carta-reverso" />}
    </div>
  );
};

Carta.propTypes = {
  imagen: PropTypes.string.isRequired,
  volteada: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

//componente mensaje
const MensajeGanador = ({ show, onRestart }) => {
  return (
    <div className={cx("mensaje-ganador", { "mensaje-ganador--oculto": !show })}>
      <span className="mensaje-ganador-texto"> ¡Has ganado!</span>
      <FancyButton onClick={onRestart}>Jugar de nuevo</FancyButton>
    </div>
  );
};

MensajeGanador.propTypes = {
  show: PropTypes.bool.isRequired,
  onRestart: PropTypes.func.isRequired,
};

const useMemotestState = () => {
  const imagenes = [imagen1, imagen2, imagen3, imagen4, imagen5, imagen6, imagen7, imagen8];
  const duplicarImagenes = [...imagenes, ...imagenes]; 
  const mezclarCartas = duplicarImagenes.sort(() => Math.random() - 0.5);

  const [cartas, setCartas] = useState(mezclarCartas);
  const [cartasVolteadas, setCartasVolteadas] = useState([]);
  const [cartasEmparejadas, setCartasEmparejadas] = useState([]);

  //funcion para voltear una carta
  const voltearCarta = (index) => {
    if(cartasVolteadas.length === 2 || cartasVolteadas.includes(index)) return;
    
    const nuevasCartasVolteadas = [...cartasVolteadas, index];
    setCartasVolteadas(nuevasCartasVolteadas);

    if(nuevasCartasVolteadas.length === 2) {
      const [primerIndex, segundoIndex] = nuevasCartasVolteadas;
      if(cartas[primerIndex] === cartas[segundoIndex]) {
        setCartasEmparejadas((prev) => [...prev, cartas[primerIndex]]);
      } 

      setTimeout(() => {
        setCartasVolteadas([]);
      }, 1000);
    }
  };

  const resetearJuego = () => {
    const mezclarCartas = duplicarImagenes.sort(() => Math.random() - 0.5);
    setCartas(mezclarCartas);
    setCartasVolteadas([]);
    setCartasEmparejadas([]);
  };

  return { cartas, cartasVolteadas, cartasEmparejadas, voltearCarta, resetearJuego };
}

const Memotest = () => {
  const {cartas, cartasVolteadas, cartasEmparejadas, voltearCarta, resetearJuego} = useMemotestState();
  const juegoGanado = cartasEmparejadas.length === cartas.length / 2;

  return(
    <div className='memotest-contenedor'>
      <div className='tablero'>
        {cartas.map((imagen, index) =>(
          <Carta 
            key={index}
            imagen={imagen}
            volteada={cartasVolteadas.includes(index) || cartasEmparejadas.includes(imagen)}
            onClick={() => voltearCarta(index)}
          />
        ))}
      <MensajeGanador show={juegoGanado} onRestart={resetearJuego} />
      </div>
    </div>
  )
};

export default Memotest;
