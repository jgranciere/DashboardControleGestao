import React, { useState, useEffect } from 'react';

const DateTimeDisplay = () => {
  const [dataHoraAtual, setDataHoraAtual] = useState('');

  useEffect(() => {
          const atualizarDataHora = () => {
              const agora = new Date();
  
              const dia = agora.getDate().toString().padStart(2, '0');
              const nomeMes = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(agora);
              const ano = agora.getFullYear();
  
              const horas = agora.getHours().toString().padStart(2, '0');
              const minutos = agora.getMinutes().toString().padStart(2, '0');
  
              setDataHoraAtual(`${dia} de ${nomeMes} de ${ano} | ${horas}:${minutos}`)
          };
  
          atualizarDataHora();
          const intervalo = setInterval(atualizarDataHora, 1000);
  
          return () => clearInterval(intervalo);
      }, []);

  return (
    <span>{dataHoraAtual}</span>
  );
}

export default DateTimeDisplay;