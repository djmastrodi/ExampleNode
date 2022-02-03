import { contextHandler } from "../connect";

describe("Mongo Connection", () => {
  let collectionName = "documents";
  const url =  process.env.MONGO_URL;

  it("addMany", async (done) => {
    const docs = [{ a: 1 }, { a: 2 }, { a: 3 }];

    let context = await contextHandler(collectionName, "example", url);
    context.addMany(docs).then((result) => {
      expect(result).toBeDefined();
      context = null;
      done();
    });
  });

  it("addOne", async (done) => {
    const doc = { id: 1, name: "name 1" };

    let context = await contextHandler(collectionName, "example", url);
    context.addOne(doc).then((result) => {
      expect(result).toBeDefined();
      context = null;
      done();
    });
  });

  it("getByFilter", async (done) => {
    const filter = { id: 1 };

    let context = await contextHandler(collectionName, "example", url);
    context.getByFilter(filter).then((result) => {
      expect(result).toBeDefined();
      context = null;
      done();
    });
  });

  it("getOne", async (done) => {
    const filter = { id: 1 };

    let context = await contextHandler(collectionName, "example", url);
    context.getOne(filter).then((result) => {
      expect(result).toBeDefined();
      context = null;
      done();
    });
  });

  it("getAll", async (done) => {
    let context = await contextHandler(collectionName, "example", url);
    context.getAll().then((result) => {
      expect(result).toBeDefined();
      context = null;
      done();
    });
  });

  it.skip("edit", async (done) => {
    const filter = { _id: 1 };
    const newData = { id: 1, name: "name 2" };

    let context = await contextHandler(collectionName, "example", url);
    context.edit(filter, newData).then((result) => {
      expect(result).toBeDefined();
      context = null;
      done();
    });
  });

  it("delete", async (done) => {
    const filter = { id: 1 };

    let context = await contextHandler(collectionName, "example", url);
    context.delete(filter).then((result) => {
      expect(result).toBeDefined();
      context = null;
      done();
    });
  });

  it("deleteMany", async (done) => {
    const filter = { id: 1 };

    let context = await contextHandler(collectionName, "example", url);
    context.deleteMany(filter).then((result) => {
      expect(result).toBeDefined();
      context = null;
      done();
    });
  });

  it("delete err", async (done) => {
    let context = await contextHandler(collectionName, "example", url);
    context.delete("a").catch((err) => {
      expect(err).toBeDefined();
      context = null;
      done();
    });
  });
});
