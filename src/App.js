import React, { useState, useEffect } from 'react';
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import './App.scss';
import Stopwatch from './components/Stopwatch'
import Buttons from './components/Buttons'

function App() {
  const [time, setTime] = useState(0);
  const [watchOn, setWatchOn] = useState(false);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    const unsubscribe = new Subject();
    interval(10)
      .pipe(takeUntil(unsubscribe))
      .subscribe(() => {
        if (watchOn) {
          setTime(val => val + 1);
        }
      });
    return () => {
      unsubscribe.next();
      unsubscribe.complete();
    };
  }, [watchOn]);


  const handleStart = () => {
    setWatchOn(prevState => !prevState);
    setStatus(1);
  }

  const handleStop = () => {
    setWatchOn(false);
    setTime(0);
    setStatus(0);
  }

  const handleWait = () => {
    if (time !== 0) {
      setWatchOn(false);
    }
    setStatus(2);
  }

  const handleReset = () => {
    setTime(0);
  }

  return (
    <div className="main-container">
      <span className="title">stopwatch</span>
      <Stopwatch time={time}/>
      <Buttons
        start={handleStart}
        stop={handleStop}
        reset={handleReset}
        wait={handleWait}
        status={status}
      />
    </div>
  );
}

export default App;
