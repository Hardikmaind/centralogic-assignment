import { Request, Response } from 'express';
import sequelize from '../database/dbconn';

export const getReport = async (req: Request, res: Response) => {
  try {
    const reports = await sequelize.query(`
      SELECT e.id, e.name, e.assignedShiftHours, SUM(s.actualHours) as actualHours
      FROM employees e
      LEFT JOIN shifts s ON e.id = s.employeeId
      GROUP BY e.id
    `, { type: sequelize.QueryTypes.SELECT });

    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
