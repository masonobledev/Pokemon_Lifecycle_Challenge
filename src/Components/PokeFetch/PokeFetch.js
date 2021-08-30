import React, { Component } from "react";
import "./PokeFetch.css";

class PokeFetch extends Component {
  constructor() {
    super();
    //State = variables when component mounts (beginning of lifecycle)
    this.state = {
      pokeInfo: "",
      pokeSprite: "",
      pokeName: "",
      pokeShowing: false,
      pokeTimer: 10,
      timerIsRunning: false
    };
  }

  componentDidMount() {
    //timer will start when component mounts
    //pokeTimer will stay at 10 because state has not changed yet
    console.log('mounting')
    this.interval = setInterval(() => this.timer(), 1000)
  }

  componentDidUpdate(){
    //will run every update
    //this is why we gave it a conditional (will only run if conditions are met)
    console.log('updating')
    if (this.state.pokeTimer === 0 && this.state.pokeShowing === false)
    this.setState({
      pokeShowing: true,
    })
  }

  componentWillUnmount() {
    //this stops the setInterval method
    console.log('unmounting')
    clearInterval(this.interval)

  }

  //setInterval is calling this function
  timer = () => {
    //this will run when the state changes from false to true and if it's greater than 0
    if (this.state.timerIsRunning === true && this.state.pokeTimer > 0)
    this.setState(prevState => ({
      //prevState grabs the previous state and counts down according to conditional on line 44
      pokeTimer: prevState.pokeTimer - 1  
    }))
    console.log(this.state.pokeTimer)
  }

  
  fetchPokemon() {
    //resetting variables to initial state
    this.setState({
      pokeTimer: 10,
      pokeShowing: false,
      timerIsRunning: false
    })

    let min = Math.ceil(1);
    //The math.ceil() function always rounds a number up to the next largest integer.
    let max = Math.floor(152);
    //The math.floor() function returns the largest integer less than or equal to a given number.
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    //The math.random() function returns a floating-point, pseudo-random number in the range 0 to less than 1 (inclusive of 0, but not 1) with approximately uniform distribution over that range.
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
          timerIsRunning: true
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className={"wrapper"}>
        <button className={"start"} onClick={() => this.fetchPokemon()}>
          Start!
        </button>
        <h1 className={"timer"}>Timer Display</h1>
        <div className={"pokeWrap"}>
          {/*If the pokeShowing state is set to true, display the Pokemon otherwise display the dark image */}
          {this.state.pokeShowing ? (
            <>
              <img className={"pokeImg"} src={this.state.pokeSprite} />
              <h1 className={"pokeName"}>{this.state.pokeName}</h1>
            </>
          ) : (
            <img className={"pokeImgDark"} src={this.state.pokeSprite} />
          )}
        </div>
      </div>
    );
  }
}

export default PokeFetch;
