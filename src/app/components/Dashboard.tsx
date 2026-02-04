import { Calendar, Users, UserCheck, FileText, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";

interface DashboardProps {
  stats: {
    totalPatients: number;
    todayAppointments: number;
    totalDoctors: number;
    pendingRecords: number;
  };
  recentAppointments: Array<{
    id: string;
    patientName: string;
    doctorName: string;
    time: string;
    status: string;
  }>;
}

export function Dashboard({ stats, recentAppointments }: DashboardProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome to your clinic management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPatients}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayAppointments}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <Clock className="inline h-3 w-3 mr-1" />
              3 pending confirmations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Doctors</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDoctors}</div>
            <p className="text-xs text-muted-foreground mt-1">
              All available today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Records</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingRecords}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting review
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="space-y-1">
                  <p className="font-medium">{appointment.patientName}</p>
                  <p className="text-sm text-muted-foreground">
                    Dr. {appointment.doctorName}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm font-medium">{appointment.time}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      appointment.status === "Confirmed"
                        ? "bg-green-100 text-green-800"
                        : appointment.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
