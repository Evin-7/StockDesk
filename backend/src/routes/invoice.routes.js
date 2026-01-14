import express from "express";
import Invoice from "../models/Invoice.js";
import Customer from "../models/Customer.js";
import Item from "../models/Item.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate("customerId", "name discount")
      .populate("items.itemId", "name price")
      .sort({ createdAt: -1 });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate("customerId", "name discount")
      .populate("items.itemId", "name price");
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { customerId, items } = req.body;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    let subtotal = 0;
    for (const line of items) {
      const item = await Item.findById(line.itemId);
      if (!item) {
        return res.status(404).json({ message: `Item ${line.itemId} not found` });
      }
      subtotal += item.price * line.quantity;
    }

    const discount = customer.discount;
    const total = subtotal * (1 - discount / 100);

    const invoice = new Invoice({
      customerId,
      items,
      discount,
      total,
    });

    const newInvoice = await invoice.save();
    const populatedInvoice = await Invoice.findById(newInvoice._id)
      .populate("customerId", "name discount")
      .populate("items.itemId", "name price");

    res.status(201).json(populatedInvoice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });
    res.json({ message: "Invoice deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;