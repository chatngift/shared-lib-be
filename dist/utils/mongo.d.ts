export declare const MongoUtils: {
    /**
       get:
  input: '314142'
  output: '314142'
  input: 'addr_314142'
  output: '314142'
  input: 'addr_pi_314142'
  output: '314142'
       */
    get: (id: string) => string;
    /**
     set:
  input: 'addr', '314142'
  output: 'addr_314142'
  input: 'addr', 'addr_314142'
  output: 'addr_314142'
  input: 'addr', 'pi_314142'
  output: 'addr_314142'
     */
    set: (prefix: string, id: string) => string;
    toUserId: (id: string) => string;
    toAddressId: (id: string) => string;
    toStoryId: (id: string) => string;
    toMediaId: (id: string) => string;
};
