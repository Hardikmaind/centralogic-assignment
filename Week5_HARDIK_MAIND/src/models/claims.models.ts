import { DataTypes, Model } from "sequelize";
import sequelize from "../database/dbconn";
import {
  ClaimsCreationAttributes,
  ClaimsAttributes,
} from "../interfaces/interfaces";

class Claims
  extends Model<ClaimsAttributes, ClaimsCreationAttributes>
  implements ClaimsAttributes
{
  public id!: string;
  public key!: string;
  public value!: string;
  public employeeId!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Claims.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    employeeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "employees",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Claims",
    tableName: "claims",
    timestamps: true,
  },
);

export default Claims;
