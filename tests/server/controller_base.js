export const modules = {
  pugCompiler: () => () => '',
  logger: {info:() => undefined},
  jsAsset: () => undefined,
  cssAsset: () => undefined
};

const attributes = {
  req: {},
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
