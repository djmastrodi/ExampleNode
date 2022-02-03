import express from "express";
import { Logger } from "./infrastructure";
// const PORT = process.env.PORT || 3000;

import { ProductRouters, ProductController } from "./controllers";
import { createContainer, InjectionMode, asClass } from "awilix";
require('dotenv').config();
console.log(process.env);
const logger = Logger();
const bodyParser = require("body-parser");

export default new (class App {
  public express: express.Express;

  private containerDI = createContainer({
    injectionMode: InjectionMode.CLASSIC,
  });

  private loggerMiddleware(
    request: express.Request,
    response: express.Response,
    next
  ) {
    logger.info(
      JSON.stringify({
        Params: request.params,
        path: request.path,
        method: request.method,
        body: request.body,
        query: request.query,
      })
    );
    next();
  }

  constructor() {
    this.express = express();
    this.dependencyInjection();
    this.routes();
    this.start();
  }

  public start(): void {
    console.log("starting.....");
    const port = 3000;

    this.express.set("port", port);

    this.express.listen(port, () => {
      const startingMessage = `Thing starting. Listening on port ${port}`;
      console.log(startingMessage);
    });
  }

  private dependencyInjection(): void {
    this.containerDI.register({
      productController: asClass(ProductController),
    });
  }

  private routes(): void {
    const router = express.Router();
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.all("*", this.loggerMiddleware);
    

    ProductRouters(router, this.containerDI.resolve("productController"));

    this.express.use("/", router);
  }
})();
