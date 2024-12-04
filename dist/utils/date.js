"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtils = void 0;
exports.DateUtils = {
    getCurDate: () => new Date(),
    getCurDateStr: () => new Date().toUTCString(),
    getCurDateEpoc: () => {
        const curDate = exports.DateUtils.getCurDate();
        return (curDate.getTime() - curDate.getMilliseconds()) / 1000;
    },
    getEpocAfterMinuts: (minuts) => {
        return exports.DateUtils.getCurDateEpoc() + minuts * 60;
    },
    getCreateUpdatePair: () => {
        return {
            _createdDate: exports.DateUtils.getCurDate(),
            _updatedDate: exports.DateUtils.getCurDate(),
        };
    },
    getUpdatePair: () => {
        return {
            _updatedDate: exports.DateUtils.getCurDate(),
        };
    },
};
