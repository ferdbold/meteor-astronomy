import {
  isFunction,
  last
}
from 'lodash';
import callMeteorMethod from '../../storage/utils/call_meteor_method';

function wrapMethod(methodName) {
  return function(...methodArgs) {
    const doc = this;
    const Class = doc.constructor;

    // Get the last argument.
    let callback = last(methodArgs);
    // If the last argument is a callback function, then remove the last
    // argument.
    if (isFunction(callback)) {
      methodArgs.pop();
    }
    // If the last argument is not a callback function, then clear the
    // "callback" variable.
    else {
      callback = undefined;
    }
    // Prepare arguments to be sent to the "/Astronomy/execute" method.
    const meteorMethodArgs = {
      className: Class.getName(),
      selector: {
        _id: doc._id
      },
      methodName,
      methodArgs
    };
    return callMeteorMethod(
      Class, '/Astronomy/execute', [meteorMethodArgs], callback
    );
  };
}

export default wrapMethod;