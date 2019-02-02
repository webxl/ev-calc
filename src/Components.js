import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGlobe} from '@fortawesome/free-solid-svg-icons';
import StateSelector from './LocationSelector';
import BigNumber from 'bignumber.js';
import {
  Button,
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Popover,
  PopoverBody,
  PopoverHeader
} from "reactstrap";
import React from "react";

library.add(faGlobe);

export const LocationButton = ({onClick, open, country, region, buttonId = "Popover1"}) => {
  return <>
    <Button id={buttonId} onClick={onClick}><FontAwesomeIcon icon="globe"/></Button>
    <Popover placement="bottom" isOpen={open} target={buttonId} toggle={onClick}>
      <PopoverHeader>Rates by Region</PopoverHeader>
      <PopoverBody><StateSelector country={country} region={region}/></PopoverBody>
    </Popover>
  </>;
};
export const OpFormGroup = ({op, label, handleTextChange, type = 'number', prepend, append, value, precision, addon, calculated = false, toFixed}) => {
  BigNumber.set({ DECIMAL_PLACES: 6 })

  const _value = new BigNumber(value, 10);
  let inputProps = {
    type,
    value,
    name: op,
    id: op,
    placeholder: '0',
    onChange: handleTextChange,
    autoComplete: 'disabled',
    max: 1e+10,
    min: 0
  };

  if (type === 'number' && prepend === '$')
    inputProps.step = 0.01;

  if (op !== document.activeElement.id) {
    inputProps.value = toFixed !== undefined ? _value.toFixed(toFixed) : (precision !== undefined ? _value.toPrecision(precision) : _value.toFixed());


    if (prepend && toFixed) {
      inputProps.value = _value.toFormat(toFixed);
      inputProps.type = 'text';
    }
  }
  if (calculated)
    inputProps.readOnly = true;

  return <FormGroup row>
    <Label for={op} sm={4}>{label}</Label>
    <Col sm={8}>
      <InputGroup>
        {addon && (
          <InputGroupAddon addonType="prepend">
            {addon}
          </InputGroupAddon>
        )}
        {prepend && (
          <InputGroupAddon addonType="prepend">
            <InputGroupText>{prepend}</InputGroupText>
          </InputGroupAddon>
        )}
        <Input {...inputProps} />
        {append && (
          <InputGroupAddon addonType="append">
            <InputGroupText>{append}</InputGroupText>
          </InputGroupAddon>
        )}
      </InputGroup>
    </Col>
  </FormGroup>;
};

export const UnitSelection = (props) => {
  return <FormGroup row className='unit-selection'>
    <Label for="units" sm={4}>Units</Label>
    <Col sm={8}>
      <FormGroup check inline>
        <Label check>
          <Input type="radio" name={"units"} value={"mi"} checked={props.distanceUnit === "mi"}
                 onChange={props.onChange}/> U.S.
        </Label>
      </FormGroup>
      <FormGroup check inline>
        <Label check>
          <Input type="radio" name={"units"} value={"km"} checked={props.distanceUnit === "km"}
                 onChange={props.onChange}/> Metric
        </Label>
      </FormGroup>
    </Col>
  </FormGroup>
};