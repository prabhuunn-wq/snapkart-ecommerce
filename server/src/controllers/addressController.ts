import { Request, Response } from "express";
import Address from "../models/Address";

export const getAddresses = async (req: any, res: Response) => {
  try {
    const addresses = await Address.find({ user: req.user.id }).sort({
      isDefault: -1,
    });
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch addresses" });
  }
};

export const createAddress = async (req: any, res: Response) => {
  try {
    const { fullName, address, city, pinCode, phone, isDefault } = req.body;

    if (isDefault) {
      await Address.updateMany({ user: req.user.id }, { isDefault: false });
    }

    const existingCount = await Address.countDocuments({ user: req.user.id });

    const newAddress = await Address.create({
      user: req.user.id,
      fullName,
      address,
      city,
      pinCode,
      phone,
      isDefault: isDefault || existingCount === 0,
    });

    res.status(201).json(newAddress);
  } catch (err) {
    console.error("CREATE ADDRESS ERROR:", err);
    res.status(500).json({ message: "Failed to create address" });
  }
};

export const updateAddress = async (req: any, res: Response) => {
  try {
    const { fullName, address, city, pinCode, phone, isDefault } = req.body;

    const existingAddress = await Address.findById(req.params.id);
    if (
      !existingAddress ||
      existingAddress.user.toString() !== req.user._id.toString()
    ) {
      return res.status(404).json({ message: "Address not found" });
    }

    if (isDefault) {
      await Address.updateMany({ user: req.user._id }, { isDefault: false });
    }

    existingAddress.fullName = fullName;
    existingAddress.address = address;
    existingAddress.city = city;
    existingAddress.pinCode = pinCode;
    existingAddress.phone = phone;
    existingAddress.isDefault = isDefault;

    const updated = await existingAddress.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update address" });
  }
};

export const deleteAddress = async (req: any, res: Response) => {
  try {
    const existingAddress = await Address.findById(req.params.id);
    if (
      !existingAddress ||
      existingAddress.user.toString() !== req.user.id.toString()
    ) {
      return res.status(404).json({ message: "Address not found" });
    }

    await existingAddress.deleteOne();
    res.json({ message: "Address deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete address" });
  }
};
