const RobotCleanerDevice = require('../RobotCleanerDevice.js');
const Properties = require('../../../constants/Properties.js');
const Actions = require('../../../constants/Actions.js');
const Constants = require('../../../constants/Constants.js');
const PropFormat = require('../../../constants/PropFormat.js');
const PropUnit = require('../../../constants/PropUnit.js');
const PropAccess = require('../../../constants/PropAccess.js');


class DreameVacuumMb1808 extends RobotCleanerDevice {
  constructor(model, deviceId, name, logger) {
    super(model, deviceId, name, logger);
  }


  /*----------========== DEVICE INFO ==========----------*/

  static getDeviceModel() {
    return "dreame.vacuum.mb1808";
  }

  getDeviceName() {
    return "Mi Robot Vacuum-Mop";
  }

  getDeviceMiotSpec() {
    return "https://miot-spec.org/miot-spec-v2/instance?type=urn:miot-spec-v2:device:vacuum:0000A006:dreame-mb1808:1";
  }


  /*----------========== INIT ==========----------*/

  initDeviceProperties() {
    // READ/WRITE
    this.addProperty(Properties.MODE, 18, 6, PropFormat.INT32, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE, [], [{
        "value": 0,
        "description": "Silent"
      },
      {
        "value": 1,
        "description": "Standard"
      },
      {
        "value": 2,
        "description": "Medium"
      },
      {
        "value": 3,
        "description": "Turbo"
      }
    ]);
    this.addProperty(Properties.DO_NOT_DISTURB, 20, 1, PropFormat.BOOL, PropAccess.READ_WRITE, PropUnit.NONE);

    // READ ONLY
    this.addProperty(Properties.STATUS, 3, 2, PropFormat.INT8, PropAccess.READ_NOTIFY, PropUnit.NONE, [], [{
        "value": 1,
        "description": "Sweeping"
      },
      {
        "value": 2,
        "description": "Idle"
      },
      {
        "value": 3,
        "description": "Paused"
      },
      {
        "value": 4,
        "description": "Error"
      },
      {
        "value": 5,
        "description": "Go Charging"
      },
      {
        "value": 6,
        "description": "Charging"
      }
    ]);
    this.addProperty(Properties.DEVICE_FAULT, 3, 1, PropFormat.UINT8, PropAccess.READ_NOTIFY, PropUnit.NONE, [], [{
      "value": 0,
      "description": "No Faults"
    }]);
    this.addProperty(Properties.BATTERY_LEVEL, 2, 1, PropFormat.UINT8, PropAccess.READ_NOTIFY, PropUnit.PERCENTAGE, [0, 100, 1]);
    this.addProperty(Properties.CHARGING_STATE, 2, 2, PropFormat.UINT8, PropAccess.READ_NOTIFY, PropUnit.NONE, [], [{
        "value": 1,
        "description": "Charging"
      },
      {
        "value": 2,
        "description": "Not Charging"
      },
      {
        "value": 4,
        "description": "Charging"
      },
      {
        "value": 5,
        "description": "Go Charging"
      }
    ]);
    this.addProperty(Properties.BRUSH_LEFT_TIME, 26, 1, PropFormat.UINT16, PropAccess.READ_NOTIFY, PropUnit.HOURS, [0, 300, 1]);
    this.addProperty(Properties.BRUSH_LIFE_LEVEL, 26, 2, PropFormat.UINT8, PropAccess.READ_NOTIFY, PropUnit.PERCENTAGE, [0, 100, 1]);
    this.addProperty(Properties.SIDE_BRUSH_LEFT_TIME, 28, 1, PropFormat.UINT16, PropAccess.READ_NOTIFY, PropUnit.HOURS, [0, 300, 1]);
    this.addProperty(Properties.SIDE_BRUSH_LIFE_LEVEL, 28, 2, PropFormat.UINT8, PropAccess.READ_NOTIFY, PropUnit.PERCENTAGE, [0, 100, 1]);
    this.addProperty(Properties.FILTER_LIFE_LEVEL, 27, 1, PropFormat.UINT8, PropAccess.READ_NOTIFY, PropUnit.PERCENTAGE, [0, 100, 1]);
    this.addProperty(Properties.FILTER_LEFT_TIME, 27, 2, PropFormat.UINT16, PropAccess.READ_NOTIFY, PropUnit.HOURS, [0, 300, 1]);
    this.addProperty(Properties.WORK_MODE, 18, 1, PropFormat.INT32, PropAccess.READ_NOTIFY, PropUnit.HOURS, [0, 17, 1]);
    this.addProperty(Properties.TOTAL_CLEAN_TIME, 18, 13, PropFormat.UINT32, PropAccess.READ_NOTIFY, PropUnit.MINUTES, [0, 4294967295, 1]);
    this.addProperty(Properties.TOTAL_CLEAN_TIMES, 18, 14, PropFormat.UINT32, PropAccess.READ_NOTIFY, PropUnit.NONE, [0, 4294967295, 1]);
    this.addProperty(Properties.TOTAL_CLEAN_AREA, 18, 15, PropFormat.UINT32, PropAccess.READ_NOTIFY, PropUnit.NONE, [0, 4294967295, 1]);
  }

  initDeviceActions() {
    this.addAction(Actions.START_SWEEP, 3, 1, []);
    this.addAction(Actions.STOP_SWEEP, 3, 2, []);
    this.addAction(Actions.START_CHARGE, 2, 1, []);
    this.addAction(Actions.RESET_BRUSH_LIFE, 26, 1, []);
    this.addAction(Actions.RESET_SIDE_BRUSH_LIFE, 28, 1, []);
    this.addAction(Actions.RESET_FILTER_LIFE, 27, 1, []);
    this.addAction(Actions.START_CLEAN, 18, 1, []);
    this.addAction(Actions.STOP_CLEAN, 18, 2, []);
    this.addAction(Actions.LOCATE_ROBOT, 24, 1, []);
    this.addAction(Actions.PLAY_SOUND, 24, 3, []);
  }


  /*----------========== CONFIG ==========----------*/

  hasBuiltInBattery() {
    return true;
  }

  statusSweepingValue() {
    return 1;
  }

  statusIdleValue() {
    return 2;
  }

  statusPausedValue() {
    return 3;
  }

  statusErrorValue() {
    return 4;
  }

  statusGoChargingValue() {
    return 5;
  }

  statusChargingValue() {
    return 6;
  }

  chargingStateChargingValue() {
    return 1;
  }

  chargingStateNotChargingValue() {
    return 2;
  }

  chargingStateGoChargingValue() {
    return 5;
  }


}

module.exports = DreameVacuumMb1808;
