import { useState } from "react";
import { User } from "../../App";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { PatientManagement } from "./PatientManagement";
import { DietChartCreator } from "./DietChartCreator";
import { FoodDatabase } from "./FoodDatabase";
import { ReportsAnalytics } from "./ReportsAnalytics";
import { 
  Users, 
  ChefHat, 
  Database, 
  BarChart3, 
  LogOut, 
  Calendar,
  Activity,
  Leaf,
  TrendingUp
} from "lucide-react";

interface DoctorDashboardProps {
  user: User;
  onLogout: () => void;
}

export function DoctorDashboard({ user, onLogout }: DoctorDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-6 h-6 text-primary" />
              <span className="text-lg">AyurNutri</span>
            </div>
            <Badge variant="secondary">Doctor Portal</Badge>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm">{user.name}</p>
              <p className="text-xs text-muted-foreground">Ayurvedic Dietitian</p>
            </div>
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="patients" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Patients
            </TabsTrigger>
            <TabsTrigger value="diet-charts" className="flex items-center gap-2">
              <ChefHat className="w-4 h-4" />
              Diet Charts
            </TabsTrigger>
            <TabsTrigger value="food-database" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Food Database
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="patients" className="mt-6">
            <PatientManagement />
          </TabsContent>

          <TabsContent value="diet-charts" className="mt-6">
            <DietChartCreator />
          </TabsContent>

          <TabsContent value="food-database" className="mt-6">
            <FoodDatabase />
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <ReportsAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function DashboardOverview() {
  const stats = [
    { title: "Active Patients", value: "124", change: "+12%", icon: Users, color: "text-blue-600" },
    { title: "Diet Charts Created", value: "89", change: "+8%", icon: ChefHat, color: "text-green-600" }
  ];

  const recentActivity = [
    { patient: "Anjali Patel", action: "Diet chart updated", time: "2 hours ago", dosha: "Pitta-Kapha" },
    { patient: "Rahul Sharma", action: "New consultation", time: "4 hours ago", dosha: "Vata-Pitta" },
    { patient: "Meera Joshi", action: "Progress report", time: "6 hours ago", dosha: "Kapha" },
    { patient: "Arjun Singh", action: "Diet plan created", time: "1 day ago", dosha: "Vata" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-6">Dashboard Overview</h2>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest patient interactions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-sm">{activity.patient}</p>
                      <p className="text-xs text-muted-foreground">{activity.action}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-1">
                        {activity.dosha}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dosha Distribution</CardTitle>
              <CardDescription>Patient constitution overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Vata Dominant</span>
                  </div>
                  <span className="text-sm">42%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Pitta Dominant</span>
                  </div>
                  <span className="text-sm">35%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Kapha Dominant</span>
                  </div>
                  <span className="text-sm">23%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}