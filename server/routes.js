const { Router } = require(`express`);
const { productModel } = require("./model");

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
    const filter = req?.query;
    const isFilters = Object.keys(filter).length !== 0;
    let newFilter = {};
    if (isFilters) {
      if (Object.keys(filter)[0] === "Название") {
        newFilter.title = {
          $regex: `(\s+${filter["Название"]}|^${filter["Название"]})`,
          $options: "i",
        };
      } else {
        newFilter = {
          description: Object.keys(filter)[0],
          value: {
            $regex: `(\s+${Object.values(filter)[0]}|^${
              Object.values(filter)[0]
            })`,
            $options: "i",
          },
        };
      }
    }
    console.log(newFilter);
    console.log(filter);
    productModel.find(newFilter, (err, product) => {
      const productMap = {};
      product.forEach((p) => {
        productMap[p._id] = p;
      });
      const result = { data: productMap };
      if (!isFilters) {
        const allOptions = new Set([
          "Название",
          ...Object.keys(productMap).flatMap((p) =>
            productMap[p].params.map((param) => param.description)
          ),
        ]);
        result.filters = Array.from(allOptions);
      }

      res.send(result);
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
    console.log("/create", error);
    res.status(400).send(error);
  }
});

module.exports = productRouter;
