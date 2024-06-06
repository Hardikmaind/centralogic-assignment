import { DataTypes, Model } from "sequelize";
import sequelize from "../database/dbconn";
import {
  ShiftAttributes,
  ShiftCreationAttributes,
} from "../interfaces/interfaces";
class Shift
  extends Model<ShiftAttributes, ShiftCreationAttributes>
  implements ShiftAttributes
{
  public id!: string;
  public employeeId!: string;
  public startTime!: Date;
  public endTime?: Date;
  public actualHours?: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Shift.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    employeeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "employees",
        key: "id",
      },
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    actualHours: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Shift",
    tableName: "shifts",
    timestamps: true,
  },
);

Shift.beforeSave((shift) => {
  if (shift.endTime) {
    const duration =
      (new Date(shift.endTime).getTime() -
        new Date(shift.startTime).getTime()) /
      (1000 * 60 * 60);
    shift.actualHours = parseFloat(duration.toFixed(2));
  }
});

export default Shift;
