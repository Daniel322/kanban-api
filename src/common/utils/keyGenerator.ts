import * as crypto from 'crypto';

const getUniqueKey = (length = 64): string => {
  return crypto.randomBytes(length).toString('hex');
};

export default getUniqueKey;
