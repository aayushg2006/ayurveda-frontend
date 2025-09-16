import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  Plus, 
  Search, 
  Edit, 
  Eye, 
  Calendar,
  Phone,
  Mail,
  User,
  Activity,
  FileText
} from "lucide-react";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  dosha: string;
  constitution: string;
  healthConditions: string[];
  lastVisit: string;
  status: "active" | "inactive" | "new";
  avatar: string;
}

export function PatientManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: "1",
      name: "Anjali Patel",
      age: 32,
      gender: "Female",
      email: "anjali@email.com",
      phone: "+91 98765 43210",
      dosha: "Pitta-Kapha",
      constitution: "Pitta dominant with Kapha secondary",
      healthConditions: ["Digestive issues", "Weight management"],
      lastVisit: "2024-01-10",
      status: "active",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=anjali"
    },
    {
      id: "2",
      name: "Rahul Sharma",
      age: 28,
      gender: "Male",
      email: "rahul@email.com",
      phone: "+91 87654 32109",
      dosha: "Vata-Pitta",
      constitution: "Vata dominant with Pitta influence",
      healthConditions: ["Anxiety", "Insomnia", "IBS"],
      lastVisit: "2024-01-08",
      status: "active",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahul"
    },
    {
      id: "3",
      name: "Meera Joshi",
      age: 45,
      gender: "Female",
      email: "meera@email.com",
      phone: "+91 76543 21098",
      dosha: "Kapha",
      constitution: "Pure Kapha constitution",
      healthConditions: ["Diabetes", "High cholesterol"],
      lastVisit: "2024-01-05",
      status: "active",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=meera"
    }
  ]);

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || patient.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">Patient Management</h2>
          <p className="text-muted-foreground">Manage your patients and their Ayurvedic profiles</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
              <DialogDescription>
                Create a comprehensive Ayurvedic profile for your new patient
              </DialogDescription>
            </DialogHeader>
            <NewPatientForm onAddPatient={(patient) => setPatients([...patients, patient])} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search patients by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedFilter} onValueChange={setSelectedFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Patients</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="new">New</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Patient List */}
      <div className="grid gap-4">
        {filteredPatients.map((patient) => (
          <Card key={patient.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={patient.avatar} />
                    <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg">{patient.name}</h3>
                      <Badge variant={patient.status === "active" ? "default" : "secondary"}>
                        {patient.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {patient.age}y, {patient.gender}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {patient.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {patient.phone}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm">Constitution: {patient.dosha}</p>
                    <p className="text-xs text-muted-foreground">Last visit: {patient.lastVisit}</p>
                  </div>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <PatientDetailsView patient={patient} />
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {patient.healthConditions.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Health conditions:</span>
                    <div className="flex gap-1 flex-wrap">
                      {patient.healthConditions.map((condition, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg mb-2">No patients found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function NewPatientForm({ onAddPatient }: { onAddPatient: (patient: Patient) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    dosha: "",
    constitution: "",
    healthConditions: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPatient: Patient = {
      id: Date.now().toString(),
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender,
      email: formData.email,
      phone: formData.phone,
      dosha: formData.dosha,
      constitution: formData.constitution,
      healthConditions: formData.healthConditions.split(',').map(c => c.trim()).filter(Boolean),
      lastVisit: new Date().toISOString().split('T')[0],
      status: "new",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`
    };
    onAddPatient(newPatient);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Full Name *</Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        <div>
          <Label>Age *</Label>
          <Input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({...formData, age: e.target.value})}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Gender *</Label>
          <Select onValueChange={(value) => setFormData({...formData, gender: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Constitution (Dosha) *</Label>
          <Select onValueChange={(value) => setFormData({...formData, dosha: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select dosha" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vata">Vata</SelectItem>
              <SelectItem value="pitta">Pitta</SelectItem>
              <SelectItem value="kapha">Kapha</SelectItem>
              <SelectItem value="vata-pitta">Vata-Pitta</SelectItem>
              <SelectItem value="pitta-kapha">Pitta-Kapha</SelectItem>
              <SelectItem value="vata-kapha">Vata-Kapha</SelectItem>
              <SelectItem value="tridoshic">Tridoshic</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Email *</Label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        <div>
          <Label>Phone *</Label>
          <Input
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            required
          />
        </div>
      </div>

      <div>
        <Label>Constitution Details</Label>
        <Textarea
          placeholder="Describe the patient's constitution and dominant traits..."
          value={formData.constitution}
          onChange={(e) => setFormData({...formData, constitution: e.target.value})}
        />
      </div>

      <div>
        <Label>Health Conditions</Label>
        <Input
          placeholder="Enter conditions separated by commas (e.g., diabetes, hypertension)"
          value={formData.healthConditions}
          onChange={(e) => setFormData({...formData, healthConditions: e.target.value})}
        />
      </div>

      <Button type="submit" className="w-full">Add Patient</Button>
    </form>
  );
}

function PatientDetailsView({ patient }: { patient: Patient }) {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={patient.avatar} />
            <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          {patient.name}
          <Badge variant={patient.status === "active" ? "default" : "secondary"}>
            {patient.status}
          </Badge>
        </DialogTitle>
        <DialogDescription>
          Complete patient profile and medical history
        </DialogDescription>
      </DialogHeader>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="constitution">Constitution</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Age:</span>
                  <p>{patient.age} years</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Gender:</span>
                  <p>{patient.gender}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Email:</span>
                  <p>{patient.email}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Phone:</span>
                  <p>{patient.phone}</p>
                </div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Health Conditions:</span>
                <div className="flex gap-1 flex-wrap mt-1">
                  {patient.healthConditions.map((condition, index) => (
                    <Badge key={index} variant="outline">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="constitution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Ayurvedic Constitution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-sm text-muted-foreground">Primary Dosha:</span>
                <p className="text-lg">{patient.dosha}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Constitution Description:</span>
                <p className="text-sm mt-1">{patient.constitution}</p>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2"></div>
                  <p className="text-sm">Vata</p>
                  <p className="text-xs text-muted-foreground">Balanced</p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="w-8 h-8 bg-orange-500 rounded-full mx-auto mb-2"></div>
                  <p className="text-sm">Pitta</p>
                  <p className="text-xs text-muted-foreground">Elevated</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-2"></div>
                  <p className="text-sm">Kapha</p>
                  <p className="text-xs text-muted-foreground">Normal</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Medical History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-sm">Initial Consultation</p>
                    <p className="text-xs text-muted-foreground">Comprehensive assessment and diet plan</p>
                  </div>
                  <span className="text-xs text-muted-foreground">Jan 10, 2024</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-sm">Follow-up Consultation</p>
                    <p className="text-xs text-muted-foreground">Progress review and plan adjustment</p>
                  </div>
                  <span className="text-xs text-muted-foreground">Dec 20, 2023</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}