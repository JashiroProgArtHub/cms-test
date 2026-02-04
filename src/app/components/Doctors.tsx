import { useState } from "react";
import { Plus, Edit, Trash2, Phone, Mail, Award, Clock } from "lucide-react";
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

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  qualification: string;
  experience: number;
  phone: string;
  email: string;
  availability: string;
  consultationFee: number;
}

interface DoctorsProps {
  doctors: Doctor[];
  onAddDoctor: (doctor: Omit<Doctor, "id">) => void;
  onEditDoctor: (id: string, doctor: Partial<Doctor>) => void;
  onDeleteDoctor: (id: string) => void;
}

export function Doctors({
  doctors,
  onAddDoctor,
  onEditDoctor,
  onDeleteDoctor,
}: DoctorsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [formData, setFormData] = useState<Omit<Doctor, "id">>({
    name: "",
    specialization: "",
    qualification: "",
    experience: 0,
    phone: "",
    email: "",
    availability: "Mon-Fri, 9AM-5PM",
    consultationFee: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDoctor) {
      onEditDoctor(editingDoctor.id, formData);
    } else {
      onAddDoctor(formData);
    }
    setIsDialogOpen(false);
    setEditingDoctor(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      specialization: "",
      qualification: "",
      experience: 0,
      phone: "",
      email: "",
      availability: "Mon-Fri, 9AM-5PM",
      consultationFee: 0,
    });
  };

  const openEditDialog = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      specialization: doctor.specialization,
      qualification: doctor.qualification,
      experience: doctor.experience,
      phone: doctor.phone,
      email: doctor.email,
      availability: doctor.availability,
      consultationFee: doctor.consultationFee,
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Doctors</h1>
          <p className="text-muted-foreground mt-2">Manage doctor profiles and schedules</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingDoctor(null); resetForm(); }}>
              <Plus className="mr-2 h-4 w-4" />
              Add Doctor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingDoctor ? "Edit Doctor" : "Add New Doctor"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input
                    id="specialization"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    placeholder="e.g., Cardiologist"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qualification">Qualification</Label>
                  <Input
                    id="qualification"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    placeholder="e.g., MBBS, MD"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience (years)</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Input
                    id="availability"
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    placeholder="e.g., Mon-Fri, 9AM-5PM"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="consultationFee">Consultation Fee ($)</Label>
                  <Input
                    id="consultationFee"
                    type="number"
                    value={formData.consultationFee}
                    onChange={(e) => setFormData({ ...formData, consultationFee: parseFloat(e.target.value) })}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingDoctor ? "Update" : "Add"} Doctor
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Dr. {doctor.name}</CardTitle>
                  <Badge className="mt-2">{doctor.specialization}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => openEditDialog(doctor)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDeleteDoctor(doctor.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span>{doctor.qualification}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{doctor.experience} years experience</span>
                </div>
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{doctor.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{doctor.email}</span>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="text-sm">
                  <span className="text-muted-foreground">Available: </span>
                  <span>{doctor.availability}</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Consultation: </span>
                  <span className="font-medium">${doctor.consultationFee}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
