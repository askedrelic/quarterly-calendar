
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
            <div className={`w-2/3 p-4 mt-8 m-auto bg-white border-4 border-teal-300 prose`}>
                <h1>{props.year} Printable Quarterly Calendar</h1>
                <p>Click anywhere to see the calendar (or just print now, this notice isn't printed). And make sure you are printing in Landscape orientation.</p>
                <p>Use the quarterly calendar to plan things in reality or highlight habit streaks!</p>
                <p>To view a different month or year, <a href={`/?month=1&year=${props.year + 1}`}>modify the "month" or "year" in the URL query string</a>.</p>
                <p>Why print things? Why not? Starting at a real thing hanging on your wall can be effective for motivation.</p>
                <br />
                <p>Known bugs: crossing Jan/Dec years week numbers don't work.</p>
                <p>Source: <a href="https://github.com/askedrelic/quarterly-calendar">https://github.com/askedrelic/quarterly-calendar</a></p>
            </div>
        </div>
    );
};

export default Intro;
