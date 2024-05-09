import React, { useState } from "react";
import arrow from "../../images/icon-arrow.svg"
import arrowRed from "../../images/icon-arrow-red.svg"

export default function Question({ question, answer }) {
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <>
            <article className="py-3  bor ">

                <div onClick={() => setShowAnswer(!showAnswer)}
                    className=" d-flex align-items-center justify-content-between justify-content-center ">
                        
                    <h2 className="font-normal text-lg ">{question}</h2>

                    <div className="flex ">
                        {showAnswer ? (
                            // <i class="fa-solid fa-arrow-up red"></i>
                            <img src={arrowRed} alt="" className="transform rotate-180  list-unstyled " />
                        ) : (
                            // <i class="fa-solid fa-arrow-down blue "></i>
                            <img src={arrow} alt="" className=" " />
                        )}
                    </div>

                </div>
                
                {showAnswer && <p>{answer}</p>}
            </article>
        </>
    );
}
