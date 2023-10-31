import React from 'react'
import { Notify } from "../../utils/notify";
import { useState, useEffect } from 'react';
import usePomodoroController from './usePomodoroController';

const PomodoroView = () => {


    const { startText, onStartPomodoro, onStopPomodoro, circle, progressTime, pomReason} = usePomodoroController();


    return (
        <>
            <div className="header">
                <h1>Pomodoro</h1>
            </div>

            <div className="single-chart">
            <h1 className='Reason'>{pomReason}</h1>
                <svg viewBox="0 0 36 36" className="circular-chart orange">
                    <path className="circle-bg"
                        d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path id="pom-circle" className="circle"
                        strokeDasharray={circle + ", 100"}
                        d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text id="percentage" x="18" y="20.35" className="percentage">{progressTime}</text>
                </svg>
            </div>

            <div className="toggle-container">
                <button className="btn-start" id="start" onClick={onStartPomodoro}>{startText}</button>
                <button className="btn-stop" id="stop" onClick={onStopPomodoro}>Stop</button>
            </div>


            <script type="module" src="/scripts/circle.js"></script>

        </>
    )
}

export default PomodoroView