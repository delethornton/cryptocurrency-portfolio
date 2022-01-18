import React from 'react';

class PriceBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      priceUSD: '',
    };
  }
  componentDidMount() {
    console.log('Fetching price data...');
    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${this.props.name.id}&vs_currencies=usd`
    )
      .then((data) => {
        console.log(data);
        return data.json();
      })
      .then((dataJSON) => {
        this.setState({ priceUSD: dataJSON });
      });
  }
  render() {
    const sth = this.state.priceUSD[`${this.props.name.id}`]?.usd;
    return (
      <div>
        <div>{`$${sth ?? ''}`}</div>
        <div>{this.props.name.name}</div>
      </div>
    );
  }
}
export default PriceBox;
