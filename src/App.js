import React, { Component } from 'react';
import './App.css';
import { hot } from 'react-hot-loader/root';
import { TabContent, TabPane, Nav, NavItem, NavLink, Container, Row, Col } from 'reactstrap';
import classNames from 'classnames';
import TotalCost from "./TotalCost";
import PerMile from "./PerMile";
import GasSavings from "./GasSavings";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      priceLink: 'https://ts.la/matthew74366'
    }
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          EV Calc
          <sub>
            Energy & Savings Calculator
          </sub>
        </header>
        <Container>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classNames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
              >
                 Cumulative
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classNames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
              >
                Per Mile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classNames({ active: this.state.activeTab === '3' })}
                href={'/tesla3'}
              >
                Tesla Model 3 Price Checker
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col md={{ size: 6, offset: 0 }}>
                  <TotalCost isActive={this.state.activeTab === '2' } />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
              <Col md={{ size: 6, offset: 0 }}>
                <PerMile isActive={this.state.activeTab === '1' } />
              </Col>
              </Row>
            </TabPane>
          </TabContent>
          <Row>
            <Col>
              <div className="site-notes">
                <ul>
                  <li>If you're interested in buying a Tesla and want <strong>6 months of free Supercharging, please use <a href={this.state.priceLink}>my referral code</a></strong> to help support this site.</li>
                  <li> If you have any issues or comments, please  <a href="mailto:site@webxl.net?subject=Tesla%20Wait">contact me</a>.</li>
                  <li>Source Code is available on <a href="http://github.com/webxl/ev-calc">GitHub</a></li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default hot(App);
