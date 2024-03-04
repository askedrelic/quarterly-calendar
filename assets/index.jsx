import React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom/client'
import Calendar from './assets/calendar';
import Intro from './assets/intro';


const queryParams = new URLSearchParams(window.location.search);

const App = () => {
  const now = new Date();
  // Default to this year
  const queryYear = queryParams.get('year');
  const [year, setyear] = useState(queryYear ? parseInt(queryYear, 10) : now.getFullYear());
  // Default to 1-12 month index when manually entered
  const queryMonth = queryParams.get('month');
  // Default to next month
  // TODO make this more easily configurable
  const [month, setMonth] = useState(queryMonth ? parseInt(queryMonth, 10) - 1 : now.getMonth() + 1);

  return (
    <div>
      <Intro month={month} year={year} />
      <Calendar month={month} year={year} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <App />
);