// File: __mocks__/multer.mock.js

const multer = jest.requireActual('multer');

const memoryStorage = multer.memoryStorage();

const multerMock = {
  memoryStorage: jest.fn(() => memoryStorage),
  single: jest.fn(),
};

module.exports = multerMock;
