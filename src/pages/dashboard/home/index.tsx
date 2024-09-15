import StatCard from "@/components/dashboard/home/StatCard";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Avathar from "../../../assets/icons/Stat.png";
import { useEffect, useState } from "react";

const Home = () => {
  const [tableData, setTableData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("/mock.json");
      localStorage.setItem("tableData", JSON.stringify(response?.data));
      setTableData(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("tableData");
    if (!storedData) {
      fetchData();
    } else {
      setTableData(JSON.parse(storedData));
    }
  }, []);

  const totalStudents = tableData?.courses || [];
  const finalCount = totalStudents?.reduce((sum, item) => {
    return sum + (item?.numberOfStudents || 0);
  }, 0);

  const totalCourses = tableData?.courses?.length;

  const totalPrice = totalStudents?.reduce((price, item) => {
    return price + item?.numberOfStudents * item?.price;
  }, 0);

  if (tableData === null) return <div>Loading...</div>;

  return (
    <main className="flex-1 p-8">
      <h1 className="text-2xl font-semibold mb-6">Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard
          finalCount={finalCount}
          isPrice={false}
          icon={
            <img src={Avathar} className="w-[32px] h-[32px] text-blue-500" />
          }
          subtitle="total number of students"
        />
        <StatCard
          finalCount={totalCourses}
          isPrice={false}
          icon={
            <img src={Avathar} className="w-[32px] h-[32px] text-green-500" />
          }
          subtitle="total number of courses"
        />
        <StatCard
          finalCount={totalPrice}
          isPrice={true}
          icon={
            <img src={Avathar} className="w-[32px] h-[32px] text-yellow-500" />
          }
          subtitle="total amount earned"
        />
        <StatCard
          isPrice={false}
          icon={
            <img src={Avathar} className="w-[32px] h-[32px] text-purple-500" />
          }
          finalCount="Guitar"
          subtitle="best performing course"
        />
        <StatCard
          isPrice={false}
          icon={
            <img src={Avathar} className="w-[32px] h-[32px] text-red-500" />
          }
          finalCount="Flute"
          subtitle="worst performing course"
        />
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">LATEST ENROLMENTS</h2>
          <a href="#" className="text-pink-500 hover:underline">
            View All Courses
          </a>
        </div>
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Enr. No</TableHead>
                  <TableHead>S. Name</TableHead>
                  <TableHead>C. Name</TableHead>
                  <TableHead>Fees</TableHead>
                  <TableHead>Enr.Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData?.enrollments?.map((data) => {
                  return (
                    <TableRow key={data?.enrollmentNumber}>
                      <TableCell>{data?.enrollmentNumber}</TableCell>
                      <TableCell>{data?.studentName}</TableCell>
                      <TableCell>{data?.courseName}</TableCell>
                      <TableCell>${data?.fees}</TableCell>
                      <TableCell>{data?.enrollmentDate}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">BEST STUDENTS</h2>
          <a href="#" className="text-pink-500 hover:underline">
            View All Students
          </a>
        </div>
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reg. No</TableHead>
                  <TableHead>F. Name</TableHead>
                  <TableHead>L. Name</TableHead>
                  <TableHead>Course#</TableHead>
                  <TableHead>Total Fees</TableHead>
                  <TableHead>Reg.Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData?.bestStudents?.map((data) => {
                  return (
                    <TableRow key={data?.registerNumber}>
                      <TableCell>{data?.registerNumber}</TableCell>
                      <TableCell>{data?.firstName}</TableCell>
                      <TableCell>{data?.lastName}</TableCell>
                      <TableCell>{data?.course}</TableCell>
                      <TableCell>${data?.totalFees}</TableCell>
                      <TableCell>{data?.registrationDate}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Home;
