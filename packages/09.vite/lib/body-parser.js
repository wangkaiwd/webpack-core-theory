function readBody (stream) {
  return new Promise((resolve, reject) => {
    const buffers = [];
    stream.on('data', (chunk) => {
      buffers.push(chunk);
    });
    stream.on('end', () => {
      resolve(Buffer.concat(buffers).toString());
    });
  });

}

module.exports = readBody;
