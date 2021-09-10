
import React, { Component } from 'react';
import Snake from './components/Snake';
import Food from './components/Food';

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y]
}

const initialState = {
  food: getRandomCoordinates(),
  speed: 200,
  direction: 'RIGHT',
  snakeDots: [
    [0,0],
    [2,0]
  ]

  
}

class App extends Component {

  state = initialState;

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEat();
  }

  onKeyDown = (e) => {
    e = e || window.event;
    // eslint-disable-next-line default-case
    switch (e.keyCode) {
      case 38:
        this.setState({direction: 'UP'});
        break;
      case 40:
        this.setState({direction: 'DOWN'});
        break;
      case 37:
        this.setState({direction: 'LEFT'});
        break;
      case 39:
        this.setState({direction: 'RIGHT'});
        break;
    }
  }

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    // eslint-disable-next-line default-case
    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
    }
    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots
    })
  }

  checkIfOutOfBorders() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  checkIfCollapsed() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      // eslint-disable-next-line eqeqeq
      if (head[0] == dot[0] && head[1] == dot[1]) {
        this.onGameOver();
      }
    })
  }

  checkIfEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    // eslint-disable-next-line eqeqeq
    if (head[0] == food[0] && head[1] == food[1]) {
      this.setState({
        food: getRandomCoordinates()
      })
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([])
    this.setState({
      snakeDots: newSnake
    })
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10
      })
    }
  }

  onGameOver() {
    alert(`Game Over. Snake length is ${this.state.snakeDots.length}`);
    this.setState(initialState)
  }

  render() {
    return (
      <div className="game-area">
        <Snake snakeDots={this.state.snakeDots}/>
        <Food dot={this.state.food}/>
      </div>
    );
  }
}

export default App;
// /* eslint-disable eqeqeq */
// /* eslint-disable no-unused-vars */
// import React, { useState } from 'react'
// import Food from './components/Food';
// import Snake from './components/Snake';

// const getRandomCoordinates=()=>{
//   let min= 1;
//   let max=98;
//   let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
//    let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
//    return[x,y]
// }

// function App() {
// const[state,setstate]=useState({  food:getRandomCoordinates(),
//   speed:200,
//   direction: "RIGHT",
//   snakeDots:[
//   [0,0],
//   [2,0]],

// },
// );


// const componentDidMount =() =>{
//   setInterval(moveSnake,state.speed)
//   document.onkeydown = onKeyDown;
// }

//    function componentDidUpdate() {
//     chekIsOutofBorders();
//    checkIfCollapsed();
//    checkIfEat();
//   }
// const onKeyDown=(e)=>{
//   e = e || window.event;
//   switch (e.keyCode) {
//     case 38 :
//       setstate({direction: "UP"});
//         break;
//     case 48 :
//       setstate({direction: "DOWN"});
//        break; 
//      case 37 :
//       setstate({direction: "LEFT"}) ;
//         break; 
//      case 39 :
//       setstate({direction: "RIGHT"}) ; 
//       break;
  
//     default:
//       break;
//   }
// }
// const moveSnake = ()=>{
//   let dots = [...state.snakeDots]
//   let head = dots[dots.length - 1];

//   switch (state.direction) {
//     case "RIGHT":
//       head = [head[0] + 2, head[1]];
//       break;
//       case "LEFT":
//       head = [head[0] - 2, head[1]];
//       break;
//       case "DOWN":
//       head = [head[0] , head[1] + 2];
//       break;
//       case "UP":
//       head = [head[0] , head[1] - 2];
//       break;
   
//     default:
//       break;
//   }
//   dots.push(head);
//   dots.shift()
//   setstate({
// snakeDots:dots
//   })
// }


//  function checkIfCollapsed() {
//     let snake = [...state.snakeDots];
//     let head = snake[snake.length - 1];
//     snake.pop();
//     snake.forEach(dot => {
//       // eslint-disable-next-line eqeqeq
//       if (head[0] == dot[0] && head[1] == dot[1]) {
//         onGameOver();
//       }
//     })
//   }

//   function checkIfEat() {
//     let head = state.snakeDots[state.snakeDots.length - 1];
//     let food = state.food;
//     if (head[0] == food[0] && head[1] == food[1]) {
//       setstate({
//         food: getRandomCoordinates()
//       })
//       enlargeSnake();
//       increaseSpeed();
//     }
//   }

//   function enlargeSnake() {
//     let newSnake = [...state.snakeDots];
//     newSnake.unshift([])
//     setstate({
//       snakeDots: newSnake
//     })
//   }

//   function increaseSpeed() {
//     if (state.speed > 10) {
//       setstate({
//         speed: state.speed - 10
//       })
//     }
//   }

//   function onGameOver() {
//     alert(`Game Over. Snake length is ${this.state.snakeDots.length}`);
//     // eslint-disable-next-line no-undef
//     setstate(initialState)
//   }

// function chekIsOutofBorders(){
//   let head = state.snakeDots[state.snakeDots.length - 1];
//   if(head[0] >= 100 || head[1] >= 100 || head[0] < 0|| head[1] < 0){
//     onGameOver();
//   }
// }


//   return (
//     <div className="game-area">
//  <Snake snakeDots={state.snakeDots}/>
//  <Food dot={state.food} />
//     </div>
//   );
// }

// export default App;