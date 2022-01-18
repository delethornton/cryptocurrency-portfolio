import React from 'react';
import PriceBox from './priceBox.component';
class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      cryptoList: [],
      coinObjs: [],
    };
    console.log('Constructor...');
  }

  renderPriceBox() {
    return this.state.coinObjs.map((obj) => {
      return <PriceBox key={obj.id} name={obj}></PriceBox>;
    });
  }

  checkDuplicateCoinObj(e) {
    console.log('Checking for duplicates...');
    for (const { name } of this.state.coinObjs) {
      console.log(name);
      if (name.toLowerCase() === e.target[0].value.toLowerCase()) {
        return null;
      }
    }
    return true;
  }

  collectCoinObj(e) {
    const coinObj = this.checkForCoin(e);
    if (coinObj && this.checkDuplicateCoinObj(e)) {
      const coinArray = this.state.coinObjs;
      console.log(coinArray);
      console.log(coinObj.length);
      coinArray.push(coinObj);
      console.log(coinArray);
      this.setState((state) => {
        return { coinObjs: coinArray };
      });
      e.target[0].value = '';
      console.log('Collected...');
    } else {
      e.target[0].value = '';
      console.log('Not collecting');
    }
  }

  checkForCoin(e) {
    for (const obj of this.state.cryptoList) {
      const objToCompare = obj.name.toLowerCase();
      if (objToCompare === e.target[0].value.toLowerCase()) {
        console.log('Found coin!');
        return obj;
      }
    }
    console.log('No coin found.');
    return null;
  }

  componentDidMount() {
    console.log('Fetching data...');
    fetch('https://api.coingecko.com/api/v3/coins/list')
      .then((data) => data.json())
      .then((dataJSON) => {
        this.setState({ cryptoList: dataJSON });
      });
  }

  render() {
    console.log(this.state.cryptoList);
    console.log(this.state.coinObjs);
    return (
      <main>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.collectCoinObj(e);
          }}
        >
          <input type="search"></input>
          <input type="submit" value="Price Checker"></input>
        </form>
        <main>{this.renderPriceBox()}</main>
      </main>
    );
  }
}

export default Main;
