import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import BackspaceIcon from '@material-ui/icons/Backspace';
import Icon from '@material-ui/core/Icon';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: 'flex',
    fontSize: '30px',
    width: 92



  },
  buttonClear: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: 'flex',
    fontSize: '30px',
    width: 193


  },
  buttonBack: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: 'flex',
    fontSize: '30px',
    width: 92,
    height: 84


  },
  buttonOp: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: 'flex',
    fontSize: '40px',
    width: 92,
    height: 84


  },
}));


function NumberButtons({concatNum, decimalOperator, invert}) {

  const classes = useStyles();

  return (
    <Grid container direction="row" alignItems="center" spacing={1}>
      <Grid item xs={4} >
        <Button className={classes.button} onClick={() => {concatNum("7")}} variant="contained" >7</Button>
      </Grid>
      <Grid item xs={4}>
        <Button className={classes.button} onClick={() => {concatNum("8")}} variant="contained">8</Button>
      </Grid>
      <Grid item xs={4}>
        <Button className={classes.button} onClick={() => {concatNum("9")}} variant="contained">9</Button>
      </Grid>
      <Grid item xs={4} >
        <Button className={classes.button} onClick={() => {concatNum("4")}} variant="contained" >4</Button>
      </Grid>
      <Grid item xs={4}>
        <Button className={classes.button} onClick={() => {concatNum("5")}} variant="contained">5</Button>
      </Grid>
      <Grid item xs={4}>
        <Button className={classes.button} onClick={() => {concatNum("6")}} variant="contained">6</Button>
      </Grid>
      <Grid item xs={4} >
        <Button className={classes.button} onClick={() => {concatNum("1")}} variant="contained" >1</Button>
      </Grid>
      <Grid item xs={4}>
        <Button className={classes.button} onClick={() => {concatNum("2")}} variant="contained">2</Button>
      </Grid>
      <Grid item xs={4}>
        <Button className={classes.button} onClick={() => {concatNum("3")}} variant="contained">3</Button>
      </Grid>
      <Grid item xs={4}>
        <Button className={classes.button} onClick={() => {invert()}} variant="contained">+/-</Button>
      </Grid>
      <Grid item xs={4}>
        <Button className={classes.button} onClick={() => {concatNum("0")}} variant="contained">0</Button>
      </Grid>
      <Grid item xs={4}>
        <Button className={classes.button} onClick={() => {decimalOperator()}} variant="contained">.</Button>
      </Grid>

    </Grid>

  );
}
function OperatorButtons({concatOperator, evaluate}) {

  const classes = useStyles();

  return (
    <Grid container direction="column" alignItems="left" spacing={1} >
      <Grid item xs={4} >
        <Button className={classes.buttonOp} onClick={() => {concatOperator("\u00F7")}} color="secondary" variant="contained" ><span>&#247;</span></Button>
      </Grid>
      <Grid item xs={4}>
        <Button className={classes.buttonOp} onClick={() => {concatOperator("\u00D7")}} color="secondary" variant="contained"><span>&#215;</span></Button>
      </Grid>
      <Grid item xs={4}>
        <Button className={classes.buttonOp} onClick={() => {concatOperator("-")}} color="secondary" variant="contained">-</Button>
      </Grid>
      <Grid item xs={4}>
        <Button className={classes.buttonOp} onClick={() => {concatOperator("+")}} color="secondary" variant="contained">+</Button>
      </Grid>
      <Grid item xs={4} >
        <Button className={classes.buttonOp} onClick={() => {evaluate()}} color="secondary" variant="contained" >=</Button>
      </Grid>

    </Grid>

  );
}
function ClearButton({clear}) {

  const classes = useStyles();

  return (
    <Button className={classes.buttonClear} onClick={() => {clear()}} variant="contained">Clear</Button>
  );
}

function BackButton({backSpace}) {

  const classes = useStyles();

  return (
    <Button className={classes.buttonBack} onClick={() => {backSpace()}} variant="contained"><BackspaceIcon fontSize="large" /></Button>
  );
}

function Display({value}) {

  function addComma(value) {
    let tempValue = value.split(" ");
    for (let i = 0; i < tempValue.length; i++) {
      if (!isNaN(tempValue[i] * 1)) {
        tempValue[i] = addCommas(tempValue[i]);
      } 
      if (i != tempValue.length - 1) {
        tempValue[i] = tempValue[i] + " ";
      }
    }
    tempValue.join(" ");

    return tempValue;
  }

  function addCommas(nStr){
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
     x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
   }

  value = addComma(value);

  return(
  <Box bgcolor="primary.main" color="primary.contrastText" p={2} style={{ textAlign: 'right', fontSize: '30px' }}>{value}</Box>
  );
}

function Calculator() {

  const classes = useStyles();

  const [expression, setExpression] = useState("0");
  //const [numStack, setNumStack] = useState([]);


  function concatNum(value) {
    let lastChar = expression[expression.length - 1];
    let newExpression = "";
    if (expression != "0") {
      if (!isNaN(lastChar * 1) || lastChar == '.') {
        newExpression = expression + value;
      } else {
        newExpression = expression + ' ' + value;
      }
    } else {
      newExpression = value;
    }
    setExpression(newExpression);
  }

  function concatOperator(value) {
    let tempValue = expression.split(" ");
    let lastValue = tempValue[tempValue.length - 1];
    let newExpression = "";
    if (!isNaN(lastValue * 1)) {
      newExpression = expression + ' ' + value;
      setExpression(newExpression);
    }
  }

  function clear() {
    setExpression("0");
  }

  function decimalOperator() {
    let newExpression = "";
    let str = expression;
    str = str.split(" ");
    if (!str[str.length - 1].includes('.')) {
      if (isNaN(str[str.length-1] * 1)) {
        newExpression = expression + ' 0.';
      } else {
        newExpression = expression + '.';
      }  
      setExpression(newExpression);
    }
  }

  function invert() {
    let newExpression = "";
    let str = expression;
    str = str.split(" ");
    let tempNum = str[str.length - 1] * -1;
    console.log(tempNum);
    str[str.length - 1] = tempNum;
    str = str.join(" ");

    setExpression(str);
  }

  function backSpace() {
    let newExpression = "";
    let str = expression;
    str = str.slice(0, str.length - 1);
    if (str[str.length - 1] === " " || str[str.length - 1] === '-') {
      str = str.slice(0, str.length - 1);
    }
    if (str.length === 0) {
      str = "0";
    }
    setExpression(str);
  }

  function postFix() {
    let str = expression;
    let outPut = [];
    let operatorStack = [];
    str = str.split(" ");
    //console.log(str);

    for (let i = 0; i < str.length; i++) {
      let value = str[i];
      if (!isNaN(value)) {
        outPut.push(value);
      } else {
        if (operatorStack.length == 0) {
          operatorStack.push(value);
        } else {
          if (value == "\u00F7" || value == "\u00D7") {
            operatorStack.unshift(value);
          } else {
            operatorStack.push(value);
          }
        }
      }
    }
    let run = operatorStack.length;
    for (let i = 0; i < run; i++) {
      outPut.push(operatorStack.shift());
      console.log(i);
    }
    console.log(outPut);
    console.log(operatorStack);

  }

  function calculate() {
    let str = expression;
    str = str.split(" ");
    let total = 0;
    let operation = "";
    for (let i = 0; i < str.length; i++) {
      let value = str[i];
      if (i == 0) {
        value = parseFloat(value);
        total += value;
      } else if (!isNaN(value)) {
        value = parseFloat(value);

        switch (operation) {
          case "divide":  //divide
          total = total / value;
            break;

            case "multiply":
              total = total * value;
            break;

            case "add":
              total = total + value;
            break;

            case "subtract":
              total = total - value;
            break;
        
          default:
            break;
        }
        console.log(total);

      } else {
        switch (value) {
          case "\u00F7":  //divide
          operation = "divide";
            break;

            case "\u00D7":
              operation = "multiply";
            break;

            case "+":
              operation = "add";
            break;

            case "-":
              operation = "subtract";
            break;
        
          default:
            break;
        }
      }
    }
    //console.log(total);
    setExpression(total.toString());

  }


  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Display value={expression} />
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <ClearButton clear={clear} />
            </Grid>
            <Grid item xs={4}>
              <BackButton backSpace={backSpace} />
            </Grid>
            <Grid item xs={12}>
              <NumberButtons concatNum={concatNum} decimalOperator={decimalOperator} invert={invert}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3} >
          <OperatorButtons concatOperator={concatOperator} evaluate={calculate}/>
        </Grid>
      </Grid>

    </div>


  );
}


function App() {

  return (
    <Container maxWidth="xs">

      <Typography component="div" style={{ height: '100vh' }} >
        <Calculator />
      </Typography>


    </Container>

  );
}

export default App;
