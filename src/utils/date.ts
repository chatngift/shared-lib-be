export const DateUtils = {
  getCurDate: () => new Date(),
  getCurDateStr: () => new Date().toUTCString(),
  getCurDateEpoc: () => {
    const curDate = DateUtils.getCurDate();
    return (curDate.getTime() - curDate.getMilliseconds()) / 1000;
  },
  getEpocAfterMinuts: (minuts: number) => {
    return DateUtils.getCurDateEpoc() + minuts * 60;
  },

  getCreateUpdatePair: () => {
    return {
      _createdDate: DateUtils.getCurDate(),
      _updatedDate: DateUtils.getCurDate(),
    };
  },
  getUpdatePair: () => {
    return {
      _updatedDate: DateUtils.getCurDate(),
    };
  },
};
