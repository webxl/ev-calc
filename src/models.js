const convertMiKm = (dist, targetUnit) => {
  let factor = 1.609344;
  return targetUnit === 'km' ? dist * factor:dist/factor;
};

export const costPerMile = {
  state: {
    distance: 310,
    utilityChargeRate: .1295, // $ / kWh // US residential average 11/18
    efficiency: 85,
    chargePerDistanceUnit: 0, // 100 Wh / mi
    consumption: 75, // 1 kWh == 1000 Wh
    result: 0
  },
  reducers: {
    calculate: (state, ns) => {
      let cs = {...state, ...ns};
      let chargePerDistanceUnit = cs.consumption * 1000 / cs.distance;
      let result = (cs.consumption * (1 / (cs.efficiency/100)) * cs.utilityChargeRate) / cs.distance;
      return {...cs, result, chargePerDistanceUnit}
    },
    convertDistance: (state, targetUnit) => {
      return {...state, distance: convertMiKm(state.distance, targetUnit)};
    }
  }
};

export const totalCost = {
  state: {
    distance: 310,
    utilityChargeRate: .1295, // $ / kWh // US residential average 11/18
    efficiency: 85,
    chargePerDistanceUnit: 256, // 100 Wh / mi
    consumption: 75, // 1 kWh == 1000 Wh
    result: 0
  },
  reducers: {
    calculate: (state, ns) => {
      let cs = {...state, ...ns};
      let consumption = (cs.chargePerDistanceUnit * cs.distance) / 1000;
      let result = (consumption * (1 / (cs.efficiency/100)) * cs.utilityChargeRate);
      return {...cs, result, consumption}
    }
  }
};
export const gasSavings = {
  state: {
    distance: 310,
    utilityChargeRate: .1295, // $ / kWh // US residential average 11/18
    efficiency: 85,
    chargePerDistanceUnit: 0, // 100 Wh / mi
    consumption: 75, // 1 kWh == 1000 Wh
    result: 0
  },
  reducers: {
    calculate: (state, ns) => {
      let cs = {...state, ...ns};
      let consumption = (cs.chargePerDistanceUnit * cs.distance) / 1000;
      let result = (consumption * (1 / (cs.efficiency/100)) * cs.utilityChargeRate);
      return {...cs, result, consumption}
    }
  }
};

const locations = [
  {
    label: 'U.S.',
    currency: '$',
    regions: [
      { label: "Average", rate: 0.1295 },
      { label: "Alabama", rate: 0.1242 },
      { label: "Alaska", rate: 0.2251 },
      { label: "Arizona", rate: 0.1326 },
      { label: "Arkansas", rate: 0.0934 },
      { label: "California", rate: 0.1573 },
      { label: "Colorado", rate: 0.1227 },
      { label: "Connecticut", rate: 0.2187 },
      { label: "Delaware", rate: 0.1389 },
      { label: "District of Columbia", rate: 0.1360 },
      { label: "Florida", rate: 0.1167 },
      { label: "Georgia", rate: 0.1096 },
      { label: "Hawaii", rate: 0.3246 },
      { label: "Idaho", rate: 0.1033 },
      { label: "Illinois", rate: 0.1323 },
      { label: "Indiana", rate: 0.1239 },
      { label: "Iowa", rate: 0.1282 },
      { label: "Kansas", rate: 0.1332 },
      { label: "Kentucky", rate: 0.1077 },
      { label: "Louisiana", rate: 0.0911 },
      { label: "Maine", rate: 0.1647 },
      { label: "Maryland", rate: 0.1419 },
      { label: "Massachusetts", rate: 0.2130 },
      { label: "Michigan", rate: 0.1542 },
      { label: "Middle Atlantic", rate: 0.1637 },
      { label: "Minnesota", rate: 0.1372 },
      { label: "Mississippi", rate: 0.1122 },
      { label: "Missouri", rate: 0.1071 },
      { label: "Montana", rate: 0.1148 },
      { label: "Mountain", rate: 0.1221 },
      { label: "Nebraska", rate: 0.1123 },
      { label: "Nevada", rate: 0.1216 },
      { label: "New England", rate: 0.2073 },
      { label: "New Hampshire", rate: 0.2023 },
      { label: "New Jersey", rate: 0.1496 },
      { label: "New Mexico", rate: 0.1297 },
      { label: "New York", rate: 0.1929 },
      { label: "North Carolina", rate: 0.1194 },
      { label: "North Dakota", rate: 0.1083 },
      { label: "Ohio", rate: 0.1248 },
      { label: "Oklahoma", rate: 0.1100 },
      { label: "Oregon", rate: 0.1124 },
      { label: "Pennsylvania", rate: 0.1410 },
      { label: "Rhode Island", rate: 0.2146 },
      { label: "South Atlantic", rate: 0.1188 },
      { label: "South Carolina", rate: 0.1243 },
      { label: "South Dakota", rate: 0.1235 },
      { label: "Tennessee", rate: 0.1070 },
      { label: "Texas", rate: 0.1169 },
      { label: "Utah", rate: 0.1032 },
      { label: "Vermont", rate: 0.1842 },
      { label: "Virginia", rate: 0.1190 },
      { label: "Washington", rate: .0968 },
      { label: "West Virginia", rate: 0.1127 },
      { label: "Wisconsin", rate: 0.1494 },
      { label: "Wyoming", rate: 0.1108 },
      { label: "East North Central", rate: 0.1346 },
      { label: "West North Central", rate: 0.1209 },
      { label: "East South Central", rate: 0.1126 },
      { label: "West South Central", rate: 0.1105 },
      { label: "Pacific Contiguous", rate: 0.1383 },
      { label: "Pacific Noncontiguous", rate: 0.2862 },
    ]
  },
  { label: "Austria", rate: 0.197, currency: '€' },
  { label: "Belgium", rate: 0.286, currency: '€' },
  { label: "Bulgaria", rate: 0.098, currency: '€' },
  { label: "Croatia", rate: 0.131, currency: '€' },
  { label: "Cyprus", rate: 0.179, currency: '€' },
  { label: "Czech Republic", rate: 0.153, currency: '€' },
  { label: "Denmark", rate: 0.307, currency: '€' },
  { label: "Estonia", rate: 0.138, currency: '€' },
  { label: "Finland", rate: 0.163, currency: '€' },
  { label: "France", rate: 0.179, currency: '€' },
  { label: "Germany", rate: 0.307, currency: '€' },
  { label: "Greece", rate: 0.156, currency: '€' },
  { label: "Hungary", rate: 0.113, currency: '€' },
  { label: "Ireland", rate: 0.25, currency: '€' },
  { label: "Italy", rate: 0.215, currency: '€' },
  { label: "Latvia", rate: 0.158, currency: '€' },
  { label: "Lithuania", rate: 0.11, currency: '€' },
  { label: "Luxembourg", rate: 0.168, currency: '€' },
  { label: "Malta", rate: 0.136, currency: '€' },
  { label: "Netherlands", rate: 0.176, currency: '€' },
  { label: "Poland", rate: 0.145, currency: '€' },
  { label: "Portugal", rate: 0.228, currency: '€' },
  { label: "Romania", rate: 0.141, currency: '€' },
  { label: "Slovakia", rate: 0.148, currency: '€' },
  { label: "Slovenia", rate: 0.162, currency: '€' },
  { label: "Spain", rate: 0.223, currency: '€' },
  { label: "Sweden", rate: 0.213, currency: '€' },
  { label: "United Kingdom", rate: 0.19, currency: '£' }];

export const options = {
  state: {
    distanceUnit: 'mi',
    country: 'U.S.',
    currency: '$',
    region: 'Average',
    rate: '0.1295'
  },
  reducers: {
    update: (state, ns) => {
      let cs = {...state, ...ns};


      let loc = locations.find(l => l.label === cs.country);
      if (loc && loc.regions)
        cs.rate = loc.regions.find(l => l.label === cs.region).rate;
      else
        cs.rate = loc.rate;

      cs.currency = loc.currency;

      return {...state, ...cs}
    }
  }
};
export const locationRates = {
  state: {
    locations
  },
  reducers: {
    select: (state, ns) => {
      let cs = {...state, ...ns};

      return {...state, ...cs}
    }
  }
};

export const wattHoursPerMile = {
  state: {
    distance: 10,
    consumption: 3, // 1 kWh == 1000 Wh
    result: 0
  },
  reducers: {
    calculate: (state, ns) => {
      let result = (ns.consumption * 1000) / ns.distance;
      return {...ns, result}
    }
  }
};