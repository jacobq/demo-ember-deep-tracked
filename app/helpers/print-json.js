import { helper } from '@ember/component/helper';

export default helper(function printJson(positional /*, named*/) {
  const serialize = (o) => JSON.stringify(o, null, 2);
  if (positional.length > 1) {
    return positional.map(serialize);
  } else {
    return serialize(positional[0] ?? {});
  }
});
