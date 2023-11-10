import React, { useRef } from 'react'
import { Notify } from "../../utils/notify";
import { useState, useEffect } from 'react';
import usePomodoroController from './usePomodoroController';
import PomodoroSettings from './settings/PomodoroSettings';
import { Button } from '@mui/material';

const PomodoroView = () => {


    const { startText, onStartPomodoro, onStopPomodoro, circle, progressTime, pomReason, onBtnWork, onBtnRest, onBtnLongRest, updatePomodoroTime, isQuestion, onBtnNormal, onBtnEasy, onBtnHard} = usePomodoroController();
    const [workClass, setWorkClass] = useState("");
    const [restClass, setRestClass] = useState("");
    const [longRestClass, setLongRestClass] = useState("");
    useEffect(() => {
        setWorkClass("");
        setRestClass("");
        setLongRestClass("");

        if (pomReason === "Work") {
            setWorkClass("activated");
        }

        else if (pomReason === "Rest") {
            setRestClass("activated");
        }

        else if (pomReason === "Long Rest") {
            setLongRestClass("activated");
        }

        updatePomodoroTime();

    }, [pomReason]);


    function onSaveSettings() {
        updatePomodoroTime();
    }

    const questionComponent = (
        <div>
            <div className='question-container'>
                <p className='question'>How hard was it for you to stay focused?</p>
            </div>
            <div className="toggle-container">
            <button className="question-button hard"onClick={onBtnHard}>Hard</button>
            <button className="question-button normal" onClick={onBtnNormal}>Normal</button>
            <button className="question-button easy" onClick={onBtnEasy}>Easy</button>
            
        </div>
        </div>
    )
    const controllersComponent = (
        <div className="toggle-container">
            <button className="btn-start" id="start" onClick={onStartPomodoro}>{startText}</button>
            <button className="btn-stop" id="stop" onClick={onStopPomodoro}>Stop</button>
        </div>
    )

    return (
        <>
            <div className="header">
                <h1>Togudoro</h1>
            </div>

            <div className="single-chart">
                <div className="toggle-container">
                    <button className={"btn-reason " + workClass} id="work" onClick={onBtnWork}>Work</button>
                    <button className={"btn-reason " + restClass} id="rest" onClick={onBtnRest}>Rest</button>
                    <button className={"btn-reason " + longRestClass} id="longRest" onClick={onBtnLongRest}>Long Rest</button>
                </div>
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

            {
                isQuestion ? questionComponent : controllersComponent
            }


            <script type="module" src="/scripts/circle.js"></script>
            <PomodoroSettings onSave={onSaveSettings} ></PomodoroSettings>
        </>
    )
}

export default PomodoroView