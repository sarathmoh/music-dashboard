import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { nanoid } from "nanoid";
import * as yup from "yup";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusIcon, MoreVertical, Search } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Data, Course } from "@/interfaces";

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

interface CourseForm {
  id: string;
  name: string;
  description: string;
  instructor: string;
  instrument: string;
  dayOfWeek: string;
  price: number;
  status: "active" | "inactive" | "archived";
  numberOfStudents: number;
}

const schema = yup.object().shape({
  name: yup.string().required("Course name is required"),
  description: yup.string().required("Description is required"),
  instructor: yup.string().required("Instructor name is required"),
  instrument: yup.string().required("Instrument is required"),
  dayOfWeek: yup.string().required("Day of the week is required"),
  price: yup
    .number()
    .positive("Price must be positive")
    .required("Price is required"),
});

export default function CourseManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState<Data | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<Course[] | undefined>(
    []
  );
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const defaultValues = {
    name: "",
    description: "",
    instructor: "",
    instrument: "",
    dayOfWeek: "",
    price: 0,
    status: "active",
    numberOfStudents: 0,
  };

  useEffect(() => {
    const item = localStorage.getItem("tableData");
    const extracted = JSON.parse(item);
    setResult(extracted);
  }, []);

  useEffect(() => {
    const filteredCourses = result?.courses?.filter((course) => {
      const searchTermLower = searchTerm.toLowerCase();

      return (
        course.name.toLowerCase().includes(searchTermLower) ||
        course.description.toLowerCase().includes(searchTermLower) ||
        course.instructor.toLowerCase().includes(searchTermLower) ||
        course.instrument.toLowerCase().includes(searchTermLower) ||
        course.dayOfWeek.toLowerCase().includes(searchTermLower) ||
        course.status.toLowerCase().includes(searchTermLower) ||
        (course.price && course.price.toString().includes(searchTerm)) ||
        (course.numberOfStudents &&
          course.numberOfStudents.toString().includes(searchTerm))
      );
    });

    setFilteredCourses(filteredCourses);
  }, [debouncedSearchTerm, result?.courses]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const onCancel = () => {
    reset(defaultValues);
    clearErrors();
    setIsDialogOpen(false);
  };

  const onSubmit = (data: CourseForm) => {
    if (isEdit) {
      const updatedCourses = result?.courses?.map((course) =>
        course.id === currentCourseId ? { ...course, ...data } : course
      );

      const newResult = { ...result, courses: updatedCourses };
      localStorage.setItem("tableData", JSON.stringify(newResult));
      setResult(newResult);
      setIsEdit(false);
      setCurrentCourseId("");
    } else {
      const id = nanoid();
      const newCourseList = {
        ...result,
        courses: [...result?.courses, { id: id, ...data }],
      };
      localStorage.setItem("tableData", JSON.stringify(newCourseList));
      setResult(newCourseList);
      newCourseList;
    }
    onCancel();
  };

  const onDialougeOpen = () => {
    reset();
    clearErrors();
    setIsDialogOpen(true);
  };

  const handleEditCourse = (id: string) => {
    setIsEdit(true);
    setCurrentCourseId(id);
    const course = result?.courses?.filter((item) => {
      return item.id === id;
    });

    const courseDetails = course[0];
    onDialougeOpen();
    reset({
      name: courseDetails?.name,
      description: courseDetails?.description,
      instructor: courseDetails?.instructor,
      instrument: courseDetails?.instrument,
      dayOfWeek: courseDetails?.dayOfWeek,
      price: courseDetails?.price,
      numberOfStudents: courseDetails?.numberOfStudents,
    });
  };

  const handleCloseCourse = (id: string) => {
    const courses = result?.courses;
    const updatedCourse = courses?.map((item) => {
      if (item?.id !== id) {
        return item;
      } else {
        return {
          ...item,
          status: "closed",
        };
      }
    });
    const finalResult = { ...result, courses: updatedCourse };
    localStorage.setItem("tableData", JSON.stringify(finalResult));
    setResult(finalResult);
  };

  const handleArchiveCourse = (id: number) => {
    const courses = result?.courses;
    const updatedCourse = courses?.map((item) => {
      if (item?.id !== id) {
        return item;
      } else {
        return {
          ...item,
          status: "archived",
        };
      }
    });
    const finalResult = { ...result, courses: updatedCourse };
    localStorage.setItem("tableData", JSON.stringify(finalResult));
    setResult(finalResult);
  };

  const handleUnArchiveCourse = (id: number) => {
    const courses = result?.courses;
    const updatedCourse = courses?.map((item) => {
      if (item?.id !== id) {
        return item;
      } else {
        return {
          ...item,
          status: "active",
        };
      }
    });
    const finalResult = { ...result, courses: updatedCourse };
    localStorage.setItem("tableData", JSON.stringify(finalResult));
    setResult(finalResult);
  };

  return (
    <div className="container mx-auto p-4 relative min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      <div className="mb-4 flex justify-end">
        <div className="flex justify-center items-center  bg-white min-w-[300px] px-2">
          <Search color="#83858B" />
          <Input
            type="search"
            placeholder="Search courses..."
            className="max-w-sm bg-white rounded-none border-none select:border-none focus:border-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Description</TableHead>
              <TableHead className="font-semibold">Instructor</TableHead>
              <TableHead className="font-semibold">Instrument</TableHead>
              <TableHead className="font-semibold">Day of Week</TableHead>
              <TableHead className="font-semibold"># of Students</TableHead>
              <TableHead className="font-semibold">Price</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCourses?.map((course, index) => (
              <TableRow key={index}>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.description}</TableCell>
                <TableCell>{course.instructor}</TableCell>
                <TableCell>{course.instrument}</TableCell>
                <TableCell>{course.dayOfWeek}</TableCell>
                <TableCell>{course.numberOfStudents}</TableCell>
                <TableCell>${course.price}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 text-xs font-semibold ${
                      course.status === "active"
                        ? "bg-green-100 text-green-800"
                        : course.status === "closed"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {course.status}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        disabled={course.status === "closed" ? true : false}
                        variant="ghost"
                        className="h-8 w-8 p-0"
                      >
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    {course.status !== "archived" ? (
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleEditCourse(course.id)}
                        >
                          Edit Course
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleCloseCourse(course.id)}
                        >
                          Close Course
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleArchiveCourse(course.id)}
                        >
                          Archive Course
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    ) : (
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleUnArchiveCourse(course.id)}
                        >
                          Unarchive Course
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    )}
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={onDialougeOpen}>
        <DialogTrigger asChild>
          <Button className="fixed bottom-6 right-6  w-40 h-14 shadow-lg bg-[#FEC0CA] text-black hover:bg-[#db909d]">
            <PlusIcon className="h-6 w-6 mr-1" />
            Add Course
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            {isEdit ? (
              <DialogTitle>Update Course</DialogTitle>
            ) : (
              <DialogTitle>Add Course</DialogTitle>
            )}
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <div>
                  <Input {...field} placeholder="Course Name" />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <div>
                  <Input {...field} placeholder="Description" />
                  {errors.description && (
                    <p className="text-red-500 text-sm">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="instructor"
              control={control}
              render={({ field }) => (
                <div>
                  <Input {...field} placeholder="Instructor" />
                  {errors.instructor && (
                    <p className="text-red-500 text-sm">
                      {errors.instructor.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="instrument"
              control={control}
              render={({ field }) => (
                <div>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Instrument" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Guitar">Guitar</SelectItem>
                      <SelectItem value="Piano">Piano</SelectItem>
                      <SelectItem value="Violin">Violin</SelectItem>
                      <SelectItem value="Percussion">Percussion</SelectItem>
                      <SelectItem value="Flute">Flute</SelectItem>
                      <SelectItem value="Drums">Drums</SelectItem>
                      <SelectItem value="Bass Guitar">Bass Guitar</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.instrument && (
                    <p className="text-red-500 text-sm">
                      {errors.instrument.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="dayOfWeek"
              control={control}
              render={({ field }) => (
                <div>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Day of the week" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Monday">Monday</SelectItem>
                      <SelectItem value="Tuesday">Tuesday</SelectItem>
                      <SelectItem value="Wednesday">Wednesday</SelectItem>
                      <SelectItem value="Thursday">Thursday</SelectItem>
                      <SelectItem value="Friday">Friday</SelectItem>
                      <SelectItem value="Saturday">Saturday</SelectItem>
                      <SelectItem value="Sunday">Sunday</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.dayOfWeek && (
                    <p className="text-red-500 text-sm">
                      {errors.dayOfWeek.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <div>
                  <Input {...field} type="number" placeholder="Price" />
                  {errors.price && (
                    <p className="text-red-500 text-sm">
                      {errors.price.message}
                    </p>
                  )}
                </div>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={onCancel} type="button">
                Cancel
              </Button>
              {isEdit ? (
                <Button
                  type="submit"
                  className="bg-[#FEC0CA] text-black hover:bg-[#FEC0CA]"
                >
                  Update Course
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-[#FEC0CA] text-black hover:bg-[#FEC0CA]"
                >
                  Add Course
                </Button>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
