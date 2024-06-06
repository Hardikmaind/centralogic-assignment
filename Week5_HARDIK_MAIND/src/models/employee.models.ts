import { DataTypes, Model } from "sequelize";
import sequelize from "../database/dbconn";

import {
  EmployeeAttributes,
  EmployeeCreationAttributes,
} from "../interfaces/interfaces";

class Employee
  extends Model<EmployeeAttributes, EmployeeCreationAttributes>
  implements EmployeeAttributes
{
  id!: string;
  name!: string;
  email!: string;
  password!: string;
  assignedShiftHours!: number;
  role!: "SuperAdmin" | "Manager" | "Employee";
}

Employee.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    assignedShiftHours: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("SuperAdmin", "Manager", "Employee"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Employee",
    tableName: "employees",
    timestamps: true,
  },
);

export default Employee;
