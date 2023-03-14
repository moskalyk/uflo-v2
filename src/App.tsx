import type { Component } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';

import { styled } from '@mui/material/styles';
import { Col, Row, Container } from "solid-bootstrap"; 

let count = 0
let overlap = 0.5
let amp = 20
const App: Component = () => {

  setInterval(() => {
    document.getElementById('red')!.style.marginTop = amp*Math.sin(count++) + "px"
    document.getElementById('orange')!.style.marginTop = amp*Math.sin((count++)+overlap*1) + "px"
    document.getElementById('yellow')!.style.marginTop = amp*Math.sin((count++)+overlap*2) + "px"
    document.getElementById('green')!.style.marginTop = amp*Math.sin((count++)+overlap*3) + "px"
    document.getElementById('blue')!.style.marginTop = amp*Math.sin((count++)+overlap*4) + "px"
    document.getElementById('purple')!.style.marginTop = amp*Math.sin((count++)+overlap*5) + "px"
    document.getElementById('brown')!.style.marginTop = amp*Math.sin((count++)+overlap*6) + "px"
    document.getElementById('black')!.style.marginTop = amp*Math.sin((count++)+overlap*7) + "px"
  }, 400)
  const login = () => {

  }
  return (
    <div class={styles.App}>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <p>☀</p> 
      <p>🖑</p>
      <button>login</button>
      <br/>
      <br/>
      <br/>

      <Container>
        <Row>
          <Col id='red'>🔴</Col>
          <Col id='orange'>🟠</Col>
          <Col id='yellow'>🟡</Col>
          <Col id='green'>🟢</Col>
          <Col id='blue'>🔵</Col>
          <Col id='purple'>🟣</Col>
          <Col id='brown'>🟤</Col>
          <Col id='black'>⚫</Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
