import { useState } from "react";
import { User } from "../../App";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { 
  User as UserIcon,
  Calendar,
  TrendingUp,
  Apple,
  Droplets,
  Moon,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  LogOut,
  Leaf,
  Coffee,
  Utensils,
  ChefHat,
  Heart,
  Scale,
  Thermometer
} from "lucide-react";

interface PatientDashboardProps {
  user: User;
  onLogout: () => void;
}

interface DietEntry {
  id: string;
  mealType: string;
  foods: string[];
  time: string;
  completed: boolean;
  notes?: string;
}

interface ProgressEntry {
  date: string;
  weight?: number;
  energy: number;
  digestion: number;
  sleep: number;
  waterIntake: number;
  bowelMovement: string;
  symptoms: string[];
}

export function PatientDashboard({ user, onLogout }: PatientDashboardProps) {
  const [activeTab, setActiveTab] = useState("diet-plan");
  
  // Mock patient data
  const patientProfile = {
    dosha: "Pitta-Kapha",
    constitution: "Pitta dominant with Kapha secondary",
    doctor: "Dr. Priya Sharma",
    nextAppointment: "2024-01-15",
    currentWeight: 68,
    targetWeight: 62,
    healthGoals: ["Weight management", "Better digestion", "Improved energy"]
  };

  const todaysDietPlan: DietEntry[] = [
    {
      id: "1",
      mealType: "Breakfast",
      foods: ["Warm water with lemon", "Oatmeal with almonds", "Herbal tea"],
      time: "7:00 AM",
      completed: true
    },
    {
      id: "2", 
      mealType: "Mid Morning",
      foods: ["Fresh fruit (apple/pear)", "Herbal tea"],
      time: "10:00 AM",
      completed: true
    },
    {
      id: "3",
      mealType: "Lunch",
      foods: ["Basmati rice", "Mung dal", "Steamed vegetables", "Ghee"],
      time: "12:30 PM",
      completed: false
    },
    {
      id: "4",
      mealType: "Afternoon",
      foods: ["Herbal tea", "Few soaked almonds"],
      time: "4:00 PM", 
      completed: false
    },
    {
      id: "5",
      mealType: "Dinner",
      foods: ["Vegetable soup", "Quinoa", "Steamed broccoli"],
      time: "7:00 PM",
      completed: false
    }
  ];

  const weeklyProgress: ProgressEntry[] = [
    {
      date: "2024-01-08",
      weight: 68.2,
      energy: 7,
      digestion: 8,
      sleep: 6,
      waterIntake: 2.5,
      bowelMovement: "normal",
      symptoms: []
    },
    {
      date: "2024-01-09", 
      weight: 68.0,
      energy: 8,
      digestion: 7,
      sleep: 7,
      waterIntake: 3.0,
      bowelMovement: "normal",
      symptoms: ["mild headache"]
    }
  ];

  const mealIcons = {
    "Breakfast": Coffee,
    "Mid Morning": Apple,
    "Lunch": Utensils,
    "Afternoon": Coffee,
    "Dinner": ChefHat
  };

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
            <Badge variant="secondary">Patient Portal</Badge>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm">{user.name}</p>
              <p className="text-xs text-muted-foreground">{patientProfile.dosha} Constitution</p>
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="diet-plan" className="flex items-center gap-2">
              <ChefHat className="w-4 h-4" />
              Diet Plan
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="diet-plan" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Today's Diet Plan */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Today's Diet Plan
                    </CardTitle>
                    <CardDescription>
                      Monday, January 8, 2024 - Follow your personalized Ayurvedic meal plan
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {todaysDietPlan.map((meal, index) => {
                        const MealIcon = mealIcons[meal.mealType as keyof typeof mealIcons];
                        return (
                          <Card key={meal.id} className={`p-4 ${meal.completed ? 'bg-green-50 border-green-200' : ''}`}>
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <MealIcon className="w-5 h-5 text-primary" />
                                <div>
                                  <h4 className="text-sm">{meal.mealType}</h4>
                                  <p className="text-xs text-muted-foreground">{meal.time}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {meal.completed ? (
                                  <Badge variant="default" className="bg-green-500">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Completed
                                  </Badge>
                                ) : (
                                  <Badge variant="outline">
                                    <Clock className="w-3 h-3 mr-1" />
                                    Pending
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <div className="mb-3">
                              <h5 className="text-xs text-muted-foreground mb-1">Foods:</h5>
                              <div className="flex flex-wrap gap-1">
                                {meal.foods.map((food, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {food}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {!meal.completed && (
                              <div className="flex gap-2">
                                <Button size="sm" className="text-xs">
                                  Mark as Completed
                                </Button>
                                <Button variant="outline" size="sm" className="text-xs">
                                  Add Notes
                                </Button>
                              </div>
                            )}
                          </Card>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Daily Summary & Reminders */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Daily Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Meals Completed</span>
                        <span>2/5</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Water Intake</span>
                        <span>1.5/3L</span>
                      </div>
                      <Progress value={50} className="h-2" />
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="text-sm mb-2">Today's Reminders</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs">
                          <Droplets className="w-3 h-3 text-blue-500" />
                          <span>Drink warm water before meals</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Moon className="w-3 h-3 text-purple-500" />
                          <span>Early dinner by 7 PM</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Heart className="w-3 h-3 text-red-500" />
                          <span>15 min walk after lunch</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Constitution Guide</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-muted-foreground">Your Constitution:</span>
                        <p className="text-sm">{patientProfile.constitution}</p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 bg-orange-50 rounded-lg">
                          <div className="w-4 h-4 bg-orange-500 rounded-full mx-auto mb-1"></div>
                          <p className="text-xs">Pitta</p>
                          <p className="text-xs text-orange-600">Dominant</p>
                        </div>
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto mb-1"></div>
                          <p className="text-xs">Kapha</p>
                          <p className="text-xs text-blue-600">Secondary</p>
                        </div>
                        <div className="p-2 bg-green-50 rounded-lg">
                          <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-1"></div>
                          <p className="text-xs">Vata</p>
                          <p className="text-xs text-green-600">Balanced</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Progress Tracking Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Daily Progress Entry</CardTitle>
                  <CardDescription>Track your daily wellness metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProgressTrackingForm />
                </CardContent>
              </Card>

              {/* Progress Charts */}
              <Card>
                <CardHeader>
                  <CardTitle>Progress Overview</CardTitle>
                  <CardDescription>Your wellness journey over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Current Weight</span>
                        <span className="text-sm">{patientProfile.currentWeight} kg</span>
                      </div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-muted-foreground">Target: {patientProfile.targetWeight} kg</span>
                        <span className="text-xs text-muted-foreground">Goal: -{patientProfile.currentWeight - patientProfile.targetWeight} kg</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <Activity className="w-6 h-6 text-green-500 mx-auto mb-1" />
                        <p className="text-lg">7.5/10</p>
                        <p className="text-xs text-muted-foreground">Avg Energy</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <Heart className="w-6 h-6 text-red-500 mx-auto mb-1" />
                        <p className="text-lg">7.5/10</p>
                        <p className="text-xs text-muted-foreground">Avg Digestion</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm mb-2">Recent Achievements</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>7 days of consistent meal timing</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>Improved sleep quality</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>Reduced digestive issues</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>



          <TabsContent value="profile" className="mt-6">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your profile and health information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name</Label>
                      <Input value={user.name} readOnly />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input value={user.email} readOnly />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Constitution</Label>
                      <Input value={patientProfile.dosha} readOnly />
                    </div>
                    <div>
                      <Label>Assigned Doctor</Label>
                      <Input value={patientProfile.doctor} readOnly />
                    </div>
                  </div>

                  <div>
                    <Label>Health Goals</Label>
                    <div className="flex gap-1 flex-wrap mt-1">
                      {patientProfile.healthGoals.map((goal, index) => (
                        <Badge key={index} variant="secondary">
                          {goal}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Label>Constitution Details</Label>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="w-6 h-6 bg-orange-500 rounded-full mx-auto mb-2"></div>
                        <p className="text-sm font-medium">Pitta</p>
                        <p className="text-xs text-orange-600">Dominant</p>
                        <p className="text-xs text-muted-foreground mt-1">Fire & Water</p>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="w-6 h-6 bg-blue-500 rounded-full mx-auto mb-2"></div>
                        <p className="text-sm font-medium">Kapha</p>
                        <p className="text-xs text-blue-600">Secondary</p>
                        <p className="text-xs text-muted-foreground mt-1">Earth & Water</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="w-6 h-6 bg-green-500 rounded-full mx-auto mb-2"></div>
                        <p className="text-sm font-medium">Vata</p>
                        <p className="text-xs text-green-600">Balanced</p>
                        <p className="text-xs text-muted-foreground mt-1">Air & Space</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ProgressTrackingForm() {
  const [formData, setFormData] = useState({
    weight: "",
    energy: "5",
    digestion: "5", 
    sleep: "5",
    waterIntake: "",
    bowelMovement: "",
    symptoms: "",
    notes: ""
  });

  return (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Weight (kg)</Label>
          <Input
            type="number"
            placeholder="68.0"
            value={formData.weight}
            onChange={(e) => setFormData({...formData, weight: e.target.value})}
          />
        </div>
        <div>
          <Label>Water Intake (L)</Label>
          <Input
            type="number"
            placeholder="2.5"
            value={formData.waterIntake}
            onChange={(e) => setFormData({...formData, waterIntake: e.target.value})}
          />
        </div>
      </div>

      <div>
        <Label>Energy Level (1-10)</Label>
        <Select value={formData.energy} onValueChange={(value) => setFormData({...formData, energy: value})}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[1,2,3,4,5,6,7,8,9,10].map(n => (
              <SelectItem key={n} value={n.toString()}>{n} - {n <= 3 ? 'Low' : n <= 7 ? 'Moderate' : 'High'}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Digestion Quality (1-10)</Label>
        <Select value={formData.digestion} onValueChange={(value) => setFormData({...formData, digestion: value})}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[1,2,3,4,5,6,7,8,9,10].map(n => (
              <SelectItem key={n} value={n.toString()}>{n} - {n <= 3 ? 'Poor' : n <= 7 ? 'Good' : 'Excellent'}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Sleep Quality (1-10)</Label>
        <Select value={formData.sleep} onValueChange={(value) => setFormData({...formData, sleep: value})}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[1,2,3,4,5,6,7,8,9,10].map(n => (
              <SelectItem key={n} value={n.toString()}>{n} - {n <= 3 ? 'Poor' : n <= 7 ? 'Good' : 'Excellent'}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Bowel Movement</Label>
        <Select value={formData.bowelMovement} onValueChange={(value) => setFormData({...formData, bowelMovement: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="constipated">Constipated</SelectItem>
            <SelectItem value="loose">Loose</SelectItem>
            <SelectItem value="irregular">Irregular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Symptoms/Notes</Label>
        <Textarea
          placeholder="Any symptoms, observations, or notes..."
          value={formData.notes}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
        />
      </div>

      <Button type="submit" className="w-full">Save Today's Progress</Button>
    </form>
  );
}