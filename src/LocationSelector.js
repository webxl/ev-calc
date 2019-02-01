import React, { Component } from 'react';
import { connect } from "react-redux";
import {hot} from "react-hot-loader/root";
import { Row, Col, Form, FormGroup, Label, Input, Button} from 'reactstrap';

class LocationSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props
    }
  }

  selectCountry = e => {
    this.setState({ country: e.target.value });
    this.props.selectLocation({ country: e.target.value });
  };

  selectRegion = e => {
    this.setState({ region: e.target.value });
    this.props.selectLocation({ region: e.target.value });
  };

  formClick = event => {
    event.stopPropagation();
  };

  render() {

    let options = this.state.locations.map((loc,i) => (
        <option key={i}>{loc.label}</option>
      )
    );

    let regions;
    let location = this.state.locations.find(loc => loc.label === this.state.country);

    if (location && location.regions) {
      regions = location.regions.map((loc,i) => (
        <option key={i}>{loc.label}</option>
      ));
    }

    return (
      <Form onClick={this.formClick}>
        <Row form>
          <Col md={regions ? 6:12}>
            <FormGroup>
              <Label for="exampleSelect">Country</Label>
              <Input type="select" name="select" id="country" onChange={this.selectCountry} value={this.state.country}>
                {options}
              </Input>
            </FormGroup>
          </Col>
          { regions && (
          <Col md={6}>
            <FormGroup>
              <Label for="exampleSelect">Region</Label>
              <Input type="select" name="select" id="region" onChange={this.selectRegion} value={this.state.region}>
                {regions}
              </Input>
            </FormGroup>
          </Col>
          )}
        </Row>
        <Row>
          <Col>
            Sources:
            <ul>
              <li>
                <a href="https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_5_6_a">U.S. Energy Information Administration</a>
              </li>

              <li>
                <a href="https://en.wikipedia.org/wiki/Electricity_pricing#Global_comparison">Wikipedia: Global Electricity Pricing</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Form>
    )
  }
}

const mapDispatch = dispatch => ({
  selectLocation: dispatch.options.update
});

const mapState = state => {
  return { ...state.locationRates, ...state.options };
};

export default hot(connect(mapState, mapDispatch)(LocationSelector));
