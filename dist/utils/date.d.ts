export declare const DateUtils: {
    getCurDate: () => Date;
    getCurDateStr: () => string;
    getCurDateEpoc: () => number;
    getEpocAfterMinuts: (minuts: number) => number;
    getCreateUpdatePair: () => {
        _createdDate: Date;
        _updatedDate: Date;
    };
    getUpdatePair: () => {
        _updatedDate: Date;
    };
};
