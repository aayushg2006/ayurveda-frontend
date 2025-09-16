import { useState } from "react";
import { AuthPage } from "../auth/AuthPage";
import { DoctorDashboard } from "../doctor/DoctorDashboard";
import { PatientDashboard } from "../patient/PatientDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { User } from "../../App";
import { FileText, Download, Eye, Leaf } from "lucide-react";

// Mock users for documentation
const mockDoctorUser: User = {
  id: "doc1",
  name: "Dr. Priya Sharma",
  email: "priya.sharma@ayurnutri.com",
  role: "doctor",
  avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face"
};

const mockPatientUser: User = {
  id: "pat1", 
  name: "Anjali Patel",
  email: "anjali.patel@email.com",
  role: "patient",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
};

interface FrameDocumentationProps {
  onGeneratePDF?: () => void;
}

export function FrameDocumentation({ onGeneratePDF }: FrameDocumentationProps) {
  const [activeFrame, setActiveFrame] = useState("auth");
  const [mockUser, setMockUser] = useState<User | null>(null);

  const frames = [
    {
      id: "auth",
      name: "Authentication Page",
      description: "Login interface for both doctors and patients with role-based authentication",
      category: "Auth",
      component: <AuthPage onLogin={(user) => setMockUser(user)} />
    },
    {
      id: "doctor-dashboard",
      name: "Doctor Dashboard - Overview",
      description: "Main doctor interface with patient statistics and recent activity",
      category: "Doctor",
      component: <DoctorDashboard user={mockDoctorUser} onLogout={() => setMockUser(null)} />
    },
    {
      id: "patient-dashboard",
      name: "Patient Dashboard - Diet Plan",
      description: "Patient interface showing daily diet plan and progress tracking",
      category: "Patient", 
      component: <PatientDashboard user={mockPatientUser} onLogout={() => setMockUser(null)} />
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Leaf className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-semibold text-foreground">AyurNutri</h1>
              <Badge variant="secondary" className="ml-2">Application Documentation</Badge>
            </div>
            <p className="text-muted-foreground text-lg">
              Comprehensive visual documentation of all application frames and interfaces
            </p>
          </div>
          
          {onGeneratePDF && (
            <Button onClick={onGeneratePDF} className="gap-2">
              <Download className="w-4 h-4" />
              Generate PDF
            </Button>
          )}
        </div>

        {/* Frame Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-semibold">{frames.length}</p>
                  <p className="text-sm text-muted-foreground">Total Frames</p>
                </div>
                <FileText className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-semibold">2</p>
                  <p className="text-sm text-muted-foreground">User Roles</p>
                </div>
                <Eye className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-semibold">100%</p>
                  <p className="text-sm text-muted-foreground">Coverage</p>
                </div>
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-sm">✓</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Frame Navigation */}
      <div className="max-w-7xl mx-auto">
        <Tabs value={activeFrame} onValueChange={setActiveFrame}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            {frames.map((frame) => (
              <TabsTrigger key={frame.id} value={frame.id} className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {frame.category}
                </Badge>
                {frame.name.split(' - ')[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {frames.map((frame) => (
            <TabsContent key={frame.id} value={frame.id}>
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {frame.name}
                        <Badge variant="secondary">{frame.category}</Badge>
                      </CardTitle>
                      <p className="text-muted-foreground mt-1">{frame.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden bg-white">
                    <div className="transform origin-top-left" style={{ 
                      transform: 'scale(0.8)',
                      width: '125%',
                      height: '600px',
                      overflow: 'hidden'
                    }}>
                      {frame.component}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Additional Frame Details */}
      <div className="max-w-7xl mx-auto mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Frame Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {frames.map((frame) => (
                <div key={frame.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{frame.category}</Badge>
                    <h4 className="font-medium">{frame.name}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{frame.description}</p>
                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground">
                      <strong>Resolution:</strong> Responsive (Mobile & Desktop)
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <strong>Theme:</strong> Ayurvedic Earth Tones
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <strong>Framework:</strong> React + Tailwind CSS v4
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Application Features Summary */}
      <div className="max-w-7xl mx-auto mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Application Features Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium mb-3 text-primary">Doctor Features</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Patient Management & Registration
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Personalized Diet Chart Creation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    8,000+ Foods Database with Ayurvedic Classifications
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Progress Reports & Analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Dosha-based Recommendations
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-3 text-green-600">Patient Features</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    Daily Diet Plan Tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    Progress Monitoring & Metrics
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    Direct Communication with Doctor
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    Constitutional Profile & Guidance
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    Meal Reminders & Wellness Tips
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Create a standalone page for frame documentation
export function DocumentationPage() {
  return <FrameDocumentation />;
}