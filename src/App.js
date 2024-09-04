import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            milisecond: 0,
            second: 0,
            minute: 0,
            hour: 0,
            isStart: false,
            secondmode: false,
            restart: false,
            flagShow: [],
            massage: 'Ready?!',
            Hshadow: [5, 5, 0, -5, -5, -5, 0, 5],
            Vshadow: [0, 5, 5, 5, 0, -5, -5, -5],
            i: 0
        };
        this.intervalTimer = null
    }
    timer = () => {
        let milisecond = this.state.milisecond;
        let second = this.state.second;
        let minute = this.state.minute;
        let hour = this.state.hour;
        this.setState({ milisecond: milisecond + 1 })
        if (this.state.milisecond === 99) {
            this.setState({ second: second + 1, milisecond: 0 })
        }
        if (this.state.second === 59) {
            this.setState({ minute: minute + 1, second: 0 })
        }
        if (this.state.minute === 59) {
            this.setState({ hour: hour + 1, minute: 0 })
        }
    }

    show = () => {
        return (
            `${this.state.hour < 10 ? '0' + this.state.hour : this.state.hour}
        : ${this.state.minute < 10 ? '0' + this.state.minute : this.state.minute}
        : ${this.state.second < 10 ? '0' + this.state.second : this.state.second}
        . ${this.state.milisecond < 10 ? '0' + this.state.milisecond : this.state.milisecond}`
        )
    }

    handlePlay = () => {
        document.getElementById('shadow').style.animation="pulse 2s ease-in-out infinite"
        if (this.state.isStart === false) {
            this.setState({ secondmode: true, isStart: true, massage: '' })
            this.intervalTimer = setInterval(this.timer, 10);
        }
    }
    handlePause = () => {
        document.getElementById('shadow').removeAttribute('style')
        clearInterval(this.intervalTimer)
        this.setState({ isStart: false, secondmode: false, restart: true, massage: 'Pause' })
    }
    handleFlag = () => {
        this.setState({ flagShow: [...this.state.flagShow, this.show()] })
    }
    handleRestart = () => {
        this.handlePause()
        this.setState({ minute: 0, second: 0, hour: 0, milisecond: 0, flagShow: [] })
        this.setState({ isStart: false, secondmode: false, restart: false, massage: 'Ready?!' })
    }


    Play = () => {
        if (this.state.isStart === false && this.state.secondmode === false) {
            return (<>
                <div className='darkplay'><svg className="darkicon" onClick={this.handlePlay} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" >
                    <path fillRule="evenodd" d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z" clipRule="evenodd" />
                </svg ></div>
            </>)
        }
    }
    restart = () => {
        if (this.state.isStart === false && this.state.secondmode === false && this.state.restart === true) {
            return (<>
                <div className='darkplay'><svg className="restarticon" onClick={this.handleRestart} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.1" d="M3 9h13a5 5 0 0 1 0 10H7M3 9l4-4M3 9l4 4" />
                </svg></div>
            </>)
        }
    }
    pause = () => {
        if (this.state.secondmode === true && this.state.isStart === true) {
            return (<>
                <div className='darkplay'><svg className="pauseicon" onClick={this.handlePause} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M8 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H8Zm7 0a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1Z" clipRule="evenodd" />
                </svg></div>
            </>
            )
        }
    }
    flag = () => {
        if (this.state.secondmode === true && this.state.isStart === true) {
            return (<>
                <div className='darkplay'><svg className="darkicon" onClick={this.handleFlag} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.09 3.294c1.924.95 3.422 1.69 5.472.692a1 1 0 0 1 1.438.9v9.54a1 1 0 0 1-.562.9c-2.981 1.45-5.382.24-7.25-.701a38.739 38.739 0 0 0-.622-.31c-1.033-.497-1.887-.812-2.756-.77-.76.036-1.672.357-2.81 1.396V21a1 1 0 1 1-2 0V4.971a1 1 0 0 1 .297-.71c1.522-1.506 2.967-2.185 4.417-2.255 1.407-.068 2.653.453 3.72.967.225.108.443.216.655.32Z" />
                </svg>
                </div>
            </>
            )
        }
    }

    render() {
        return (
            <div className='darkmain'>
                <div className='show'><div className='shadow' id='shadow' >{this.show()}<br/>{this.state.massage}</div></div>
                <div className='handlebtn' id='handlebtn'>
                    <this.Play />
                    <this.restart />
                    <this.pause />
                    <this.flag />
                </div>
                <div className='flagshow'>
                    {this.state.flagShow.map(item => (
                        <div className='lap' key={Math.random()}>Lap {this.state.flagShow.indexOf(item) + 1}<br></br>{item}</div>
                    ))}
                </div>
            </div>
        )
    };
};

export default App;
