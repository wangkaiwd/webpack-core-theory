chunkLoadingGlobal.push([['src_video_js'], {
  './src/video.js': (module, exports, require) => {
    // set es6 module flag
    // add get method
    const webpackDefaultExport = 'video';
    require.r(exports);
    require.d(exports, {
      default: () => webpackDefaultExport
    });
  }
}]);
