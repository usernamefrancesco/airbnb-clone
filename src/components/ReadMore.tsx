"use client";

import React, { useState } from "react";

export default function ReadMore() {
  const [bottone, setButton] = useState(false);

  return (
    <div>
      {bottone && (
        <div className="fixed inset-0 bg-black/50 opacity flex justify-center items-center z-50 shadow-2xl transition ">
          <div className="bg-white p-10 rounded-lg shadow-lg  lg:w-[600px] lg:h-[400px] relative w-full h-full">
            <button
              onClick={() => setButton(false)}
              className="absolute top-2 right-2 text-gray-500 hover:bg-gray-100 rounded-full py-1 px-2 transition"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4">
              A proposito di questo alloggio
            </h2>
            <p>
              Ciao siamo Monica e Alberto e siamo molto felici di ospitarti
              nella nostra casa a Roma! L'appartamento si trova al 3 piano di un
              palazzo dei primi del novecento situato in via Labicana angolo via
              Iside a due passi dal Tempio di Iside e dal Colosseo. La stanza a
              disposizione è molto luminosa grazie alle presenza di due ampie
              finestre. È dotata di un letto matrimoniale, tv, ventilatore a
              soffitto e il bagno privato interno alla camera. Lo spazio Altri
              spazi della casa sono l'ampio ingresso, la cucina, un piccolo
              salotto/soggiorno e chiaramente la nostra camera. Accesso per gli
              ospiti Spazio obbligatoriamente in comune l'ingresso e la cucina.
              Altre cose da tenere a mente Autorizzazione: QA/2022/17515 Numero
              di registrazione IT058091C2LS36QQQ2
            </p>
          </div>
        </div>
      )}
      <div className="flex justify-center pt-4">

      <button onClick={() => setButton(true)} className="bg-gray-200 rounded-2xl p-3 w-full flex justify-center hover:bg-gray-300">See more</button>
      </div>


      
    </div>
  );
}
