import { useState } from "react";
import { Calendar, Plus, Clock, User, Stethoscope, Edit, Trash2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/app/components/ui/dialog";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";

export interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  doctorName: string;
  doctorId: string;
  date: string;
  time: string;
  type: string;
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
  notes: string;
}

interface AppointmentsProps {
  appointments: Appointment[];
  patients: Array<{ id: string; name: string }>;
  doctors: Array<{ id: string; name: string }>;
  onAddAppointment: (appointment: Omit<Appointment, "id">) => void;
  onEditAppointment: (id: string, appointment: Partial<Appointment>) => void;
  onDeleteAppointment: (id: string) => void;
}

export function Appointments({
  appointments,
  patients,
  doctors,
  onAddAppointment,
  onEditAppointment,
  onDeleteAppointment,
}: AppointmentsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [formData, setFormData] = useState<Omit<Appointment, "id">>({
    patientName: "",
    patientId: "",
    doctorName: "",
    doctorId: "",
    date: new Date().toISOString().split("T")[0],
    time: "09:00",
    type: "Consultation",
    status: "Pending",
    notes: "",
  });

  const filteredAppointments = appointments.filter(
    (apt) => apt.date === selectedDate
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const patient = patients.find((p) => p.id === formData.patientId);
    const doctor = doctors.find((d) => d.id === formData.doctorId);
    
    if (patient && doctor) {
      const appointmentData = {
        ...formData,
        patientName: patient.name,
        doctorName: doctor.name,
      };
      
      if (editingAppointment) {
        onEditAppointment(editingAppointment.id, appointmentData);
      } else {
        onAddAppointment(appointmentData);
      }
      setIsDialogOpen(false);
      setEditingAppointment(null);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      patientName: "",
      patientId: "",
      doctorName: "",
      doctorId: "",
      date: new Date().toISOString().split("T")[0],
      time: "09:00",
      type: "Consultation",
      status: "Pending",
      notes: "",
    });
  };

  const openEditDialog = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setFormData({
      patientName: appointment.patientName,
      patientId: appointment.patientId,
      doctorName: appointment.doctorName,
      doctorId: appointment.doctorId,
      date: appointment.date,
      time: appointment.time,
      type: appointment.type,
      status: appointment.status,
      notes: appointment.notes,
    });
    setIsDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "Completed":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Appointments</h1>
          <p className="text-muted-foreground mt-2">Schedule and manage appointments</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingAppointment(null); resetForm(); }}>
              <Plus className="mr-2 h-4 w-4" />
              Book Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingAppointment ? "Edit Appointment" : "Book New Appointment"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patient">Patient</Label>
                  <select
                    id="patient"
                    value={formData.patientId}
                    onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    required
                  >
                    <option value="">Select patient</option>
                    {patients.map((patient) => (
                      <option key={patient.id} value={patient.id}>
                        {patient.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctor">Doctor</Label>
                  <select
                    id="doctor"
                    value={formData.doctorId}
                    onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    required
                  >
                    <option value="">Select doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        Dr. {doctor.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Appointment Type</Label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    required
                  >
                    <option value="Consultation">Consultation</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Check-up">Check-up</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Appointment["status"] })}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full min-h-[80px] px-3 py-2 rounded-md border border-input bg-background"
                  placeholder="Additional notes..."
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingAppointment ? "Update" : "Book"} Appointment
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Date Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Select Date
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="max-w-xs"
          />
        </CardContent>
      </Card>

      {/* Appointments List */}
      <div className="grid gap-4">
        {filteredAppointments.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No appointments scheduled for this date
            </CardContent>
          </Card>
        ) : (
          filteredAppointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {appointment.type}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{appointment.patientName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Stethoscope className="h-4 w-4 text-muted-foreground" />
                        <span>Dr. {appointment.doctorName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                    {appointment.notes && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {appointment.notes}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openEditDialog(appointment)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDeleteAppointment(appointment.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
