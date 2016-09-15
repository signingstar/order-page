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

const responders = {error: () => undefined};

const page = {};

export const params = {attributes, responders, page};
