export interface Branch {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  subjects: string[];
}

export interface Note {
  id: string;
  title: string;
  branchId: string;
  subject: string;
  semester: string;
  file_url: string;
  uploaded_by_admin: boolean;
  created_at: string;
  likes: number;
}

export const branches: Branch[] = [
  {
    id: "comp",
    name: "Computer Engineering",
    description: "Data Structures, Algorithms, OS, and Software Engineering",
    imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGNvZGUlMjBzY3JlZW58ZW58MXx8fHwxNzc3NDczNzEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    subjects: ["DSA", "DBMS", "OS", "Computer Networks", "Software Engineering"]
  },
  {
    id: "it",
    name: "Information Technology",
    description: "Web Development, Database Management, and Networking",
    imageUrl: "https://images.unsplash.com/photo-1614508569207-3295ac89d75f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjByb29tJTIwZGF0YSUyMGNlbnRlcnxlbnwxfHx8fDE3Nzc0NzM3MTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    subjects: ["Web Technologies", "Cloud Computing", "Information Security", "AI"]
  },
  {
    id: "mech",
    name: "Mechanical Engineering",
    description: "Thermodynamics, Fluid Mechanics, and Machine Design",
    imageUrl: "https://images.unsplash.com/photo-1774977865287-888d3b7493f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwZW5naW5lZXJpbmclMjBtYWNoaW5lcnklMjBnZWFyc3xlbnwxfHx8fDE3Nzc0NzM3MTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    subjects: ["Thermodynamics", "Fluid Mechanics", "Kinematics", "Manufacturing Processes"]
  },
  {
    id: "civil",
    name: "Civil Engineering",
    description: "Structural Engineering, Concrete Tech, and Surveying",
    imageUrl: "https://images.unsplash.com/photo-1758574697284-8e84046a45ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXZpbCUyMGVuZ2luZWVyaW5nJTIwYmx1ZXByaW50JTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc3NzQ3MzcxM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    subjects: ["Structural Analysis", "Surveying", "Geotechnical Engineering", "Fluid Mechanics"]
  },
  {
    id: "elec",
    name: "Electrical Engineering",
    description: "Circuits, Power Systems, and Control Systems",
    imageUrl: "https://images.unsplash.com/photo-1776107483985-bba05642244f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwZW5naW5lZXJpbmclMjBjaXJjdWl0JTIwYm9hcmR8ZW58MXx8fHwxNzc3NDczNzEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    subjects: ["Network Analysis", "Electrical Machines", "Power Systems", "Control Systems"]
  }
];

export const mockNotes: Note[] = [
  {
    id: "1",
    title: "Complete DSA Cheatsheet",
    branchId: "comp",
    subject: "DSA",
    semester: "Semester 3",
    file_url: "#",
    uploaded_by_admin: true,
    created_at: "2024-04-12T10:00:00Z",
    likes: 120
  },
  {
    id: "2",
    title: "Operating Systems Chapter 1-3",
    branchId: "comp",
    subject: "OS",
    semester: "Semester 4",
    file_url: "#",
    uploaded_by_admin: true,
    created_at: "2024-03-25T14:30:00Z",
    likes: 85
  },
  {
    id: "3",
    title: "Thermodynamics Basics",
    branchId: "mech",
    subject: "Thermodynamics",
    semester: "Semester 3",
    file_url: "#",
     uploaded_by_admin: true,
    created_at: "2024-04-01T09:15:00Z",
    likes: 42
  },
  {
    id: "4",
    title: "Web Tech Lab Manual",
    branchId: "it",
    subject: "Web Technologies",
    semester: "Semester 5",
    file_url: "#",
     uploaded_by_admin: true,
    created_at: "2024-02-18T11:45:00Z",
    likes: 96
  },
  {
    id: "5",
    title: "Fluid Mechanics Formula Sheet",
    branchId: "civil",
    subject: "Fluid Mechanics",
    semester: "Semester 4",
    file_url: "#",
     uploaded_by_admin: true,
    created_at: "2024-04-20T16:20:00Z",
    likes: 56
  }
];

export const semesters = [
  "Semester 1", "Semester 2", "Semester 3", "Semester 4", 
  "Semester 5", "Semester 6", "Semester 7", "Semester 8"
];
