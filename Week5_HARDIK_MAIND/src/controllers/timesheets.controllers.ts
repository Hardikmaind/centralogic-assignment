import { Request, Response } from 'express';
import Timesheet from '../models/timesheets.models';

export const createTimesheet = async (req: Request, res: Response) => {
  try {
    const { employeeId, shiftId, projectName, taskName, fromDate, toDate } = req.body;

    const timesheet = await Timesheet.create({
      employeeId,
      shiftId,
      projectName,
      taskName,
      fromDate,
      toDate
    });

    res.status(200).json({ message: 'Timesheet entry created', timesheet });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
