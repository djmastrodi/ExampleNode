import { contextHandler } from '../connect';

describe.skip('Mongo Connection', () => {
  //let conn: any;
  //let db: any;
  let dbName= "EXAMPLE_NODE";
  let collection= "documents";
  const url = 'mongodb://localhost:27017/';

  it('addMany', async done => {
    const docs = [{ a: 1 }, { a: 2 }, { a: 3 }];

    const context = await contextHandler(collection,dbName,url);
    context.addMany(docs).then(result => {
      expect(result).toBeDefined();
      done();
    });
  });

  it('addOne', async done => {
    const doc = { id: 1, name: 'name 1' };

    const context = await contextHandler(collection,dbName,url);
    context.addOne(doc).then(result => {
      expect(result).toBeDefined();
      done();
    });
  });

  it('getByFilter', async done => {
    const filter = { id: 1 };

    const context = await contextHandler(collection,dbName,url);
    context.getByFilter(filter).then(result => {
      expect(result).toBeDefined();
      done();
    });
  });

  it('getOne', async done => {
    const filter = { id: 1 };

    const context = await contextHandler(collection,dbName,url);
    context.getOne(filter).then((result) => {
      expect(result).toBeDefined();
      done();
    });
  });

  it('getAll', async done => {
    const context = await contextHandler(collection,dbName,url);
    context.getAll().then(result => {
      expect(result).toBeDefined();
      done();
    });
  });

  it('edit', async done => {
    const filter = { _id: 1 };
    const newData = { id: 1, name: 'name 2' };

    const context = await contextHandler(collection,dbName,url);
    context.edit(filter, newData).then(result => {
      expect(result).toBeDefined();
      done();
    });
  });

  it('delete', async done => {
    const filter = { id: 1 };

    const context = await contextHandler(collection,dbName,url);
    context.delete(filter).then(result => {
      expect(result).toBeDefined();
      done();
    })
  });

  it('deleteMany', async done => {
    const filter = { id: 1 };

    const context = await contextHandler(collection,dbName,url);
    context.deleteMany(filter).then(result => {
      expect(result).toBeDefined();
      done();
    });
  });

  it('delete err', async done => {
    const context = await contextHandler(collection,dbName,url);
    context.delete('a').catch(err=>{
      expect(err).toBeDefined();
      done();
    });;
  });
});
