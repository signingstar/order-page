export const modules = {
  pugCompiler: () => () => '',
  logger: {
    info:() => undefined,
    warn:() => undefined
  },
  jsAsset: () => undefined,
  cssAsset: () => undefined,
  redisClient: {zrangebyscore: () => undefined}
};

const attributes = {
  req: {session: {}},
  res: {}
};

const responders = {
  error: () => undefined,
  redirectForAuthentication: () => true
};

const page = {
  set: () => true
};

export const params = {attributes, responders, page};
