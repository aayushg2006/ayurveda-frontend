import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Calendar } from "../ui/calendar";
import { AppointmentScheduling } from "../patient/AppointmentScheduling";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Search, 
  Filter,
  CheckCircle,
  AlertCircle,
  Video,
  Phone,
  MapPin,
  User,
  FileText,
  MoreHorizontal
} from "lucide-react";

interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  type: string;
  mode: "in-person" | "video" | "phone";
  status: "confirmed" | "pending" | "completed" | "cancelled";
  duration: number;
  reason?: string;
  notes?: string;
}

interface AppointmentManagementProps {
  userRole: "doctor" | "patient";
  doctorName?: string;
  patientName?: string;
}

export function AppointmentManagement({ userRole, doctorName, patientName }: AppointmentManagementProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock appointment data
  const appointments: Appointment[] = [
    {
      id: "1",
      patientName: "Anjali Patel",
      doctorName: "Dr. Priya Sharma",
      date: "2024-01-15",
      time: "14:00",
      type: "Follow-up Consultation",
      mode: "video",
      status: "confirmed",
      duration: 30,
      reason: "Progress review and diet adjustments"
    },
    {
      id: "2",
      patientName: "Rahul Singh",
      doctorName: "Dr. Priya Sharma",
      date: "2024-01-15",
      time: "16:00",
      type: "Initial Consultation",
      mode: "in-person",
      status: "confirmed",
      duration: 60,
      reason: "Digestive issues and constitution assessment"
    },
    {
      id: "3",
      patientName: "Meera Joshi",
      doctorName: "Dr. Priya Sharma",
      date: "2024-01-16",
      time: "10:00",
      type: "Diet Review",
      mode: "phone",
      status: "pending",
      duration: 30,
      reason: "Review current diet plan effectiveness"
    },
    {
      id: "4",
      patientName: "Anjali Patel",
      doctorName: "Dr. Priya Sharma",
      date: "2023-12-20",
      time: "10:00",
      type: "Initial Consultation",
      mode: "in-person",
      status: "completed",
      duration: 60,
      reason: "Constitutional assessment and treatment plan"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800 border-green-200";
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "completed": return "bg-blue-100 text-blue-800 border-blue-200";
      case "cancelled": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case "video": return <Video className="w-4 h-4" />;
      case "phone": return <Phone className="w-4 h-4" />;
      case "in-person": return <MapPin className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesStatus = statusFilter === "all" || apt.status === statusFilter;
    const matchesSearch = searchQuery === "" || 
      apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const upcomingAppointments = filteredAppointments.filter(apt => 
    new Date(apt.date) >= new Date() && apt.status !== "completed"
  );

  const todaysAppointments = filteredAppointments.filter(apt => 
    apt.date === new Date().toISOString().split('T')[0]
  );

  const renderAppointmentCard = (appointment: Appointment) => (
    <Card key={appointment.id} className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {getModeIcon(appointment.mode)}
            <div>
              <h4 className="font-medium text-sm">
                {userRole === "doctor" ? appointment.patientName : appointment.type}
              </h4>
              <p className="text-xs text-muted-foreground">
                {userRole === "doctor" ? appointment.type : `with ${appointment.doctorName}`}
              </p>
            </div>
          </div>
          
          <Badge variant="outline" className={getStatusColor(appointment.status)}>
            {appointment.status}
          </Badge>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium">
              {new Date(appointment.date).toLocaleDateString()}
            </p>
            <p className="text-xs text-muted-foreground">
              {appointment.time} • {appointment.duration} min
            </p>
          </div>
          
          {userRole === "doctor" && (
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
      
      {appointment.reason && (
        <p className="text-xs text-muted-foreground mt-2 pl-6">
          {appointment.reason}
        </p>
      )}
    </Card>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              {userRole === "doctor" ? "Appointment Management" : "My Appointments"}
            </CardTitle>
            <CardDescription>
              {userRole === "doctor" 
                ? "Manage patient appointments and schedules" 
                : "View and schedule your consultations"
              }
            </CardDescription>
          </div>
          
          {userRole === "patient" && doctorName && (
            <AppointmentScheduling 
              doctorName={doctorName}
              trigger={
                <Button size="sm">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
              }
            />
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "list" | "calendar")}>
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search appointments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-48"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <TabsContent value="list" className="space-y-4">
            {/* Today's Appointments */}
            {todaysAppointments.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Today's Appointments
                </h4>
                <div className="space-y-3">
                  {todaysAppointments.map(renderAppointmentCard)}
                </div>
              </div>
            )}
            
            {/* Upcoming Appointments */}
            <div>
              <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Upcoming Appointments
              </h4>
              <div className="space-y-3">
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.map(renderAppointmentCard)
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <CalendarIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No upcoming appointments</p>
                    {userRole === "patient" && (
                      <p className="text-xs mt-1">Schedule a new consultation with your doctor</p>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Recent/Past Appointments */}
            {userRole === "patient" && (
              <div>
                <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  Recent Appointments
                </h4>
                <div className="space-y-3">
                  {appointments
                    .filter(apt => apt.status === "completed")
                    .slice(0, 3)
                    .map(renderAppointmentCard)
                  }
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="calendar">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>
              
              <div>
                <h4 className="font-medium mb-3">
                  {selectedDate ? `Appointments on ${selectedDate.toLocaleDateString()}` : "Select a date"}
                </h4>
                <div className="space-y-3">
                  {selectedDate && appointments
                    .filter(apt => apt.date === selectedDate.toISOString().split('T')[0])
                    .map(renderAppointmentCard)
                  }
                  {selectedDate && !appointments.some(apt => apt.date === selectedDate.toISOString().split('T')[0]) && (
                    <div className="text-center py-6 text-muted-foreground">
                      <CalendarIcon className="w-6 h-6 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No appointments on this date</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}