const { generateTestingUtils } = require('eth-testing');
const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { SSX } = require('../src');

const testingUtils = generateTestingUtils({ providerType: 'MetaMask' });

beforeAll(() => {
  // Manually inject the mocked provider in the window as MetaMask does
  global.window.ethereum = testingUtils.getProvider();
});

afterEach(() => {
  testingUtils.clearAllMocks();
});

test('Instantiate SSX with window.ethereum', () => {
  expect(() => {
    const ssx = new SSX();
  }).not.toThrowError();
});

test('Instantiate SSX with providers.web3.driver', () => {
  expect(() => {
    const config = {
      providers: {
        web3: {
          driver: testingUtils.getProvider(),
        },
      },
    };
    const ssx = new SSX(config);
  }).not.toThrowError();
});

// test('Connect to wallet', async () => {
//   // TODO: expose wallet connection interface
// });

// test('Sign-in with Ethereum', () => {
//   // TODO: sign request with mock provider
//   // expect(async () => {
//   //   const config = {
//   //     providers: {
//   //       web3: {
//   //         driver: testingUtils.getProvider(),
//   //       },
//   //     },
//   //   };
//   //   const ssx = new SSX(config);
//   //   await ssx.signIn();
//   // }).not.toThrowError();
// });

// test('Throw Error if Ethereum Wallet isn\'t found', () => {
//   // TODO: Throw error if no wallet is found
//   // global.window.ethereum = undefined;
//   // const ssx = ;
//   // expect(() => { const ssx = new SSX(); ssx.signIn(); }).toThrowError('An ethereum wallet extension is not installed.');
// });
