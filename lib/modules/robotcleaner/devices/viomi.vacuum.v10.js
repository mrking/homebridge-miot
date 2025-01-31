const RobotCleanerDevice = require('../RobotCleanerDevice.js');
const Properties = require('../../../constants/Properties.js');
const Actions = require('../../../constants/Actions.js');
const Constants = require('../../../constants/Constants.js');
const PropFormat = require('../../../constants/PropFormat.js');
const PropUnit = require('../../../constants/PropUnit.js');
const PropAccess = require('../../../constants/PropAccess.js');


class ViomiVacuumV10 extends RobotCleanerDevice {
  constructor(model, deviceId, name, logger) {
    super(model, deviceId, name, logger);
  }


  /*----------========== DEVICE INFO ==========----------*/

  static getDeviceModel() {
    return "viomi.vacuum.v10";
  }

  getDeviceName() {
    return "Mi Robot Vacuum Mop P";
  }

  getDeviceMiotSpec() {
    return "https://miot-spec.org/miot-spec-v2/instance?type=urn:miot-spec-v2:device:vacuum:0000A006:viomi-v10:1";
  }

  requiresMiCloud() {
    return true;
  }


  /*----------========== INIT ==========----------*/

  initDeviceProperties() {
    // READ/WRITE
    this.addProperty(Properties.MODE, 2, 2, PropFormat.UINT8, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE, [], [{
        "value": 0,
        "description": "Silent"
      },
      {
        "value": 1,
        "description": "Medium"
      },
      {
        "value": 2,
        "description": "Basic"
      },
      {
        "value": 3,
        "description": "Strong"
      }
    ]);

    // READ ONLY
    this.addProperty(Properties.STATUS, 2, 1, PropFormat.UINT8, PropAccess.READ_NOTIFY, PropUnit.NONE, [], [{
        "value": 0,
        "description": "Sleep"
      },
      {
        "value": 1,
        "description": "Idle"
      },
      {
        "value": 2,
        "description": "Paused"
      },
      {
        "value": 3,
        "description": "Sweeping"
      },
      {
        "value": 4,
        "description": "Go Charging"
      },
      {
        "value": 5,
        "description": "Charging"
      },
      {
        "value": 6,
        "description": "Sweeping and Mopping"
      },
      {
        "value": 7,
        "description": "Mopping"
      },
      {
        "value": 8,
        "description": "Updating"
      }
    ]);
    this.addProperty(Properties.BATTERY_LEVEL, 3, 1, PropFormat.UINT8, PropAccess.READ_NOTIFY, PropUnit.PERCENTAGE, [0, 100, 1]);
  }

  initDeviceActions() {
    this.addAction(Actions.START_SWEEP, 2, 1, []);
    this.addAction(Actions.STOP_SWEEP, 2, 2, []);
    this.addAction(Actions.START_SWEEP_MOP, 2, 3, []);
    this.addAction(Actions.START_MOP, 2, 4, []);
    this.addAction(Actions.PAUSE_SWEEP, 2, 5, []);
    this.addAction(Actions.START_CHARGE, 3, 1, []);
  }


  /*----------========== CONFIG ==========----------*/

  hasBuiltInBattery() {
    return true;
  }

  statusSweepingValue() {
    return 3;
  }

  statusIdleValue() {
    return 1;
  }

  statusPausedValue() {
    return 2;
  }

  statusGoChargingValue() {
    return 4;
  }

  statusChargingValue() {
    return 5;
  }

  statusMopppingValue() {
    return 7;
  }

  statusUpdatingValue() {
    return 8;
  }

  statusSleepValue() {
    return 0;
  }

  statusSweepingAndMoppingValue() {
    return 6;
  }


}

module.exports = ViomiVacuumV10;
