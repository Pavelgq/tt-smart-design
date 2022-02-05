const { Router } = require(`express`);
const productModel = require("./model");

const productRouter = new Router();

productRouter.use((req, res, next) => {
  console.log("dssd");
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(
    `Access-Control-Allow-Headers`,
    `Origin, X-Requested-With, Content-Type, Accept`
  );
  res.header("Access-Control-Allow-Credentials", "true");

  next();
});

productRouter.get("/all", async (req, res, next) => {
  // TODO: query params
  // TODO: filters
  try {
    productModel.find({}, (err, product) => {
      const productMap = {};
      console.log(product);
      product.forEach((p) => {
        productMap[p._id] = p;
      });
      res.send(productMap);
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

productRouter.post("/create", async (req, res, next) => {
  try {
    const data = req.body;
    await productModel.create(data);
    res.send("Продукт успешно создан");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = productRouter;
