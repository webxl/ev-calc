import React, {Component} from 'react';
import {connect} from "react-redux";
import {Col, Form, FormGroup, Input, Label} from 'reactstrap';
import {hot} from 'react-hot-loader/root';
import {LocationButton, OpFormGroup, UnitSelection} from "./Components";

class TotalCost extends Component {
 constructor(props) {
    super(props);
    this.state = {
      ...props.totalCost,
      country: props.options.country,
      region: props.options.region,
      currency: props.options.currency,
      utilityChargeRate: props.options.rate,
      distanceUnit: props.options.distanceUnit,
      economyUnit: props.options.economyUnit,
      popoverOpen: false
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.calcTotalCost(this.getCalcProps());
  };

  handleTextChange = event => {
    const val = parseFloat(event.target.value);
    const op = event.target.name;
    this.setState({[op]: val});
    this.props.calcTotalCost({[op]: val});
  };

  handleOptionChange = event => {
    let val = event.target.value;
    this.setState({
      distanceUnit: val,
      economyUnit: val === 'km' ? 'km/l':'mpg'

    });
    this.props.updateOptions({
      distanceUnit: val,
      economyUnit: val === 'km' ? 'km/l':'mpg'
    });
    this.props.convertDistance(val);
  };

  componentWillReceiveProps(props) {

    this.setState({...props.totalCost, ...props.options});

    if (props.options.country !== this.state.country) {
      this.setState ({ utilityChargeRate: props.options.rate });
      this.setState ({ currency: props.options.currency });
      this.setState ({ economyUnit: props.options.economyUnit });
      this.setState ({ gasPrice: props.options.gas });
    }

    if (props.options.region !== this.state.region) {
      this.setState ({ utilityChargeRate: props.options.rate });
    }

    if (!props.isActive) {
      this.setState({
        popoverOpen: false
      });
    }
  }

  componentWillUpdate(np, ns) {
    //debugger;
  }

  componentDidMount() {
    this.props.calcTotalCost(this.getCalcProps());
  }

  toggle = e => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
    e.preventDefault();
  };

  getCalcProps() {
    const { distance, utilityChargeRate, efficiency, chargePerDistanceUnit, consumption,
      gasPrice, gasEfficiency, gasTotal, savingsResult} = this.state;
    return { distance, utilityChargeRate, efficiency, chargePerDistanceUnit, consumption,
      gasPrice, gasEfficiency, gasTotal, savingsResult};
  }

  formClick = event => {
    this.setState({
      popoverOpen: false
    });
  };

  render() {

    const opFormGroup = ({op, label, type = 'number', prepend, append, value = this.state[op], precision, addon, calculated, toFixed }) =>
      <OpFormGroup op={op} label={label} prepend={prepend} append={append} value={value}  calculated={calculated }
                   addon={addon} precision={precision} toFixed={toFixed} handleTextChange={this.handleTextChange}/>;

    const globeButton = (
      <LocationButton onClick={this.toggle} open={this.state.popoverOpen} country={this.state.country} region={this.state.region } buttonId={'button2'}/>
    );

    return (
      <Form onSubmit={this.handleSubmit} onClick={this.formClick}>

        <UnitSelection distanceUnit={this.state.distanceUnit} onChange={this.handleOptionChange}/>

        {opFormGroup({op: 'distance', label: 'Distance', append: this.state.distanceUnit})}
        {opFormGroup({
          op: 'chargePerDistanceUnit',
          label: 'Avg. Energy',
          prepend: '',
          append: 'Wh / ' + this.state.distanceUnit,
          precision: 4
        })}
        {opFormGroup({op: 'consumption', label: 'Energy', prepend: '', append: 'kWh',
          calculated: true})}

        {opFormGroup({
          op: 'utilityChargeRate',
          label: 'Utility Rate',
          prepend: this.state.currency,
          toFixed: 4,
          append: '/ kWh',
          addon: globeButton
        })}
        {opFormGroup({op: 'efficiency', label: 'Efficiency', prepend: '', append: '%'})}
        {opFormGroup({
          op: 'result',
          label: 'Charging Cost',
          prepend: this.state.currency,
          toFixed: 2,
          calculated: true
        })}
        {opFormGroup({op: 'gasPrice', label: 'Gas Price', toFixed: 2, prepend: this.state.currency, append: ''})}

        {opFormGroup({op: 'gasEfficiency', label: 'Gas Economy', prepend: '', append: this.state.economyUnit})}
        {opFormGroup({
          op: 'gasTotal',
          label: 'Gas Total',
          prepend: this.state.currency,
          toFixed: 2,
          calculated: true
        })}
        {opFormGroup({
          op: 'savingsResult',
          label: 'Savings',
          prepend: this.state.currency,
          toFixed: 2,
          calculated: true
        })}

      </Form>
    );
  }

}


const mapDispatch = dispatch => ({
  calcTotalCost: dispatch.totalCost.calculate,
  updateOptions: dispatch.options.update,
  convertDistance: dispatch.totalCost.convertDistance
});

const mapState = state => {
  return { ...state };
};

export default hot(connect(mapState, mapDispatch)(TotalCost));
