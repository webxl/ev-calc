import React, {Component} from 'react';
import {connect} from "react-redux";
import {Col, Form, FormGroup, Input, Label} from 'reactstrap';
import {hot} from 'react-hot-loader/root';
import {LocationButton, OpFormGroup, UnitSelection} from "./Components";

class GasSavings extends Component {
 constructor(props) {
    super(props);
    this.state = {
      ...props.totalCost,
      country: props.options.country,
      region: props.options.region,
      currency: props.options.currency,
      utilityChargeRate: props.options.rate,
      distanceUnit: props.options.distanceUnit
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
      distanceUnit: val
    });
    this.props.updateOptions({
      distanceUnit: val
    });
    this.props.convertDistance(val);
  };

  componentWillReceiveProps(props) {

    this.setState({...props.totalCost, ...props.options});

    if (props.options.country !== this.state.country) {
      this.setState ({ utilityChargeRate: props.options.rate });
      this.setState ({ currency: props.options.currency });
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
    const { distance, utilityChargeRate, efficiency, chargePerDistanceUnit, consumption } = this.state;
    return { distance, utilityChargeRate, efficiency, chargePerDistanceUnit, consumption };
  }

  render() {

    const opFormGroup = ({op, label, type = 'number', prepend, append, value = this.state[op], precision, addon, calculated, toFixed }) =>
      <OpFormGroup op={op} label={label} prepend={prepend} append={append} value={value}  calculated={calculated }
                   addon={addon} precision={precision} toFixed={toFixed} handleTextChange={this.handleTextChange}/>;

    const globeButton = (
      <LocationButton onClick={this.toggle} open={this.state.popoverOpen} country={this.state.country} region={this.state.region } buttonId={'button2'}/>
    );

    return (
      <Form onSubmit={this.handleSubmit} onClick={this.formClick}>

        <h4>Coming Soon</h4>

      </Form>
    );
  }

}


const mapDispatch = dispatch => ({
  calcTotalCost: dispatch.gasSavings.calculate,
  updateOptions: dispatch.options.update,
  convertDistance: dispatch.gasSavings.convertDistance
});

const mapState = state => {
  return { ...state };
};

export default hot(connect(mapState, mapDispatch)(GasSavings));
