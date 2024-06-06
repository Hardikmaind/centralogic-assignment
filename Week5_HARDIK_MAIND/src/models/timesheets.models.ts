import { DataTypes, Model } from "sequelize";
import sequelize from "../database/dbconn";
import {
  TimesheetAttributes,
  TimesheetCreationAttributes,
} from "../interfaces/interfaces";
class Timesheet
  extends Model<TimesheetAttributes, TimesheetCreationAttributes>
  implements TimesheetAttributes
{
  public id!: string;
  public employeeId!: string;
  public shiftId!: string;
  public projectName!: string;
  public taskName!: string;
  public fromDate!: Date;
  public toDate!: Date;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Timesheet.init(
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
    shiftId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "shifts",
        key: "id",
      },
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taskName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fromDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    toDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Timesheet",
    tableName: "timesheets",
    timestamps: true,
  },
);

export default Timesheet;
