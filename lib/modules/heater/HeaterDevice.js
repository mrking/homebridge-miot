const BaseDevice = require('../../base/BaseDevice.js');
const Properties = require('../../constants/Properties.js');
const Constants = require('../../constants/Constants.js');
const DevTypes = require('../../constants/DevTypes.js');


class HeaterDevice extends BaseDevice {
  constructor(model, deviceId, name, logger) {
    super(model, deviceId, name, logger);
  }


  /*----------========== INIT ==========----------*/

  initialPropertyFetchDone() {
    super.initialPropertyFetchDone();
    // nothing special yet
  }


  /*----------========== INFO ==========----------*/

  getType() {
    return DevTypes.HEATER;
  }


  /*----------========== CONFIG ==========----------*/

  fanSwingModeValue() {
    return -1;
  }

  fanNotSwingModeValue() {
    return -1;
  }


  /*----------========== FEATURES ==========----------*/


  // heat levels
  supportsHeatLevels() {
    return this.hasProperty(Properties.HEAT_LEVEL);
  }

  // swing mode
  supportsFanSwingMode() {
    return this.fanSwingModeValue() !== -1;
  }

  supportsFanNotSwingMode() {
    return this.fanNotSwingModeValue() !== -1;
  }

  supportsSwingModes() {
    return this.supportsFanSwingMode() && this.supportsFanNotSwingMode() && this.hasProperty(Properties.MODE);
  }

  // target temperature
  supportsTargetTemperature() {
    return this.hasProperty(Properties.TARGET_TEMPERATURE);
  }

  targetTemperatureRange() {
    let range = this.getPropertyValueRange(Properties.TARGET_TEMPERATURE);
    return (range.length > 2) ? range : [10, 35, 1];
  }

  // fan
  supportsFan() {
    return this.hasProperty(Properties.FAN);
  }

  // fan
  supportsPcbTemperatureReporting() {
    return this.hasProperty(Properties.PCB_TEMPERATURE);
  }



  /*----------========== GETTERS ==========----------*/

  getHeatLevel() {
    return this.getPropertyValue(Properties.HEAT_LEVEL);
  }

  getTargetTemperature() {
    return this.getSafePropertyValue(Properties.TARGET_TEMPERATURE);
  }

  isFanOn() {
    return this.getSafePropertyValue(Properties.FAN);
  }

  getPcbTemperature() {
    return this.getSafePropertyValue(Properties.PCB_TEMPERATURE);
  }

  /*----------========== SETTERS ==========----------*/

  async setHeatLevel(level) {
    this.setPropertyValue(Properties.HEAT_LEVEL, level);
  }

  async setTargetTemperature(targetTemp) {
    this.setPropertyValue(Properties.TARGET_TEMPERATURE, targetTemp);
  }

  async setFanOn(fanOn) {
    this.setPropertyValue(Properties.FAN, fanOn);
  }


  /*----------========== ACTIONS ==========----------*/


  /*----------========== CONVENIENCE ==========----------*/

  isFanSwingModeEnabled() {
    if (this.supportsFanSwingMode()) {
      return this.getMode() === this.fanSwingModeValue();
    }
    return false;
  }

  isFanNotSwingModeEnabled() {
    if (this.supportsFanNotSwingMode()) {
      return this.getMode() === this.fanNotSwingModeValue();
    }
    return false;
  }

  async enableFanSwingMode() {
    if (this.supportsFanSwingMode()) {
      this.setMode(this.fanSwingModeValue());
    }
  }

  async enableFanNotSwingMode() {
    if (this.supportsFanNotSwingMode()) {
      this.setMode(this.fanNotSwingModeValue());
    }
  }

  isHeating() {
    return this.isPowerOn();
  }


  /*----------========== HELPERS ==========----------*/


}

module.exports = HeaterDevice;
