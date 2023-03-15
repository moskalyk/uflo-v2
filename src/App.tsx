import { Component, createSignal } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';

import { styled } from '@mui/material/styles';
import { Col, Row, Container } from "solid-bootstrap"; 

import { sequence } from '0xsequence'

let count = 0
let overlap = 0.5
let amp = 20;

const App: Component = () => {

  const [isLoggedIn, setIsLoggedIn] = createSignal(true)
  const [keyColor, setKeyColor] = createSignal<any>([{key: '⨁', index: 0}, {key: '⨁', index: 1}])
  const [singles, setSingles] = createSignal<any>([{name: 'sound', index: 0}, {name: 'ocean', index: 1}])
  const [singleIndex, setSingleIndex] = createSignal<any>(null)
  setInterval(() => {
    if(!isLoggedIn()){
      document.getElementById('red')!.style.marginTop = amp*Math.sin(count++) + "px"
      document.getElementById('orange')!.style.marginTop = amp*Math.sin((count++)+overlap*1) + "px"
      document.getElementById('yellow')!.style.marginTop = amp*Math.sin((count++)+overlap*2) + "px"
      document.getElementById('green')!.style.marginTop = amp*Math.sin((count++)+overlap*3) + "px"
      document.getElementById('blue')!.style.marginTop = amp*Math.sin((count++)+overlap*4) + "px"
      document.getElementById('purple')!.style.marginTop = amp*Math.sin((count++)+overlap*5) + "px"
      document.getElementById('brown')!.style.marginTop = amp*Math.sin((count++)+overlap*6) + "px"
      document.getElementById('black')!.style.marginTop = amp*Math.sin((count++)+overlap*7) + "px"
    }
  }, 400)

  sequence.initWallet('mumbai')
    
    const login = async () => {

      const wallet = sequence.getWallet()
    
      const connectWallet = await wallet.connect({
        networkId: 80001,
        app: 'uflo',
        authorize: true,
        settings: {
          theme: 'dark'
        }
      })
      setIsLoggedIn(connectWallet.connected)
  }

  const removeListener = () => {
    document.removeEventListener('keypress', keyPress)
  }
  const keyPress = (event: any) => {
    var name = event.key;
    var code = event.code;
    console.log('keypress')
    // Alert the key name and key code on keydown
    if(name == 'a') setKeyColor(keyColor().map((item: any) => item.index == singleIndex() ? {index: singleIndex(), key: '🔴'} : item ))
    else if(name == 's') setKeyColor(keyColor().map((item: any) => item.index == singleIndex() ? {index: singleIndex(), key: '🟠'} : item ))
    else if(name == 'd') setKeyColor(keyColor().map((item: any) => item.index == singleIndex() ? {index: singleIndex(), key: '🟡'} : item ))
    else if(name == 'f') setKeyColor(keyColor().map((item: any) => item.index == singleIndex() ? {index: singleIndex(), key: '🟢'} : item ))
    else if(name == 'j') setKeyColor(keyColor().map((item: any) => item.index == singleIndex() ? {index: singleIndex(), key: '🔵'} : item ))
    else if(name == 'k') setKeyColor(keyColor().map((item: any) => item.index == singleIndex() ? {index: singleIndex(), key: '🟣'} : item ))
    else if(name == 'l') setKeyColor(keyColor().map((item: any) => item.index == singleIndex() ? {index: singleIndex(), key: '🟤'} : item ))
    else if(name == ';') setKeyColor(keyColor().map((item: any) => item.index == singleIndex() ? {index: singleIndex(), key: '⚫'} : item ))
    else if(name=='`') removeListener()
    console.log(`Key pressed ${name} \r\n Key code value: ${code}`);
  }

  const setupKey = (index: any) => {
    console.log('logging')
    if(keyColor()[index].key == '⨁'){
      console.log('adding')
      document.addEventListener('keypress', keyPress);
    }
    setSingleIndex(index)
  }
  return (
    <div class={styles.App}>
      <br/>
      <br/>
      <br/>
      {
        ! isLoggedIn() 
        ? 
          <>
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
            <button onClick={login}>login</button>
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
          </> 
        : 
        <>
          singles
          <br/>
          <br/>
          {singles().map((single: any, index: number) => {
            return <p>{index}.  &nbsp; &nbsp;{single.name} &nbsp; &nbsp;<span class="single-key" onClick={() => setupKey(index)}>{keyColor()[index].key}</span></p>
          })}
          <div class='footer'><span class='menu'>⚫ record</span> &nbsp;&nbsp;&nbsp;&nbsp;<span class='menu'>◯ gather</span></div>
        </>
      }
    </div>
  );
};

export default App;
