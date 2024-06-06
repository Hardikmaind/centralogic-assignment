import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Employee from "../models/employee.models";
import Shift from "../models/shifts.models";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, assignedShiftHours, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const employee = await Employee.create({
      name,
      email,
      password: hashedPassword,
      assignedShiftHours,
      role,
    });

    res.status(201).json({ message: "Employee registered", employee });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ where: { email } });

    if (!employee || !bcrypt.compareSync(password, employee.password)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: employee.id, role: employee.role },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      },
    );

    const shift = await Shift.create({
      employeeId: employee.id,
      startTime: new Date(),
    });

    res.json({ message: "Login successful", token, shift });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { shiftId } = req.body;
    const shift = await Shift.findByPk(shiftId);

    if (!shift) {
      return res.status(404).json({ message: "Shift not found" });
    }

    shift.endTime = new Date();
    await shift.save();

    res.json({ message: "Shift ended", shift });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
