import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Pool } from "pg";
import pool from "./pgConfig";

dotenv.config({ path: "./.env" });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// POST API endpoint to filter orders and store orderIDs
app.post("/processOrders", async (req: Request, res: Response) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      return res
        .status(400)
        .json({ error: "Invalid payload format, please provide items list" });
    }

    const filteredOrders = items.filter((item: any) => {
      return !item.OrderBlocks.some((block: any) => {
        return (
          Array.isArray(block.lineNo) &&
          block.lineNo.some((line: number) => line % 3 === 0)
        );
      });
    });

    const orderIDs = filteredOrders.map((order: any) => order.orderID);
    const duplicateOrderIDs: string[] = [];

    // Store orderIDs in PostgreSQL database
    for (const orderID of orderIDs) {
      // Check if orderID already exists in the table
      const result = await pool.query(
        "SELECT orderID FROM orders WHERE orderID = $1",
        [orderID]
      );
      if (result.rows.length === 0) {
        await pool.query("INSERT INTO orders (orderID) VALUES ($1)", [orderID]);
      } else {
        duplicateOrderIDs.push(orderID);
      }
    }

    if (duplicateOrderIDs.length > 0) {
      // return res.status(400).json({ error: "Order Id Already Exists in the table", duplicateOrderIDs });
      return res
        .status(400)
        .json({
          error:
            "OrdersId whose orderBlocks line no is not divisible by 3 are processed and stored successfully,Order Id which already exists in the table are",
          duplicateOrderIDs,
        });
    }

    res
      .status(200)
      .json({ message: "Orders whose orderBlocks line no is not divisible by 3 are processed and stored successfully" });
  } catch (error) {
    console.error("Error processing orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ output: "this is haridk maind!, your server is ready" });
});

app.post("/processArray", async (req: Request, res: Response) => {
    try {
        const { array } = req.body;

        if (!array || !Array.isArray(array)) {
            return res.status(400).json({ error: "Invalid payload format, please provide an array" });
        }

        const arrayFunctionsResult = {
            "Length of the array": array.length,
            "Concatenated array": array.concat([4, 5, 6]),
            "Every element is greater than 0": array.every((val) => val > 0),
            "Filtered array (even numbers)": array.filter((val) => val % 2 === 0),
            "First element greater than 2": array.find((val) => val > 2),
            "Index of the first element greater than 2": array.findIndex((val) => val > 2),
            "Includes value 2": array.includes(2),
            "Index of value 2": array.indexOf(2),
            "Joined array elements with '-'": array.join('-'),
            "Last index of value 2": array.lastIndexOf(2),
            "Mapped array (doubled each element)": array.map((val) => val * 2),
            "Popped last element": array.pop(),
            "Pushed 4 into the array": array.push(4),
            "Reduced array (sum of all elements)": array.reduce((acc, val) => acc + val, 0),
            "ReducedRight array (sum of all elements from right)": array.reduceRight((acc, val) => acc + val, 0),
            "Reversed array": array.reverse(),
            "Shifted first element": array.shift(),
            "Sliced array (from index 1 to 3)": array.slice(1, 3),
            "Some elements are greater than 2": array.some((val) => val > 2),
            "Sorted array": array.slice().sort((a, b) => a - b),
            "Spliced array (removed 2 elements from index 1)": array.splice(1, 2),
            "Converted array to string": array.toString(),
            "Unshifted 0 into the array": array.unshift(0),
            "sorted array in ascending order is":array.slice().sort((a, b) => a - b),
        };
        

        res.status(200).json(arrayFunctionsResult);
    } catch (error) {
        console.error("Error processing array:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


//taken hardcoded array of objects
const students = [
    { name: "Alice", age: 20, grade: 75 },
    { name: "Bob", age: 22, grade: 85 },
    { name: "Charlie", age: 21, grade: 60 },
    { name: "David", age: 19, grade: 45 },
    { name: "Eve", age: 20, grade: 90 }
  ];
  
  // 1. Filter students who passed (grade >= 50)
  function filterPassedStudents(students) {
    return students.filter(student => student.grade >= 50);
  }
  
  // 2. Get an array of student names
  function getStudentNames(students) {
    return students.map(student => student.name);
  }
  
  // 3. Sort students by grade in ascending order
  function sortStudentsByGrade(students) {
    return students.slice().sort((a, b) => a.grade - b.grade);
  }
  
  // 4. Get the average age of all students
  function getAverageAge(students) {
    const totalAge = students.reduce((acc, student) => acc + student.age, 0);
    return totalAge / students.length;
  }
  
  // Usage
  console.log("Passed students:", filterPassedStudents(students));
  console.log("Student names:", getStudentNames(students));
  console.log("Students sorted by grade:", sortStudentsByGrade(students));
  console.log("Average age of students:", getAverageAge(students));
  


//here i have made an post api endpoint to process the students array
  app.post("/processStudents", async (req: Request, res: Response) => {
    try {
        const { students } = req.body;
  
        if (!students || !Array.isArray(students)) {
            return res.status(400).json({ error: "Invalid payload format, please provide an array of students" });
        }
  
        const passedStudents = students.filter((student: any) => student.grade >= 50);
        const studentNames = students.map((student: any) => student.name);
        const studentsSortedByGrade = students.slice().sort((a: any, b: any) => a.grade - b.grade);
        const totalAge = students.reduce((acc: any, student: any) => acc + student.age, 0);
        const averageAge = totalAge / students.length;
  
        const studentsResult = {
            "Passed students": passedStudents,
            "Student names": studentNames,
            "Students sorted by grade": studentsSortedByGrade,
            "Average age of students": averageAge
        };
  
        res.status(200).json(studentsResult);
    } catch (error) {
        console.error("Error processing students:", error);
        res.status(500).json({ error: "Internal server error" });
    }
  })

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
