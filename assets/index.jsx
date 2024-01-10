import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import Calendar from './assets/calendar'; 


const App = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      {/* <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button> */}
      <Calendar />
    </div>
  );
}




// Render to #root
// ReactDOM.render(
//   React.createElement(App, null),
//   document.getElementById('app')
// )

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
    <App />
);