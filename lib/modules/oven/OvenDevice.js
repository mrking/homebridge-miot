const BaseDevice = require('../../base/BaseDevice.js');
const Properties = require('../../constants/Properties.js');
const Actions = require('../../constants/Actions.js');
const Constants = require('../../constants/Constants.js');
const DevTypes = require('../../constants/DevTypes.js');


class OvenDevice extends BaseDevice {
  constructor(model, deviceId, name, logger) {
    super(model, deviceId, name, logger);
  }


  /*----------========== INIT ==========----------*/

  initialPropertyFetchDone() {
    super.initialPropertyFetchDone();
  }


  /*----------========== INFO ==========----------*/

  getType() {
    return DevTypes.OVEN;
  }


  /*----------========== CONFIG ==========----------*/

  statusIdleValue() {
    return -1;
  }

  statusBusyValue() {
    return -1;
  }

  statusDelayValue() {
    return -1;
  }

  statusFaultValue() {
    return -1;
  }

  statusPausedValue() {
    return -1;
  }

  statusCompletedValue() {
    return -1;
  }

  statusSleepValue() {
    return -1;
  }

  statusPreheatValue() {
    return -1;
  }


  /*----------========== FEATURES ==========----------*/

  // target temperature
  supportsTargetTemperature() {
    return this.hasProperty(Properties.TARGET_TEMPERATURE);
  }

  targetTemperatureRange() {
    let range = this.getPropertyValueRange(Properties.TARGET_TEMPERATURE);
    return (range.length > 2) ? range : [0, 200, 1];
  }

  // target time
  supportsTargetTime() {
    return this.hasProperty(Properties.TARGET_TIME);
  }

  targetTimeRange() {
    let range = this.getPropertyValueRange(Properties.TARGET_TIME);
    return (range.length > 2) ? range : [1, 1440, 1];
  }

  // cook mode reporting
  supportsCookModeReporting() {
    return this.hasProperty(Properties.COOK_MODE);
  }

  // heat level reporting
  supportsHeatLevelsReporting() {
    return this.hasProperty(Properties.HEAT_LEVEL);
  }

  // left time
  supportsLeftTimeReporting() {
    return this.hasProperty(Properties.LEFT_TIME);
  }


  /*----------========== GETTERS ==========----------*/

  getTargetTemperature() {
    return this.getSafePropertyValue(Properties.TARGET_TEMPERATURE);
  }

  getTargetTime() {
    return this.getSafePropertyValue(Properties.TARGET_TIME);
  }

  getCookMode() {
    return this.getPropertyValue(Properties.COOK_MODE);
  }

  getHeatLevel() {
    return this.getPropertyValue(Properties.HEAT_LEVEL);
  }

  getLeftTime() {
    return this.getPropertyValue(Properties.LEFT_TIME);
  }


  /*----------========== SETTERS ==========----------*/

  async setTargetTemperature(targetTemp) {
    this.setPropertyValue(Properties.TARGET_TEMPERATURE, targetTemp);
  }

  async setTargetTime(targetTime) {
    this.setPropertyValue(Properties.TARGET_TIME, targetTime);
  }


  /*----------========== ACTIONS ==========----------*/


  /*----------========== CONVENIENCE ==========----------*/

  isStatusIdle() {
    return this.getStatus() === this.statusIdleValue();
  }

  isStatusBusy() {
    return this.getStatus() === this.statusBusyValue();
  }

  isStatusDelay() {
    return this.getStatus() === this.statusDelayValue();
  }

  isStatusFault() {
    return this.getStatus() === this.statusFaultValue();
  }

  isStatusPaused() {
    return this.getStatus() === this.statusPausedValue();
  }

  isStatusCompleted() {
    return this.getStatus() === this.statusCompletedValue();
  }

  isStatusSleep() {
    return this.getStatus() === this.statusSleepValue();
  }

  isStatusPreheat() {
    return this.getStatus() === this.statusPreheatValue();
  }

  async setCookingActive(active) {
    if (active) {
      this.fireAction(Actions.START_COOK);
    } else {
      this.fireAction(Actions.CANCEL_COOKING);
    }
  }

  isHeating() {
    return this.isStatusBusy();
  }

  startHeatIfNecessary() {
    if (this.isHeating() === false) {
      this.setCookingActive(true);
    }
  }


  /*----------========== HELPERS ==========----------*/


}

module.exports = OvenDevice;
