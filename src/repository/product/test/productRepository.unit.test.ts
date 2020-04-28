import { ProductRepository } from '../productRepository';

jest.mock('./../../../infrastructure/database/connect', () => ({
  contextHandler: () => ({
    getAll: () => new Promise(res => res(true)),
    getByFilter: () => new Promise(res => res(true)),
    getOne: () => new Promise(res => res(true)),
    addOne: () => new Promise(res => res(true)),
    addMany: () => new Promise(res => res(true)),
    edit: () => new Promise(res => res(true)),
    delete: () => new Promise(res => res(true)),
    deleteMany: () => new Promise(res => res(true)),
  }),
  connectToDatabase: () => ({
    db: () => ({
      collection: () => new Promise(res => res(true)),
    }),
  }),
}));

describe('ProductRepository', () => {
  const productRepository = new ProductRepository();

  it('Deve excluir os registros conforme filtro', () => {
    expect(
      productRepository.deleteMany({ codigo: 1 }),
    ).resolves.toBeTruthy();
  });

  it('Deve inserir os registros', () => {
    expect(
      productRepository.insertMany([
        {
          codigo: 1,
          description: "teste",
          info: { price: 100, discount: 10 },
          status: "Ativo",
        },
        {
          codigo: 2,
          description: "teste",
          info: { price: 100, discount: 10 },
          status: "Ativo",
        },
      ]),
    ).resolves.toBeTruthy();
  });

  it('Deve atualizar os registros', () => {
    expect(
      productRepository.update({ codigo: 1 },
        {
          codigo: 2,
          description: "teste",
          info: { price: 100, discount: 10 },
          status: "Ativo",
        }),
    ).resolves.toBeTruthy();
  });

  it('Deve buscar os registros', () => {
    expect(
      productRepository.find({ x: 1 }),
    ).resolves.toBeTruthy();
  });

  it('Deve buscar um registro', () => {
    expect(
      productRepository.getOne({ codigo: 1 }),
    ).resolves.toBeTruthy();
  });
});
