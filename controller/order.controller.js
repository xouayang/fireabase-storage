const Category = require("../model/category.model");
const Order = require("../model/roder.model");
const OrderDetails = require("../model/orderDetails.model");
exports.create = async (req, res) => {
  const user = req.payload.ID;
  const item = req.body.item;
  try {
     await Order.create({ user: user }).then((data) => {
      if (data) {
        for (let i = 0; i < item.length; i++) {
          OrderDetails.create({
            order: data.order.id,
            product: item[i].product,
            quantity: item[i].quantity,
          });
        }
        return res.status(201).json({result:"order Success"})
      }
    });
  } catch (error) {
   return res.status(500).json({message:error.message})
  }
};
// get all
exports.getall = async (req, res) => {
  try {
    const category = await Category.findAndCountAll();
    if (category.length == 0) {
      return res.status(404).json({ message: "NOT FOUND DATA" });
    } else {
      return res.status(200).json(category);
    }
  } catch (error) {
    console.log(error);
  }
};
// get by id
exports.getSingle = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (category) {
      res.json(category);
    }
  } catch (error) {
    console.log(error);
  }
};
// update
exports.updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryData = await Category.findByPk(id);
    if (categoryData) {
      categoryData.category = req.body.category;
      await categoryData.save();
      res.json(categoryData);
    } else {
      res.send("NOT FOUND");
    }
  } catch (error) {
    console.log(error);
  }
};

// delete
exports.deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryData = await Category.findByPk(id);
    if (categoryData) {
      categoryData.destroy();
      res.json("Deleted");
    } else {
      res.send("NOT FOUND");
    }
  } catch (error) {
    console.log(error);
  }
};
