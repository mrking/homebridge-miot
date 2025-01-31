const DehumidifierDevice = require('../DehumidifierDevice.js');
const Properties = require('../../../constants/Properties.js');
const Actions = require('../../../constants/Actions.js');
const Constants = require('../../../constants/Constants.js');
const PropFormat = require('../../../constants/PropFormat.js');
const PropUnit = require('../../../constants/PropUnit.js');
const PropAccess = require('../../../constants/PropAccess.js');


class NwtDerh312en extends DehumidifierDevice {
  constructor(model, deviceId, name, logger) {
    super(model, deviceId, name, logger);
  }


  /*----------========== DEVICE INFO ==========----------*/

  static getDeviceModel() {
    return "nwt.derh.312en";
  }

  getDeviceName() {
    return "Widetech Dehumidifier";
  }

  getDeviceMiotSpec() {
    return "https://miot-spec.org/miot-spec-v2/instance?type=urn:miot-spec-v2:device:dehumidifier:0000A02D:nwt-312en:1";
  }


  /*----------========== INIT ==========----------*/

  initDeviceProperties() {
    // READ/WRITE
    this.addProperty(Properties.POWER, 2, 1, PropFormat.BOOL, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE);
    this.addProperty(Properties.MODE, 2, 3, PropFormat.UINT8, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE, [], [{
        "value": 1,
        "description": "Tagget-humid"
      },
      {
        "value": 2,
        "description": "Dry-cloth"
      }
    ]);
    this.addProperty(Properties.TARGET_HUMIDITY, 2, 5, PropFormat.UINT8, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE, [], [{
        "value": 30,
        "description": "Continue"
      },
      {
        "value": 40,
        "description": "Humidity 40"
      },
      {
        "value": 50,
        "description": "Humidity 50"
      },
      {
        "value": 60,
        "description": "Humidity 60"
      },
      {
        "value": 70,
        "description": "Humidity 70"
      }
    ]);
    this.addProperty(Properties.FAN_LEVEL, 2, 7, PropFormat.UINT8, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE, [], [{
        "value": 0,
        "description": "Auto"
      },
      {
        "value": 1,
        "description": "Level1"
      }
    ]);
    this.addProperty(Properties.ALARM, 4, 1, PropFormat.BOOL, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE);
    this.addProperty(Properties.LED, 5, 1, PropFormat.BOOL, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE);
    this.addProperty(Properties.CHILD_LOCK, 6, 1, PropFormat.BOOL, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE);

    // READ ONLY
    this.addProperty(Properties.DEVICE_FAULT, 2, 2, PropFormat.UINT8, PropAccess.READ_NOTIFY, PropUnit.NONE, [], [{
      "value": 0,
      "description": "No Faults"
    }]);
    this.addProperty(Properties.RELATIVE_HUMIDITY, 3, 1, PropFormat.UINT8, PropAccess.READ_NOTIFY, PropUnit.PERCENTAGE, [0, 100, 1]);
    this.addProperty(Properties.TEMPERATURE, 3, 7, PropFormat.FLOAT, PropAccess.READ_NOTIFY, PropUnit.CELSIUS, [-30, 100, 1]);
    this.addProperty(Properties.COIL_TEMP, 7, 1, PropFormat.FLOAT, PropAccess.READ_NOTIFY, PropUnit.CELSIUS, [-30, 200, 1]);
    this.addProperty(Properties.COMPRESSOR_STATUS, 7, 2, PropFormat.BOOL, PropAccess.READ_NOTIFY, PropUnit.NONE);
    this.addProperty(Properties.WATER_TANK_STATUS, 7, 3, PropFormat.BOOL, PropAccess.READ_NOTIFY, PropUnit.NONE);
    this.addProperty(Properties.DEFROST_STATUS, 7, 4, PropFormat.BOOL, PropAccess.READ_NOTIFY, PropUnit.NONE);
  }

  initDeviceActions() {
    //none
  }


  /*----------========== CONFIG ==========----------*/

  targetHumidityMinVal() {
    return 30;
  }

  targetHumidityMaxVal() {
    return 70;
  }

  targetHumidityStepVal() {
    return 10;
  }


}

module.exports = NwtDerh312en;
