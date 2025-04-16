export const MongoUtils = {
  /**
     get:
input: '314142'
output: '314142'
input: 'addr_314142'
output: '314142'
input: 'addr_pi_314142'
output: '314142'
     */
  get: (id: string): string => {
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
  set: (prefix: string, id: string): string => {
    const cleanId = MongoUtils.get(id); // remove any prefix
    return `${prefix}_${cleanId}`;
  },

  toUserId: (id: string): string => {
    return MongoUtils.set("user", id);
  },

  toAddressId: (id: string): string => {
    return MongoUtils.set("addr", id);
  },

  toStoryId: (id: string): string => {
    return MongoUtils.set("story", id);
  },

  toMediaId: (id: string): string => {
    return MongoUtils.set("media", id);
  },
};
