import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

import { Col, Row, Container } from "react-bootstrap"; 

import { sequence } from '0xsequence'

let count = 0
let overlap = 0.5
let amp = 20;
let loggedIn = true

const Home = (props: any) => {

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
    console.log(connectWallet.connected)
    loggedIn = connectWallet.connected // grr
    props.setAppState(1)
}

  return (
    <>
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
  )
}

const List = (props: any) => {
  const removeListener = () => {
    document.removeEventListener('keypress', keyPress)
  }
  const keyPress = (event: any) => {
    var name = event.key;
    var code = event.code;
    console.log('keypress')
    // Alert the key name and key code on keydown
    if(name == 'a') props.setKeyColor(props.keyColor.map((item: any) => item.index == props.singleIndex ? {index: props.singleIndex, key: '🔴'} : item ))
    else if(name == 's') props.setKeyColor(props.keyColor.map((item: any) => item.index == props.singleIndex ? {index: props.singleIndex, key: '🟠'} : item ))
    else if(name == 'd') props.setKeyColor(props.keyColor.map((item: any) => item.index == props.singleIndex ? {index: props.singleIndex, key: '🟡'} : item ))
    else if(name == 'f') props.setKeyColor(props.keyColor.map((item: any) => item.index == props.singleIndex ? {index: props.singleIndex, key: '🟢'} : item ))
    else if(name == 'j') props.setKeyColor(props.keyColor.map((item: any) => item.index == props.singleIndex ? {index: props.singleIndex, key: '🔵'} : item ))
    else if(name == 'k') props.setKeyColor(props.keyColor.map((item: any) => item.index == props.singleIndex ? {index: props.singleIndex, key: '🟣'} : item ))
    else if(name == 'l') props.setKeyColor(props.keyColor.map((item: any) => item.index == props.singleIndex ? {index: props.singleIndex, key: '🟤'} : item ))
    else if(name == ';') props.setKeyColor(props.keyColor.map((item: any) => item.index == props.singleIndex ? {index: props.singleIndex, key: '⚫'} : item ))
    else if(name=='`') removeListener()
    console.log(`Key pressed ${name} \r\n Key code value: ${code}`);
  }
  
  const setupKey = (index: any) => {
    console.log('logging')
    if(props.keyColor[index].key == '⨁'){
      console.log('adding')
      document.addEventListener('keypress', keyPress);
    }
    props.setSingleIndex(index)
  }
  return(
    <>           
      <br/>
      <br/>
      <br/>
      singles
      <br/>
      <br/>
      {props.singles.map((single: any, index: number) => {
        return <p>{index}.  &nbsp; &nbsp;{single.name} &nbsp; &nbsp;<span className="single-key" onClick={() => setupKey(index)}>{props.keyColor[index].key}</span></p>
      })}
    <div className='footer'><span onClick={() => props.setAppState(2)} className='menu'>⚫ record</span> &nbsp;&nbsp;&nbsp;&nbsp;<span className='menu'>◯ gather</span></div>
</>
  )
}

const Record = () => {
  return(
  <>
    <div className='footer-record'>

      <input className='single-title' placeholder='Name of Single'></input>
      <input type="checkbox" id="switch" /><label htmlFor="switch">Toggle</label>
    </div>
  
  </>
  )
}

const Gather = () => {
  return(
  <>
    <span>join stage</span><span>leave stage</span>
  </>
  )
}

const App = () => {

  const [keyColor, setKeyColor] = useState<any>([{key: '⨁', index: 0}, {key: '⨁', index: 1}])
  const [singles, setSingles] = useState<any>([{name: 'sound', index: 0}, {name: 'ocean', index: 1}])
  const [singleIndex, setSingleIndex] = useState<any>(null)
  const [appState, setAppState] = useState(1)

  sequence.initWallet('mumbai')

  useEffect(() => {
    setInterval(() => {
      if(!loggedIn){
        console.log(loggedIn)
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

  }, [])

  const Compass = (state: number) => {
    let navigator;
    switch(state){
      case 0:
        navigator = <Home 
                      setAppState={setAppState} 
                    />
        break;
      case 1:
        navigator = <List 
                      setAppState={setAppState} 
                      setSingleIndex={setSingleIndex} 
                      singleIndex={singleIndex} 
                      singles={singles} 
                      keyColor={keyColor} 
                      setKeyColor={setKeyColor}
                    />
        break;
      case 2:
        navigator = <Record />
        break;
      case 3:
        navigator = <Gather />
        break;
    }
    return navigator;
  }

  return (
    <div className={'App'}>
      {Compass(appState)}
    </div>
  );
};

export default App;
