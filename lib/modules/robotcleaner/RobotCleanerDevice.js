const BaseDevice = require('../../base/BaseDevice.js');
const Properties = require('../../constants/Properties.js');
const Actions = require('../../constants/Actions.js');
const Constants = require('../../constants/Constants.js');
const DevTypes = require('../../constants/DevTypes.js');


class RobotCleanerDevice extends BaseDevice {
  constructor(model, deviceId, name, logger) {
    super(model, deviceId, name, logger);
  }


  /*----------========== INIT ==========----------*/

  initialPropertyFetchDone() {
    super.initialPropertyFetchDone();
    // log the the main brush left time when supported
    if (this.supportsMainBrushLeftTimeReporting()) {
      this.logger.info(`Main brush left time: ${this.getMainBrushLeftTime()} hours.`);
    }
    // log the the main brush life level when supported
    if (this.supportsMainBrushLifeLevelReporting()) {
      this.logger.info(`Main brush life level: ${this.getMainBrushLifeLevel()}%.`);
    }
    // log the the side brush left time when supported
    if (this.supportsSideBrushLeftTimeReporting()) {
      this.logger.info(`Side brush left time: ${this.getSideBrushLeftTime()} hours.`);
    }
    // log the the side brush life level when supported
    if (this.supportsSideBrushLifeLevelReporting()) {
      this.logger.info(`Side brush life level: ${this.getSideBrushLifeLevel()}%.`);
    }
    // log the the filter life level when supported
    if (this.supportsFilterLifeLevelReporting()) {
      this.logger.info(`Filter life level: ${this.getFilterLifeLevel()}%.`);
    }
    // log the the filter used time when supported
    if (this.supportsFilterUsedTimeReporting()) {
      this.logger.info(`Filter used time: ${this.getFilterUsedTime()} hours.`);
    }
    // log the the total clean time when supported
    if (this.supportsTotalCleanTimeReporting()) {
      this.logger.info(`Total clean time: ${this.getTotalCleanTime()} hours.`);
    }
    // log the the total clean times when supported
    if (this.supportsTotalCleanTimesReporting()) {
      this.logger.info(`Total cleaned: ${this.getTotalCleanTimes()} times.`);
    }
    // log the the total clean area when supported
    if (this.supportsTotalCleanAreaReporting()) {
      this.logger.info(`Total clean area: ${this.getTotalCleanArea()} m2.`);
    }
  }


  /*----------========== INFO ==========----------*/

  getType() {
    return DevTypes.ROBOT_CLEANER;
  }


  /*----------========== CONFIG ==========----------*/

  statusSweepingValue() {
    return -1;
  }

  statusIdleValue() {
    return -1;
  }

  statusPausedValue() {
    return -1;
  }

  statusErrorValue() {
    return -1;
  }

  statusGoChargingValue() {
    return -1;
  }

  statusChargingValue() {
    return -1;
  }

  statusMopppingValue() {
    return -1;
  }

  statusUpdatingValue() {
    return -1;
  }

  statusSleepValue() {
    return -1;
  }

  statusSweepingAndMoppingValue() {
    return -1;
  }


  /*----------========== FEATURES ==========----------*/

  // mop modes
  supportsMopModes() {
    return this.hasProperty(Properties.MOP_MODE);
  }

  // do not disturb
  supportsDoNotDisturb() {
    return this.hasProperty(Properties.DO_NOT_DISTURB);
  }

  // main brush
  supportsMainBrushLeftTimeReporting() {
    return this.hasProperty(Properties.BRUSH_LEFT_TIME);
  }

  supportsMainBrushLifeLevelReporting() {
    return this.hasProperty(Properties.BRUSH_LIFE_LEVEL);
  }

  // side brush
  supportsSideBrushLeftTimeReporting() {
    return this.hasProperty(Properties.SIDE_BRUSH_LEFT_TIME);
  }

  supportsSideBrushLifeLevelReporting() {
    return this.hasProperty(Properties.SIDE_BRUSH_LIFE_LEVEL);
  }

  // filter
  supportsFilterLifeLevelReporting() {
    return this.hasProperty(Properties.FILTER_LIFE_LEVEL);
  }

  supportsFilterUsedTimeReporting() {
    return this.hasProperty(Properties.FILTER_USED_TIME);
  }

  // totals
  supportsTotalCleanTimeReporting() {
    return this.hasProperty(Properties.TOTAL_CLEAN_TIME);
  }

  supportsTotalCleanTimesReporting() {
    return this.hasProperty(Properties.TOTAL_CLEAN_TIMES);
  }

  supportsTotalCleanAreaReporting() {
    return this.hasProperty(Properties.TOTAL_CLEAN_AREA);
  }


  /*----------========== GETTERS ==========----------*/

  getMopMode() {
    return this.getPropertyValue(Properties.MOP_MODE);
  }

  isDoNotDisturbEnabled() {
    return this.getPropertyValue(Properties.DO_NOT_DISTURB);
  }

  getMainBrushLeftTime() {
    return this.getPropertyValue(Properties.BRUSH_LEFT_TIME);
  }

  getMainBrushLifeLevel() {
    return this.getPropertyValue(Properties.BRUSH_LIFE_LEVEL);
  }

  getSideBrushLeftTime() {
    return this.getPropertyValue(Properties.SIDE_BRUSH_LEFT_TIME);
  }

  getSideBrushLifeLevel() {
    return this.getPropertyValue(Properties.SIDE_BRUSH_LIFE_LEVEL);
  }

  getFilterLifeLevel() {
    return this.getPropertyValue(Properties.FILTER_LIFE_LEVEL);
  }

  getFilterUsedTime() {
    return this.getPropertyValue(Properties.FILTER_USED_TIME);
  }

  getTotalCleanTime() {
    return this.getPropertyValue(Properties.TOTAL_CLEAN_TIME);
  }

  getTotalCleanTimes() {
    return this.getPropertyValue(Properties.TOTAL_CLEAN_TIMES);
  }

  getTotalCleanArea() {
    return this.getPropertyValue(Properties.TOTAL_CLEAN_AREA);
  }


  /*----------========== SETTERS ==========----------*/

  async setMopMode(mopMode) {
    return this.setPropertyValue(Properties.MOP_MODE, mopMode);
  }

  async setDoNotDisturbEnabled(enabled) {
    this.setPropertyValue(Properties.DO_NOT_DISTURB, enabled);
  }


  /*----------========== ACTIONS ==========----------*/

  getActionFriendlyName(actionName) {
    if (actionName === Actions.START_SWEEP) {
      return 'Start';
    } else if (actionName === Actions.STOP_SWEEP) {
      return 'Pause';
    } else if (actionName === Actions.STOP_CLEAN) {
      return 'Stop';
    } else if (actionName === Actions.START_CHARGE) {
      return 'Charge';
    }
    return super.getActionFriendlyName(actionName);
  }


  /*----------========== CONVENIENCE ==========----------*/

  isStatusSweeping() {
    return this.getStatus() === this.statusSweepingValue();
  }

  isStatusIdle() {
    return this.getStatus() === this.statusIdleValue();
  }

  isStatusPause() {
    return this.getStatus() === this.statusPausedValue();
  }

  isStatusError() {
    return this.getStatus() === this.statusErrorValue();
  }

  isStatusGoCharging() {
    return this.getStatus() === this.statusGoChargingValue();
  }

  isStatusCharging() {
    return this.getStatus() === this.statusChargingValue();
  }

  async setSweepActive(active) {
    if (active) {
      this.fireAction(Actions.START_SWEEP);
    } else {
      //  this.fireAction(Actions.STOP_SWEEP); // this just pauses the robot
      this.fireAction(Actions.START_CHARGE); // this forces the robot to go back to the dock even during cleaning
    }
  }


  /*----------========== HELPERS ==========----------*/


}

module.exports = RobotCleanerDevice;
