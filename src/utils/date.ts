/**
 * `DateUtils` is an object that contains helper functions for date-related operations.
 * It provides utility methods to retrieve the current date, calculate epoch times,
 * and generate timestamp pairs for creation and updates.
 *
 * @namespace DateUtils
 */
export const DateUtils = {
  /**
   * Gets the current date as a `Date` object.
   *
   * @returns {Date} The current date and time as a `Date` object.
   *
   * @example
   * const currentDate = DateUtils.getCurDate();
   * console.log(currentDate); // Current date object (e.g., "2024-12-04T10:00:00.000Z")
   */
  getCurDate: (): Date => new Date(),

  /**
   * Gets the current date as a UTC string.
   * This method returns the date in UTC format as a string.
   *
   * @returns {string} The current date in UTC string format (e.g., "Wed, 04 Dec 2024 10:00:00 GMT").
   *
   * @example
   * const currentDateStr = DateUtils.getCurDateStr();
   * console.log(currentDateStr); // "Wed, 04 Dec 2024 10:00:00 GMT"
   */
  getCurDateStr: (): string => new Date().toUTCString(),

  /**
   * Gets the current epoch time (seconds).
   * This method returns the current time in seconds since the Unix epoch.
   *
   * The epoch time is calculated by subtracting milliseconds and converting to seconds.
   *
   * @returns {number} The current epoch time (in seconds).
   *
   * @example
   * const epochTime = DateUtils.getCurDateEpoc();
   * console.log(epochTime); // Example: 1638500000 (epoch timestamp)
   */
  getCurDateEpoc: (): number => {
    const curDate = DateUtils.getCurDate();
    return (curDate.getTime() - curDate.getMilliseconds()) / 1000;
  },

  /**
   * Calculates the epoch time after adding a specified number of minutes.
   * This method takes the current epoch time and adds the specified number of minutes (converted to seconds).
   *
   * @param {number} minuts - The number of minutes to add.
   * @returns {number} The new epoch time after adding the specified minutes.
   *
   * @example
   * const futureEpoch = DateUtils.getEpocAfterMinuts(10);
   * console.log(futureEpoch); // Epoch time 10 minutes from now.
   */
  getEpocAfterMinuts: (minuts: number): number => {
    return DateUtils.getCurDateEpoc() + minuts * 60;
  },

  /**
   * Generates a pair of timestamps for creation and update.
   * The `createdDate` and `updatedDate` are both set to the current date and time.
   *
   * @returns {Object} An object containing the `_createdDate` and `_updatedDate` as `Date` objects.
   *
   * @example
   * const createUpdatePair = DateUtils.getCreateUpdatePair();
   * console.log(createUpdatePair); // { _createdDate: Date, _updatedDate: Date }
   */
  getCreateUpdatePair: (): { _createdDate: Date; _updatedDate: Date } => {
    return {
      _createdDate: DateUtils.getCurDate(),
      _updatedDate: DateUtils.getCurDate(),
    };
  },

  /**
   * Generates an update timestamp pair.
   * The `updatedDate` is set to the current date and time, but no `createdDate` is included.
   *
   * @returns {Object} An object containing the `_updatedDate` as a `Date` object.
   *
   * @example
   * const updatePair = DateUtils.getUpdatePair();
   * console.log(updatePair); // { _updatedDate: Date }
   */
  getUpdatePair: (): { _updatedDate: Date } => {
    return {
      _updatedDate: DateUtils.getCurDate(),
    };
  },

  /**
   * date and time before `agoHr`
   * The `hoursAgo` is set to the current date and time, but no `createdDate` is included.
   *
   * @returns {Object} A `Date` object.
   *
   * @example
   * const agoHr = DateUtils.agoHr(24);
   * console.log(agoHr);
   */
  hoursAgo: (agoHr: number) => new Date(Date.now() - agoHr * 60 * 60 * 1000), // 24 hours in milliseconds

  /**
   * Get UTC date as path YYYY/MM/DD `2024/12/28`
   * @returns '2024/12/28'
   */
  getDatePath: (): string => {
    const now = DateUtils.getCurDate();

    // Get the year, month, and day from the current date
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed, so we add 1
    const day = now.getDate().toString().padStart(2, "0"); // Ensures the day is always two digits

    // Return the formatted path
    return `${year}/${month}/${day}`;
  },
};
