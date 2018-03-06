var expect = require('expect');

var { generateMessage } = require('./../utils/messages');

describe('generateMessage', () => {
  it('Should generate correct message object', (done) => {
    var res = generateMessage('Admin', 'Welcome user from Admin');

    if (!res) {
      done();
    }
    else done();
  });
});