import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  UserCheck,
  FileText,
  Menu,
  X,
} from "lucide-react";
import { Dashboard } from "@/app/components/Dashboard";
import { Patients, Patient } from "@/app/components/Patients";
import { Appointments, Appointment } from "@/app/components/Appointments";
import { Doctors, Doctor } from "@/app/components/Doctors";
import { MedicalRecords, MedicalRecord } from "@/app/components/MedicalRecords";
import { Button } from "@/app/components/ui/button";

type View = "dashboard" | "patients" | "appointments" | "doctors" | "records";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Mock Data
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      age: 34,
      gender: "Female",
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@email.com",
      bloodGroup: "O+",
      address: "123 Main St, New York, NY 10001",
      lastVisit: "2026-01-28",
    },
    {
      id: "2",
      name: "Michael Chen",
      age: 45,
      gender: "Male",
      phone: "+1 (555) 234-5678",
      email: "michael.chen@email.com",
      bloodGroup: "A+",
      address: "456 Oak Ave, Brooklyn, NY 11201",
      lastVisit: "2026-01-30",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      age: 28,
      gender: "Female",
      phone: "+1 (555) 345-6789",
      email: "emily.rodriguez@email.com",
      bloodGroup: "B+",
      address: "789 Pine Rd, Queens, NY 11354",
      lastVisit: "2026-02-01",
    },
    {
      id: "4",
      name: "James Wilson",
      age: 52,
      gender: "Male",
      phone: "+1 (555) 456-7890",
      email: "james.wilson@email.com",
      bloodGroup: "AB+",
      address: "321 Elm St, Manhattan, NY 10002",
      lastVisit: "2026-01-25",
    },
  ]);

  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      id: "1",
      name: "Amanda Peterson",
      specialization: "Cardiologist",
      qualification: "MBBS, MD (Cardiology)",
      experience: 15,
      phone: "+1 (555) 111-2222",
      email: "dr.peterson@clinic.com",
      availability: "Mon-Fri, 9AM-5PM",
      consultationFee: 150,
    },
    {
      id: "2",
      name: "Robert Kumar",
      specialization: "General Physician",
      qualification: "MBBS, MD",
      experience: 10,
      phone: "+1 (555) 222-3333",
      email: "dr.kumar@clinic.com",
      availability: "Mon-Sat, 8AM-6PM",
      consultationFee: 100,
    },
    {
      id: "3",
      name: "Lisa Thompson",
      specialization: "Pediatrician",
      qualification: "MBBS, MD (Pediatrics)",
      experience: 12,
      phone: "+1 (555) 333-4444",
      email: "dr.thompson@clinic.com",
      availability: "Mon-Fri, 10AM-4PM",
      consultationFee: 120,
    },
  ]);

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      patientName: "Sarah Johnson",
      patientId: "1",
      doctorName: "Amanda Peterson",
      doctorId: "1",
      date: "2026-02-02",
      time: "10:00",
      type: "Follow-up",
      status: "Confirmed",
      notes: "Regular checkup for blood pressure monitoring",
    },
    {
      id: "2",
      patientName: "Michael Chen",
      patientId: "2",
      doctorName: "Robert Kumar",
      doctorId: "2",
      date: "2026-02-02",
      time: "11:30",
      type: "Consultation",
      status: "Pending",
      notes: "Complaint of persistent headaches",
    },
    {
      id: "3",
      patientName: "Emily Rodriguez",
      patientId: "3",
      doctorName: "Lisa Thompson",
      doctorId: "3",
      date: "2026-02-02",
      time: "14:00",
      type: "Check-up",
      status: "Confirmed",
      notes: "Annual health screening",
    },
    {
      id: "4",
      patientName: "James Wilson",
      patientId: "4",
      doctorName: "Amanda Peterson",
      doctorId: "1",
      date: "2026-02-03",
      time: "09:00",
      type: "Follow-up",
      status: "Confirmed",
      notes: "Post-surgery follow-up",
    },
  ]);

  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([
    {
      id: "1",
      patientName: "Sarah Johnson",
      patientId: "1",
      doctorName: "Amanda Peterson",
      date: "2026-01-28",
      diagnosis: "Hypertension - Stage 1",
      prescription:
        "Lisinopril 10mg - Once daily in the morning\nAmlodipine 5mg - Once daily",
      notes: "Patient advised to reduce salt intake and exercise regularly. Schedule follow-up in 2 weeks.",
      tests: "Blood Pressure Monitoring, ECG",
      followUpDate: "2026-02-11",
    },
    {
      id: "2",
      patientName: "Michael Chen",
      patientId: "2",
      doctorName: "Robert Kumar",
      date: "2026-01-30",
      diagnosis: "Migraine",
      prescription:
        "Sumatriptan 50mg - As needed for migraine attacks\nPropranolol 40mg - Twice daily for prevention",
      notes: "Patient reports stress-related triggers. Recommended stress management techniques.",
      tests: "CT Scan scheduled",
      followUpDate: "2026-02-13",
    },
    {
      id: "3",
      patientName: "Emily Rodriguez",
      patientId: "3",
      doctorName: "Lisa Thompson",
      date: "2026-02-01",
      diagnosis: "Seasonal Allergies",
      prescription: "Cetirizine 10mg - Once daily\nFluticasone nasal spray - Twice daily",
      notes: "Symptoms worsen during spring. Patient advised to avoid outdoor activities during high pollen counts.",
      tests: "Allergy Panel",
      followUpDate: "",
    },
  ]);

  // Handlers
  const handleAddPatient = (patient: Omit<Patient, "id">) => {
    const newPatient = { ...patient, id: Date.now().toString() };
    setPatients([...patients, newPatient]);
  };

  const handleEditPatient = (id: string, updatedPatient: Partial<Patient>) => {
    setPatients(
      patients.map((p) => (p.id === id ? { ...p, ...updatedPatient } : p))
    );
  };

  const handleDeletePatient = (id: string) => {
    setPatients(patients.filter((p) => p.id !== id));
  };

  const handleAddDoctor = (doctor: Omit<Doctor, "id">) => {
    const newDoctor = { ...doctor, id: Date.now().toString() };
    setDoctors([...doctors, newDoctor]);
  };

  const handleEditDoctor = (id: string, updatedDoctor: Partial<Doctor>) => {
    setDoctors(
      doctors.map((d) => (d.id === id ? { ...d, ...updatedDoctor } : d))
    );
  };

  const handleDeleteDoctor = (id: string) => {
    setDoctors(doctors.filter((d) => d.id !== id));
  };

  const handleAddAppointment = (appointment: Omit<Appointment, "id">) => {
    const newAppointment = { ...appointment, id: Date.now().toString() };
    setAppointments([...appointments, newAppointment]);
  };

  const handleEditAppointment = (
    id: string,
    updatedAppointment: Partial<Appointment>
  ) => {
    setAppointments(
      appointments.map((a) =>
        a.id === id ? { ...a, ...updatedAppointment } : a
      )
    );
  };

  const handleDeleteAppointment = (id: string) => {
    setAppointments(appointments.filter((a) => a.id !== id));
  };

  const handleAddMedicalRecord = (record: Omit<MedicalRecord, "id">) => {
    const newRecord = { ...record, id: Date.now().toString() };
    setMedicalRecords([...medicalRecords, newRecord]);
  };

  // Navigation items
  const navItems = [
    { id: "dashboard" as View, label: "Dashboard", icon: LayoutDashboard },
    { id: "patients" as View, label: "Patients", icon: Users },
    { id: "appointments" as View, label: "Appointments", icon: Calendar },
    { id: "doctors" as View, label: "Doctors", icon: UserCheck },
    { id: "records" as View, label: "Medical Records", icon: FileText },
  ];

  // Stats for dashboard
  const stats = {
    totalPatients: patients.length,
    todayAppointments: appointments.filter(
      (a) => a.date === new Date().toISOString().split("T")[0]
    ).length,
    totalDoctors: doctors.length,
    pendingRecords: medicalRecords.filter((r) => !r.followUpDate).length,
  };

  const recentAppointments = appointments
    .filter((a) => a.date === new Date().toISOString().split("T")[0])
    .slice(0, 5)
    .map((a) => ({
      id: a.id,
      patientName: a.patientName,
      doctorName: a.doctorName,
      time: a.time,
      status: a.status,
    }));

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } bg-white border-r border-gray-200 transition-all duration-300 overflow-hidden flex flex-col`}
      >
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-blue-600">
            Clinic Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Healthcare System</p>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentView(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      currentView === item.id
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
          <div className="flex-1">
            <h2 className="text-lg font-medium">
              {navItems.find((item) => item.id === currentView)?.label}
            </h2>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {currentView === "dashboard" && (
            <Dashboard stats={stats} recentAppointments={recentAppointments} />
          )}
          {currentView === "patients" && (
            <Patients
              patients={patients}
              onAddPatient={handleAddPatient}
              onEditPatient={handleEditPatient}
              onDeletePatient={handleDeletePatient}
            />
          )}
          {currentView === "appointments" && (
            <Appointments
              appointments={appointments}
              patients={patients}
              doctors={doctors}
              onAddAppointment={handleAddAppointment}
              onEditAppointment={handleEditAppointment}
              onDeleteAppointment={handleDeleteAppointment}
            />
          )}
          {currentView === "doctors" && (
            <Doctors
              doctors={doctors}
              onAddDoctor={handleAddDoctor}
              onEditDoctor={handleEditDoctor}
              onDeleteDoctor={handleDeleteDoctor}
            />
          )}
          {currentView === "records" && (
            <MedicalRecords
              records={medicalRecords}
              patients={patients}
              doctors={doctors}
              onAddRecord={handleAddMedicalRecord}
            />
          )}
        </main>
      </div>
    </div>
  );
}
