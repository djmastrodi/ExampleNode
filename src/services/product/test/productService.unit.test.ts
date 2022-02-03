import { ProductService } from "../productServices";

const productRepository = {
  getOne: jest.fn().mockResolvedValue(true),
  insertMany: jest.fn().mockResolvedValue(true),
  update: jest.fn().mockResolvedValue(true),
  find: jest.fn().mockResolvedValue(true),
  deleteMany: jest.fn().mockResolvedValue(true),
};

jest.mock("./../../../repository/product/productRepository", () => {
  // eslint-disable-next-line func-names
  return {
    default: function () {
      return productRepository;
    },
  };
});

describe("ProductService", () => {
  const productService = new ProductService();

  it("Deve recuperar um produto", async () => {
    const result = await productService.getOne({ codigo: 1 });
    expect(result).toBeTruthy();
  });

  it("Deve inserir varios produto", async () => {
    const result = await productService.insertMany([
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
    ]);
    expect(result).toBeTruthy();
  });

  it("Deve atualiza um produto", async () => {
    const result = await productService.update(
      { codigo: 1 },
      {
        codigo: 2,
        description: "teste",
        info: { price: 100, discount: 10 },
        status: "Ativo",
      }
    );
    expect(result).toBeTruthy();
  });

  it("Deve recuperar varios produtos", async () => {
    const result = await productService.find({ x: 1 });
    expect(result).toBeTruthy();
  });

  it("Deve excluir varios produtos", async () => {
    const result = await productService.deleteMany({ codigo: 1 });
    expect(result).toBeTruthy();
  });
});
