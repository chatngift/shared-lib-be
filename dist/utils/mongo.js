"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoUtils = void 0;
exports.MongoUtils = {
    /**
       get:
  input: '314142'
  output: '314142'
  input: 'addr_314142'
  output: '314142'
  input: 'addr_pi_314142'
  output: '314142'
       */
    get: (id) => {
        const parts = id.split("_");
        return parts[parts.length - 1];
    },
    /**
     set:
  input: 'addr', '314142'
  output: 'addr_314142'
  input: 'addr', 'addr_314142'
  output: 'addr_314142'
  input: 'addr', 'pi_314142'
  output: 'addr_314142'
     */
    set: (prefix, id) => {
        const cleanId = exports.MongoUtils.get(id); // remove any prefix
        return `${prefix}_${cleanId}`;
    },
    toUserId: (id) => {
        return exports.MongoUtils.set("user", id);
    },
    toAddressId: (id) => {
        return exports.MongoUtils.set("addr", id);
    },
    toStoryId: (id) => {
        return exports.MongoUtils.set("story", id);
    },
    toMediaId: (id) => {
        return exports.MongoUtils.set("media", id);
    },
};
