import { Request, Response } from "express";
import Product from "../models/Product";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ message: "Server error, could not fetch products" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, brand, stock, image } =
      req.body;

    const product = await Product.create({
      name,
      description,
      price,
      category,
      brand,
      stock,
      image,
    });

    res.status(201).json(product);
  } catch (error: any) {
    res.status(500).json({ message: "Server error, could not create product" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.json(product);
  } catch (error: any) {
    res.status(500).json({ message: "Server error, could not fetch product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.json(product);
  } catch (error: any) {
    res.status(500).json({ message: "Server error, could not update product" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Server error, could not delete product" });
  }
};
