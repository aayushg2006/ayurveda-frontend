import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  Download,
  Printer,
  Calendar,
  Users,
  TrendingUp,
  Activity,
  FileText,
  BarChart3,
  PieChart as PieChartIcon
} from "lucide-react";

export function ReportsAnalytics() {
  const [timeRange, setTimeRange] = useState("30");
  const [reportType, setReportType] = useState("overview");

  // Mock data for charts
  const patientGrowthData = [
    { month: 'Jan', patients: 45, consultations: 89 },
    { month: 'Feb', patients: 52, consultations: 102 },
    { month: 'Mar', patients: 61, consultations: 125 },
    { month: 'Apr', patients: 78, consultations: 156 },
    { month: 'May', patients: 89, consultations: 178 },
    { month: 'Jun', patients: 124, consultations: 248 }
  ];

  const doshaDistributionData = [
    { name: 'Vata', value: 42, color: '#22c55e' },
    { name: 'Pitta', value: 35, color: '#f97316' },
    { name: 'Kapha', value: 23, color: '#3b82f6' }
  ];

  const dietPlanEffectivenessData = [
    { plan: 'Weight Loss', success: 87, total: 100 },
    { plan: 'Digestion', success: 92, total: 100 },
    { plan: 'Diabetes', success: 78, total: 100 },
    { plan: 'Hypertension', success: 85, total: 100 },
    { plan: 'General Wellness', success: 94, total: 100 }
  ];



  const topHealthConditions = [
    { condition: 'Digestive Issues', count: 45, percentage: 36 },
    { condition: 'Weight Management', count: 38, percentage: 31 },
    { condition: 'Diabetes', count: 28, percentage: 23 },
    { condition: 'Hypertension', count: 22, percentage: 18 },
    { condition: 'Anxiety/Stress', count: 19, percentage: 15 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">Reports & Analytics</h2>
          <p className="text-muted-foreground">Track your practice performance and patient outcomes</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 3 months</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="patients" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Patients
          </TabsTrigger>
          <TabsTrigger value="outcomes" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Outcomes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Patients</p>
                    <p className="text-2xl">124</p>
                    <p className="text-sm text-green-600">+12% from last month</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Consultations</p>
                    <p className="text-2xl">248</p>
                    <p className="text-sm text-green-600">+18% from last month</p>
                  </div>
                  <Calendar className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                    <p className="text-2xl">87%</p>
                    <p className="text-sm text-green-600">+5% from last month</p>
                  </div>
                  <Activity className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Diet Plans</p>
                    <p className="text-2xl">89</p>
                    <p className="text-sm text-green-600">+8% from last month</p>
                  </div>
                  <FileText className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Patient Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Patient Growth & Consultations</CardTitle>
              <CardDescription>Monthly patient acquisition and consultation trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={patientGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="patients" fill="#8b5a3c" name="New Patients" />
                  <Bar dataKey="consultations" fill="#d2691e" name="Consultations" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patients" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Dosha Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Patient Constitution Distribution</CardTitle>
                <CardDescription>Breakdown of patient doshas in your practice</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={doshaDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {doshaDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Health Conditions */}
            <Card>
              <CardHeader>
                <CardTitle>Most Common Health Conditions</CardTitle>
                <CardDescription>Conditions treated in your practice</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topHealthConditions.map((condition, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">{condition.condition}</span>
                          <span className="text-sm text-muted-foreground">{condition.count} patients</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${condition.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Patient Demographics */}
          <Card>
            <CardHeader>
              <CardTitle>Patient Demographics</CardTitle>
              <CardDescription>Age and gender distribution of your patients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h4 className="text-sm text-muted-foreground mb-2">Age Groups</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>18-30</span>
                      <span>28%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>31-45</span>
                      <span>42%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>46-60</span>
                      <span>25%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>60+</span>
                      <span>5%</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <h4 className="text-sm text-muted-foreground mb-2">Gender</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Female</span>
                      <span>65%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Male</span>
                      <span>35%</span>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <h4 className="text-sm text-muted-foreground mb-2">New vs Returning</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>New Patients</span>
                      <span>35%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Returning</span>
                      <span>65%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outcomes" className="space-y-6">
          {/* Diet Plan Effectiveness */}
          <Card>
            <CardHeader>
              <CardTitle>Diet Plan Effectiveness</CardTitle>
              <CardDescription>Success rates of different treatment plans</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dietPlanEffectivenessData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="plan" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="success" fill="#22c55e" name="Success Rate %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Patient Satisfaction */}
            <Card>
              <CardHeader>
                <CardTitle>Patient Satisfaction</CardTitle>
                <CardDescription>Average ratings and feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl">4.8/5.0</div>
                    <p className="text-sm text-muted-foreground">Average Rating</p>
                  </div>
                  
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <span className="text-sm w-6">{rating}★</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-500 h-2 rounded-full" 
                            style={{ width: `${rating === 5 ? 75 : rating === 4 ? 20 : 5}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground w-8">
                          {rating === 5 ? '75%' : rating === 4 ? '20%' : '5%'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Treatment Outcomes */}
            <Card>
              <CardHeader>
                <CardTitle>Treatment Outcomes</CardTitle>
                <CardDescription>Patient improvement metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Symptom Improvement</span>
                    <span className="text-sm">89%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Weight Goals Achieved</span>
                    <span className="text-sm">76%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Digestive Health</span>
                    <span className="text-sm">92%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Energy Levels</span>
                    <span className="text-sm">84%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Sleep Quality</span>
                    <span className="text-sm">81%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>


      </Tabs>
    </div>
  );
}