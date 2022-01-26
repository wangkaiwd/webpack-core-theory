// execute pitch loaders from left to right
// execute normal loaders from right to left
const createLoaderObject = (loader) => {
  return { path: loader, pitchExecuted: false, normalExecuted: false, data: {}, raw: false };
};
const iterateNormalLoaders = (loaderContext, cb, args) => {
  const { loaders, index } = loaderContext;
  if (index < 0) {
    cb(null, {
      source: args[0],
      resourceBuffer: loaderContext.resourceBuffer
    });
  } else {
    const loader = loaders[index];
    const normal = require(loader.path);
    loaderContext.normalExecuted = true;
    loaderContext.index--;
    runSyncOrAsync(() => normal.apply(loaderContext, args), loaderContext, (err, ...args) => {
      iterateNormalLoaders(loaderContext, cb, args);
    });
  }
};
const getRequest = (loaderContext, start, end) => {
  const { loaders, resource } = loaderContext;
  const requests = loaders.concat([resource]);
  if (!start) {
    start = 0;
  }
  if (!end && end !== 0) {
    end = requests.length;
  }
  return requests.slice(start, end).join('!');
};
// async or sync both execute cb, result will be parameters
const runSyncOrAsync = (fn, loaderContext, next) => {
  let isSync = true;
  let isDone = false;
  loaderContext.callback = (fn, err, ...args) => {
    isDone = true;
    next(err, ...args);
  };
  loaderContext.async = () => {
    isSync = false;
    return loaderContext.callback;
  };
  const result = fn();
  if (isSync && !isDone) { // sync also can invoke this.callback function
    result ? next(null, result) : next(null);
  }
};
const iteratePitchLoaders = (loaderContext, cb) => {
  const { loaders, index, readResource, resource } = loaderContext;
  if (index >= loaders.length) {
    readResource(resource, (err, data) => {
      loaderContext.resourceBuffer = data;
      loaderContext.index--;
      iterateNormalLoaders(loaderContext, cb, [data]);
    });
  } else {
    const loader = loaders[index];
    const { pitch } = require(loader.path);
    loader.pitchExecuted = true;
    if (pitch) {
      runSyncOrAsync(() => {
        return pitch.call(loaderContext, loaderContext.remainingRequest, loaderContext.precedingRequest, loaderContext.data);
      }, loaderContext, (err, ...args) => {
        if (args.length) {
          loaderContext.index--;
          iterateNormalLoaders(loaderContext, cb, args);
        } else {
          loaderContext.index++;
          iteratePitchLoaders(loaderContext, cb);
        }
      });
    } else {
      loaderContext.index++;
      iteratePitchLoaders(loaderContext, cb);
    }
  }
};
const loaderRunner = (options, cb) => {
  const { resource, loaders, context, readResource } = options;
  const loaderObjects = loaders.map(createLoaderObject);
  const loaderContext = { ...context };
  loaderContext.loaders = loaderObjects;
  loaderContext.resource = resource;
  loaderContext.readResource = readResource;
  loaderContext.index = 0;
  loaderContext.resourceBuffer = undefined;
  loaderContext.async = undefined;
  loaderContext.callback = undefined;

  Object.defineProperty(loaderContext, 'request', {
    get () {
      return getRequest(loaderContext);
    }
  });

  Object.defineProperty(loaderContext, 'remainingRequest', {
    get () {
      return getRequest(loaderContext, loaderContext.index + 1);
    }
  });
  Object.defineProperty(loaderContext, 'precedingRequest', {
    get () {
      return getRequest(loaderContext, 0, loaderContext.index);
    }
  });
  Object.defineProperty(loaderContext, 'data', {
    get () {
      return loaderContext.loaders[loaderContext.index].data;
    }
  });
  // async: need to async read file content
  iteratePitchLoaders(loaderContext, cb);
};

module.exports.runLoaders = loaderRunner;
