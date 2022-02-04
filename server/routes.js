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
  //TODO: query params
  //TODO: filters
  try {
    productModel.find({}, function (err, product) {
      const productMap = {};

      product.forEach(function (product) {
        productMap[product._id] = product;
      });

      res.send(productMap);
    });
  } catch (error) {}
});

productRouter.post("/create", async (req, res, next) => {
  try {
    const data = req.body;
    const filter = "";
    productModel.updateOne(
      {
        filter,
      },
      {
        ...req.body,
      },
      function (err, result) {
        console.log(err);
      }
    );
    res.send("готово");
  } catch (error) {
    console.error(error);
  }
});

module.exports = productRouter;
