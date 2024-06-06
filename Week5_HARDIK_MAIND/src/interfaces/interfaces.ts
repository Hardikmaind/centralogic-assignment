export interface EmployeeAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
  assignedShiftHours: number;
  role: "SuperAdmin" | "Manager" | "Employee";
}

export interface EmployeeCreationAttributes
  extends Omit<EmployeeAttributes, "id"> {}

export interface ShiftAttributes {
  id: string;
  employeeId: string;
  startTime: Date;
  endTime?: Date;
  actualHours?: number;
}

export interface ShiftCreationAttributes
  extends Omit<ShiftAttributes, "id" | "actualHours"> {}

export interface TimesheetAttributes {
  id: string;
  employeeId: string;
  shiftId: string;
  projectName: string;
  taskName: string;
  fromDate: Date;
  toDate: Date;
}

export interface TimesheetCreationAttributes
  extends Omit<TimesheetAttributes, "id"> {}

export interface ClaimsAttributes {
  id: string;
  key: string;
  value: string;
  employeeId: string;
}

export interface ClaimsCreationAttributes
  extends Omit<ClaimsAttributes, "id"> {}

export interface JwtPayload {
  id: string;
  role: "SuperAdmin" | "Manager" | "Employee";
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
