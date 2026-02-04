import { useState } from "react";
import { FileText, Plus, Eye, Download, Search } from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

export interface MedicalRecord {
  id: string;
  patientName: string;
  patientId: string;
  doctorName: string;
  date: string;
  diagnosis: string;
  prescription: string;
  notes: string;
  tests: string;
  followUpDate: string;
}

interface MedicalRecordsProps {
  records: MedicalRecord[];
  patients: Array<{ id: string; name: string }>;
  doctors: Array<{ id: string; name: string }>;
  onAddRecord: (record: Omit<MedicalRecord, "id">) => void;
}

export function MedicalRecords({
  records,
  patients,
  doctors,
  onAddRecord,
}: MedicalRecordsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewingRecord, setViewingRecord] = useState<MedicalRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState<Omit<MedicalRecord, "id">>({
    patientName: "",
    patientId: "",
    doctorName: "",
    date: new Date().toISOString().split("T")[0],
    diagnosis: "",
    prescription: "",
    notes: "",
    tests: "",
    followUpDate: "",
  });

  const filteredRecords = records.filter(
    (record) =>
      record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const patient = patients.find((p) => p.id === formData.patientId);
    const doctor = doctors.find((d) => d.id === formData.patientId);
    
    if (patient) {
      const recordData = {
        ...formData,
        patientName: patient.name,
      };
      onAddRecord(recordData);
      setIsDialogOpen(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      patientName: "",
      patientId: "",
      doctorName: "",
      date: new Date().toISOString().split("T")[0],
      diagnosis: "",
      prescription: "",
      notes: "",
      tests: "",
      followUpDate: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Medical Records</h1>
          <p className="text-muted-foreground mt-2">View and manage patient medical records</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Record
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Medical Record</DialogTitle>
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
                  <Label htmlFor="doctorName">Doctor Name</Label>
                  <Input
                    id="doctorName"
                    value={formData.doctorName}
                    onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                    placeholder="Dr. Name"
                    required
                  />
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
                  <Label htmlFor="followUpDate">Follow-up Date</Label>
                  <Input
                    id="followUpDate"
                    type="date"
                    value={formData.followUpDate}
                    onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="diagnosis">Diagnosis</Label>
                <Input
                  id="diagnosis"
                  value={formData.diagnosis}
                  onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                  placeholder="Patient diagnosis"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prescription">Prescription</Label>
                <textarea
                  id="prescription"
                  value={formData.prescription}
                  onChange={(e) => setFormData({ ...formData, prescription: e.target.value })}
                  className="w-full min-h-[80px] px-3 py-2 rounded-md border border-input bg-background"
                  placeholder="Prescribed medications and dosage..."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tests">Tests/Lab Work</Label>
                <textarea
                  id="tests"
                  value={formData.tests}
                  onChange={(e) => setFormData({ ...formData, tests: e.target.value })}
                  className="w-full min-h-[60px] px-3 py-2 rounded-md border border-input bg-background"
                  placeholder="Recommended tests or lab work..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full min-h-[80px] px-3 py-2 rounded-md border border-input bg-background"
                  placeholder="Any additional notes..."
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Record</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by patient name, diagnosis, or doctor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Follow-up</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.date}</TableCell>
                  <TableCell className="font-medium">{record.patientName}</TableCell>
                  <TableCell>Dr. {record.doctorName}</TableCell>
                  <TableCell>{record.diagnosis}</TableCell>
                  <TableCell>
                    {record.followUpDate ? (
                      <Badge variant="outline">{record.followUpDate}</Badge>
                    ) : (
                      <span className="text-muted-foreground text-sm">None</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setViewingRecord(record)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Record Dialog */}
      <Dialog open={!!viewingRecord} onOpenChange={() => setViewingRecord(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Medical Record Details</DialogTitle>
          </DialogHeader>
          {viewingRecord && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Patient Name</Label>
                  <p className="mt-1 font-medium">{viewingRecord.patientName}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Doctor</Label>
                  <p className="mt-1 font-medium">Dr. {viewingRecord.doctorName}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Date</Label>
                  <p className="mt-1">{viewingRecord.date}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Follow-up Date</Label>
                  <p className="mt-1">{viewingRecord.followUpDate || "None"}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-muted-foreground">Diagnosis</Label>
                <p className="mt-1">{viewingRecord.diagnosis}</p>
              </div>

              <div>
                <Label className="text-muted-foreground">Prescription</Label>
                <p className="mt-1 whitespace-pre-wrap">{viewingRecord.prescription}</p>
              </div>

              {viewingRecord.tests && (
                <div>
                  <Label className="text-muted-foreground">Tests/Lab Work</Label>
                  <p className="mt-1 whitespace-pre-wrap">{viewingRecord.tests}</p>
                </div>
              )}

              {viewingRecord.notes && (
                <div>
                  <Label className="text-muted-foreground">Additional Notes</Label>
                  <p className="mt-1 whitespace-pre-wrap">{viewingRecord.notes}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewingRecord(null)}>
              Close
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Download Record
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
