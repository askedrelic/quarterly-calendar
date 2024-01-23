
import React from 'react';
import { useState } from 'react';


const Intro = (props) => {
    const [introVisible, setIntroVisible] = useState(true);
    const handleClick = () => {
        setIntroVisible(false);
        document.getElementById("calendar").style.opacity = 1;
    }
    return (
        <div className={`z-10 absolute w-full h-full ${introVisible ? 'visible' : 'hidden'} print:hidden`} onClick={handleClick}>
            <div className={`w-2/3 h-1/2 p-4 mt-8 m-auto bg-white border-4 border-teal-300 prose`}>
                <h1>{props.year} Printable Quarterly Calendar</h1>
                <p>Click anywhere to see the calendar and print it.</p>
                <p>It's recommend to print in Landscape orientation.</p>
                <p>To view a different month or year, <a href={`/?month=1&year=${props.year +1}`}>feel free to adjust the "month" or "year" in the URL querystring.</a></p>
                <p>Known bugs: Jan/Dec yearly cross-over week numbers don't work.</p>
            </div>
        </div>
    );
};

export default Intro;
