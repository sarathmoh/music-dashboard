export interface Overview {
  totalStudents: number;
  totalCourses: number;
  totalAmount: number;
  bestCourse: string;
  worstCourse: string;
}

export interface Enrollment {
  id: string;
  enrollmentNumber: string;
  studentName: string;
  courseName: string;
  fees: number;
  enrollmentDate: string;
}

export interface BestStudent {
  id: string;
  registerNumber: string;
  firstName: string;
  lastName: string;
  course: string;
  totalFees: number;
  registrationDate: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  instructor: string;
  instrument: string;
  dayOfWeek: string;
  numberOfStudents: number;
  price: number;
  status: string;
}

export interface Data {
  overView?: Overview | undefined;
  enrollments?: Enrollment[] | undefined;
  bestStudents?: BestStudent[] | undefined;
  courses?: Course[] | undefined;
}
