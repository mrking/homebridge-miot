const HumidifierDevice = require('../HumidifierDevice.js');
const Properties = require('../../../constants/Properties.js');
const Actions = require('../../../constants/Actions.js');
const Constants = require('../../../constants/Constants.js');
const PropFormat = require('../../../constants/PropFormat.js');
const PropUnit = require('../../../constants/PropUnit.js');
const PropAccess = require('../../../constants/PropAccess.js');


class ZhimiHumidifierCa4 extends HumidifierDevice {
  constructor(model, deviceId, name, logger) {
    super(model, deviceId, name, logger);
  }


  /*----------========== DEVICE INFO ==========----------*/

  static getDeviceModel() {
    return "zhimi.humidifier.ca4";
  }

  getDeviceName() {
    return "Mijia Pure Smart Humidifier";
  }

  getDeviceMiotSpec() {
    return "http://miot-spec.org/miot-spec-v2/instance?type=urn:miot-spec-v2:device:humidifier:0000A00E:zhimi-ca4:1";
  }


  /*----------========== INIT ==========----------*/

  initDeviceProperties() {
    // READ/WRITE
    this.addProperty(Properties.POWER, 2, 1, PropFormat.BOOL, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE);
    this.addProperty(Properties.FAN_LEVEL, 2, 5, PropFormat.UINT8, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE, [], [{
        "value": 0,
        "description": "Auto"
      },
      {
        "value": 1,
        "description": "Level1"
      },
      {
        "value": 2,
        "description": "Level2"
      },
      {
        "value": 3,
        "description": "Level3"
      }
    ]);
    this.addProperty(Properties.TARGET_HUMIDITY, 2, 6, PropFormat.UINT8, PropAccess.READ_WRITE_NOTIFY, PropUnit.PERCENTAGE, [30, 80, 1]);
    this.addProperty(Properties.DRY, 2, 8, PropFormat.BOOL, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE);
    this.addProperty(Properties.CHILD_LOCK, 6, 1, PropFormat.BOOL, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE);
    this.addProperty(Properties.SCREEN_BRIGHTNESS, 5, 2, PropFormat.UINT8, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE, [], [{
        "value": 0,
        "description": "Dark"
      },
      {
        "value": 1,
        "description": "Glimmer"
      },
      {
        "value": 2,
        "description": "Brightest"
      }
    ]);
    this.addProperty(Properties.ALARM, 4, 1, PropFormat.BOOL, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE);
    this.addProperty(Properties.FAN_SPEED, 2, 11, PropFormat.INT32, PropAccess.READ_WRITE_NOTIFY, PropUnit.RPM, [200, 2000, 10]);
    this.addProperty(Properties.USE_TIME, 2, 9, PropFormat.UINT32, PropAccess.READ_WRITE_NOTIFY, PropUnit.SECONDS, [0, 2147483600, 1]);
    this.addProperty(Properties.POWER_TIME, 7, 3, PropFormat.UINT32, PropAccess.READ_WRITE_NOTIFY, PropUnit.SECONDS, [0, 4294967295, 1]);

    // READ ONLY
    this.addProperty(Properties.WATER_LEVEL, 2, 7, PropFormat.UINT8, PropAccess.READ_NOTIFY, PropUnit.NONE, [0, 128, 1]);
    this.addProperty(Properties.RELATIVE_HUMIDITY, 3, 9, PropFormat.UINT8, PropAccess.READ_NOTIFY, PropUnit.PERCENTAGE, [0, 100, 1]);
    this.addProperty(Properties.TEMPERATURE, 3, 7, PropFormat.FLOAT, PropAccess.READ_NOTIFY, PropUnit.CELSIUS, [-40, 125, 0.1]);
    this.addProperty(Properties.TEMPERATURE_FAHRENHEIT, 3, 8, PropFormat.FLOAT, PropAccess.READ_NOTIFY, PropUnit.FAHRENHEIT, [-40, 257, 0.1]);
    this.addProperty(Properties.ACTUAL_SPEED, 7, 1, PropFormat.UINT32, PropAccess.READ, PropUnit.RPM, [0, 2000, 1]);
  }

  initDeviceActions() {
    //none
  }


  /*----------========== CONFIG ==========----------*/


}

module.exports = ZhimiHumidifierCa4;
