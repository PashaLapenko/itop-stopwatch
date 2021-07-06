import React from 'react';
import debounce from 'lodash/debounce';

function Buttons({ start, stop, reset, wait, status }) {
  const waitClick = (e) => {
    e.target.disabled = true
    wait()

    return debounce(() => {
      e.target.disabled = false
    }, 300)
  }

  // statuses
  // 0 = not run
  // 1 = run
  // 2 = wait
  return (
    <div className="buttons-container">

      <button
        className="button"
        onClick={status === 1 ? stop : start}
      >
        {status === 1 ? 'Stop' : 'Start'}
      </button>

      <button
        className="button"
        disabled={status !== 1}
        onDoubleClick={waitClick}
      >
        Wait
      </button>

      <button
        className="button"
        onClick={reset}
        disabled={status === 0}
      >
        Reset
      </button>
    </div>
  );
}

export default Buttons;
