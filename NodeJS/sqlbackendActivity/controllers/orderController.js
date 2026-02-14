const pool = require("../db/connection");

exports.placeOrder = async (req, res, next) => {
  const connection = await pool.getConnection();

  try {
    const { custname, items } = req.body;

    await connection.beginTransaction();

    let totalAmount = 0;

    //Check stock & calculate total
    for (let item of items) {
      const [product] = await connection.query(
        "SELECT * FROM products WHERE id = ? FOR UPDATE",
        [item.product_id]
      );

      if (product.length === 0) {
        throw new Error("Product not found");
      }

      if (product[0].stock < item.quantity) {
        throw new Error(`Insufficient stock for product ID ${item.product_id}`);
      }

      totalAmount += product[0].price * item.quantity;

      //Reduce stock
      await connection.query(
        "UPDATE products SET stock = stock - ? WHERE id = ?",
        [item.quantity, item.product_id]
      );
    }

    //Insert order record
    const [orderResult] = await connection.query(
      "INSERT INTO orders (custname, totalamount) VALUES (?, ?)",
      [custname, totalAmount]
    );

    const orderId = orderResult.insertId;

    //Insert order items
    for (let item of items) {
      await connection.query(
        "INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)",
        [orderId, item.product_id, item.quantity]
      );
    }

    await connection.commit();

    res.status(201).json({
      message: "Order placed successfully",
      orderId,
      totalAmount,
    });

  } catch (error) {
    await connection.rollback();
    res.status(400).json({ message: error.message });
  } finally {
    connection.release();
  }
};
