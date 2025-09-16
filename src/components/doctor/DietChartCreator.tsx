import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { toast } from "sonner@2.0.3";
import { 
  Plus, 
  Minus, 
  Clock, 
  User, 
  ChefHat, 
  Download,
  Printer,
  Sparkles,
  Apple,
  Coffee,
  Utensils,
  Moon,
  FileText,
  Loader2
} from "lucide-react";

interface DietPlan {
  patientId: string;
  patientName: string;
  date: string;
  meals: {
    breakfast: MealItem[];
    midMorning: MealItem[];
    lunch: MealItem[];
    afternoon: MealItem[];
    dinner: MealItem[];
    bedtime: MealItem[];
  };
  guidelines: string[];
  restrictions: string[];
  totalCalories: number;
  doshaBalance: {
    vata: number;
    pitta: number;
    kapha: number;
  };
}

interface MealItem {
  id: string;
  name: string;
  quantity: string;
  calories: number;
  rasa: string[];
  virya: "hot" | "cold";
  dosha: {
    vata: "increase" | "decrease" | "neutral";
    pitta: "increase" | "decrease" | "neutral";
    kapha: "increase" | "decrease" | "neutral";
  };
  notes?: string;
}

export function DietChartCreator() {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [currentMeal, setCurrentMeal] = useState<keyof DietPlan["meals"]>("breakfast");
  const [dietPlan, setDietPlan] = useState<DietPlan>({
    patientId: "",
    patientName: "",
    date: new Date().toISOString().split('T')[0],
    meals: {
      breakfast: [],
      midMorning: [],
      lunch: [],
      afternoon: [],
      dinner: [],
      bedtime: []
    },
    guidelines: [],
    restrictions: [],
    totalCalories: 0,
    doshaBalance: { vata: 0, pitta: 0, kapha: 0 }
  });

  // Mock patient data
  const patients = [
    { id: "1", name: "Anjali Patel", dosha: "Pitta-Kapha", age: 32 },
    { id: "2", name: "Rahul Sharma", dosha: "Vata-Pitta", age: 28 },
    { id: "3", name: "Meera Joshi", dosha: "Kapha", age: 45 }
  ];

  // Mock suggested foods based on patient dosha
  const suggestedFoods: MealItem[] = [
    {
      id: "1",
      name: "Basmati Rice",
      quantity: "1 cup cooked",
      calories: 130,
      rasa: ["Sweet"],
      virya: "cold",
      dosha: { vata: "decrease", pitta: "decrease", kapha: "increase" }
    },
    {
      id: "2", 
      name: "Mung Dal",
      quantity: "1/2 cup cooked",
      calories: 105,
      rasa: ["Sweet", "Astringent"],
      virya: "cold",
      dosha: { vata: "neutral", pitta: "decrease", kapha: "decrease" }
    },
    {
      id: "3",
      name: "Steamed Vegetables",
      quantity: "1 cup mixed",
      calories: 45,
      rasa: ["Sweet", "Bitter"],
      virya: "cold",
      dosha: { vata: "neutral", pitta: "decrease", kapha: "decrease" }
    },
    {
      id: "4",
      name: "Ghee",
      quantity: "1 tsp",
      calories: 45,
      rasa: ["Sweet"],
      virya: "cold",
      dosha: { vata: "decrease", pitta: "decrease", kapha: "increase" }
    }
  ];

  const mealTimes = [
    { key: "breakfast", label: "Breakfast", icon: Coffee, time: "7:00 AM" },
    { key: "midMorning", label: "Mid Morning", icon: Apple, time: "10:00 AM" },
    { key: "lunch", label: "Lunch", icon: Utensils, time: "12:30 PM" },
    { key: "afternoon", label: "Afternoon", icon: Coffee, time: "4:00 PM" },
    { key: "dinner", label: "Dinner", icon: ChefHat, time: "7:00 PM" },
    { key: "bedtime", label: "Bedtime", icon: Moon, time: "9:00 PM" }
  ];

  const addFoodToMeal = (food: MealItem) => {
    setDietPlan(prev => ({
      ...prev,
      meals: {
        ...prev.meals,
        [currentMeal]: [...prev.meals[currentMeal], { ...food, id: `${food.id}-${Date.now()}` }]
      }
    }));
  };

  const removeFoodFromMeal = (mealType: keyof DietPlan["meals"], foodId: string) => {
    setDietPlan(prev => ({
      ...prev,
      meals: {
        ...prev.meals,
        [mealType]: prev.meals[mealType].filter(item => item.id !== foodId)
      }
    }));
  };

  const generateAIRecommendations = () => {
    // Mock AI recommendations based on patient dosha
    const patient = patients.find(p => p.id === selectedPatient);
    if (!patient) return;

    const recommendations = {
      "Pitta-Kapha": [
        "Focus on cooling and light foods",
        "Avoid spicy and oily foods",
        "Include bitter and astringent tastes",
        "Prefer cooked vegetables over raw"
      ],
      "Vata-Pitta": [
        "Balance with warm, moist foods",
        "Avoid dry and cold foods",
        "Include sweet and sour tastes",
        "Regular meal times are essential"
      ],
      "Kapha": [
        "Light, warm, and spicy foods",
        "Avoid heavy and oily foods",
        "Include pungent and bitter tastes",
        "Largest meal should be at noon"
      ]
    };

    setDietPlan(prev => ({
      ...prev,
      guidelines: recommendations[patient.dosha as keyof typeof recommendations] || []
    }));

    toast.success("AI recommendations generated!");
  };

  const handlePrint = () => {
    console.log("Print button clicked, selectedPatient:", selectedPatient);
    const patient = patients.find(p => p.id === selectedPatient);
    if (!patient || !selectedPatient) {
      toast.error("Please select a patient first");
      return;
    }

    try {
      // Create printable content
      const printContent = createPrintableContent();
      
      // Create a new window for printing
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        toast.error("Please allow popups to print the diet chart");
        return;
      }

      printWindow.document.write(printContent);
      printWindow.document.close();
      
      // Wait for content to load then print
      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
      };

      toast.success("Diet chart sent to printer!");
    } catch (error) {
      console.error("Print error:", error);
      toast.error("Failed to print. Please try again.");
    }
  };

  const handleExportPDF = async () => {
    console.log("Export PDF button clicked, selectedPatient:", selectedPatient);
    const patient = patients.find(p => p.id === selectedPatient);
    if (!patient || !selectedPatient) {
      toast.error("Please select a patient first");
      return;
    }

    try {
      toast.success("Starting PDF export...");
      
      // Import jsPDF dynamically
      const { default: jsPDF } = await import('jspdf@2.5.2');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Add header
      pdf.setFontSize(24);
      pdf.setTextColor(139, 90, 60);
      pdf.text('AyurNutri Diet Chart', 20, 25);

      // Add patient info
      pdf.setFontSize(14);
      pdf.setTextColor(45, 43, 38);
      pdf.text(`Patient: ${patient.name}`, 20, 40);
      pdf.text(`Constitution: ${patient.dosha}`, 20, 50);
      pdf.text(`Date: ${new Date(dietPlan.date).toLocaleDateString()}`, 20, 60);

      let yPosition = 80;

      // Add meals
      const mealOrder = ['breakfast', 'midMorning', 'lunch', 'afternoon', 'dinner', 'bedtime'];
      const mealLabels = ['Breakfast', 'Mid Morning', 'Lunch', 'Afternoon', 'Dinner', 'Bedtime'];
      const mealTimings = ['7:00 AM', '10:00 AM', '12:30 PM', '4:00 PM', '7:00 PM', '9:00 PM'];

      mealOrder.forEach((mealKey, index) => {
        const meal = dietPlan.meals[mealKey as keyof DietPlan["meals"]];
        if (meal.length > 0) {
          // Meal header
          pdf.setFontSize(16);
          pdf.setTextColor(139, 90, 60);
          pdf.text(`${mealLabels[index]} (${mealTimings[index]})`, 20, yPosition);
          yPosition += 10;

          // Meal items
          pdf.setFontSize(11);
          pdf.setTextColor(45, 43, 38);
          meal.forEach((item) => {
            if (yPosition > 260) {
              pdf.addPage();
              yPosition = 20;
            }
            pdf.text(`• ${item.name} - ${item.quantity} (${item.calories} kcal)`, 25, yPosition);
            yPosition += 6;
          });
          yPosition += 5;
        }
      });

      // Add guidelines
      if (dietPlan.guidelines.length > 0) {
        if (yPosition > 220) {
          pdf.addPage();
          yPosition = 20;
        }
        
        pdf.setFontSize(16);
        pdf.setTextColor(139, 90, 60);
        pdf.text('Dietary Guidelines', 20, yPosition);
        yPosition += 10;

        pdf.setFontSize(11);
        pdf.setTextColor(45, 43, 38);
        dietPlan.guidelines.forEach((guideline) => {
          if (yPosition > 260) {
            pdf.addPage();
            yPosition = 20;
          }
          pdf.text(`• ${guideline}`, 25, yPosition);
          yPosition += 6;
        });
      }

      // Add total calories
      const totalCalories = Object.values(dietPlan.meals)
        .flat()
        .reduce((sum, item) => sum + item.calories, 0);

      pdf.setFontSize(14);
      pdf.setTextColor(139, 90, 60);
      pdf.text(`Total Daily Calories: ${totalCalories} kcal`, 20, yPosition + 10);

      // Save PDF
      const fileName = `${patient.name.replace(/\s+/g, '_')}_Diet_Chart_${dietPlan.date}.pdf`;
      pdf.save(fileName);

      toast.success("Diet chart exported successfully!");
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast.error("Failed to export PDF. Please try again.");
    }
  };

  const createPrintableContent = () => {
    const patient = patients.find(p => p.id === selectedPatient);
    const totalCalories = Object.values(dietPlan.meals)
      .flat()
      .reduce((sum, item) => sum + item.calories, 0);

    const mealOrder = ['breakfast', 'midMorning', 'lunch', 'afternoon', 'dinner', 'bedtime'];
    const mealLabels = ['Breakfast', 'Mid Morning', 'Lunch', 'Afternoon', 'Dinner', 'Bedtime'];
    const mealTimings = ['7:00 AM', '10:00 AM', '12:30 PM', '4:00 PM', '7:00 PM', '9:00 PM'];

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>AyurNutri Diet Chart - ${patient?.name}</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              line-height: 1.6;
              color: #2d2b26;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 3px solid #8b5a3c;
              padding-bottom: 20px;
            }
            .logo {
              color: #8b5a3c;
              font-size: 32px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .patient-info {
              background: #f4f1ed;
              padding: 15px;
              border-radius: 8px;
              margin-bottom: 25px;
            }
            .meal-section {
              margin-bottom: 25px;
              border: 1px solid #e0d5c7;
              border-radius: 8px;
              overflow: hidden;
            }
            .meal-header {
              background: #8b5a3c;
              color: white;
              padding: 12px 15px;
              font-weight: bold;
              display: flex;
              justify-content: between;
            }
            .meal-time {
              font-size: 0.9em;
              opacity: 0.9;
            }
            .meal-items {
              padding: 15px;
            }
            .meal-item {
              margin-bottom: 8px;
              padding: 8px;
              background: #faf9f7;
              border-radius: 4px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .guidelines {
              background: #e8f5e8;
              padding: 15px;
              border-radius: 8px;
              border-left: 4px solid #8b5a3c;
            }
            .total-calories {
              text-align: center;
              font-size: 18px;
              font-weight: bold;
              color: #8b5a3c;
              margin-top: 20px;
              padding: 15px;
              background: #f4f1ed;
              border-radius: 8px;
            }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">🌿 AyurNutri</div>
            <h1>Personalized Diet Chart</h1>
          </div>

          <div class="patient-info">
            <h3>Patient Information</h3>
            <p><strong>Name:</strong> ${patient?.name}</p>
            <p><strong>Constitution:</strong> ${patient?.dosha}</p>
            <p><strong>Age:</strong> ${patient?.age} years</p>
            <p><strong>Chart Date:</strong> ${new Date(dietPlan.date).toLocaleDateString()}</p>
          </div>

          ${mealOrder.map((mealKey, index) => {
            const meal = dietPlan.meals[mealKey as keyof DietPlan["meals"]];
            if (meal.length === 0) return '';
            
            return `
              <div class="meal-section">
                <div class="meal-header">
                  <span>${mealLabels[index]}</span>
                  <span class="meal-time">${mealTimings[index]}</span>
                </div>
                <div class="meal-items">
                  ${meal.map(item => `
                    <div class="meal-item">
                      <div>
                        <strong>${item.name}</strong><br>
                        <small>${item.quantity}</small>
                      </div>
                      <div style="text-align: right;">
                        <strong>${item.calories} kcal</strong><br>
                        <small>${item.rasa.join(', ')}</small>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
          }).join('')}

          ${dietPlan.guidelines.length > 0 ? `
            <div class="guidelines">
              <h3>🌿 Dietary Guidelines</h3>
              <ul>
                ${dietPlan.guidelines.map(guideline => `<li>${guideline}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          <div class="total-calories">
            Total Daily Calories: ${totalCalories} kcal
          </div>

          <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #6b5b4d;">
            Generated by AyurNutri • ${new Date().toLocaleDateString()}
          </div>
        </body>
      </html>
    `;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">Diet Chart Creator</h2>
          <p className="text-muted-foreground">Create personalized Ayurvedic meal plans for your patients</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={generateAIRecommendations}
            disabled={!selectedPatient}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            AI Suggestions
          </Button>
          <Button 
            variant="outline" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("Print button clicked!");
              handlePrint();
            }}
            className="cursor-pointer hover:bg-muted"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print
            {!selectedPatient && <span className="ml-1 text-xs">(Select patient)</span>}
          </Button>
          <Button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("Export PDF button clicked!");
              handleExportPDF();
            }}
            className="cursor-pointer"
          >
            <Download className="w-4 h-4 mr-2" />
            Export PDF
            {!selectedPatient && <span className="ml-1 text-xs">(Select patient)</span>}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Selection & Plan Overview */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Patient Selection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Select Patient</Label>
                <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map(patient => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.name} ({patient.dosha})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Diet Plan Date</Label>
                <Input
                  type="date"
                  value={dietPlan.date}
                  onChange={(e) => setDietPlan(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>

              {selectedPatient && (
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="text-sm mb-2">Patient Info</h4>
                  <div className="text-sm space-y-1">
                    <p>Constitution: {patients.find(p => p.id === selectedPatient)?.dosha}</p>
                    <p>Age: {patients.find(p => p.id === selectedPatient)?.age}y</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Daily Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Total Calories:</span>
                <span className="text-sm">{
                  Object.values(dietPlan.meals)
                    .flat()
                    .reduce((sum, item) => sum + item.calories, 0)
                } kcal</span>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="text-sm mb-2">Dosha Balance</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span>Vata</span>
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div className="w-1/3 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Pitta</span>
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div className="w-1/2 h-2 bg-orange-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Kapha</span>
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div className="w-1/4 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {dietPlan.guidelines.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  AI Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {dietPlan.guidelines.map((guideline, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm">{guideline}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Meal Planning */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChefHat className="w-4 h-4" />
                Meal Planning
              </CardTitle>
              <CardDescription>
                Design meals with Ayurvedic principles and nutritional balance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={currentMeal} onValueChange={(value) => setCurrentMeal(value as keyof DietPlan["meals"])}>
                <TabsList className="grid grid-cols-6 w-full">
                  {mealTimes.map(meal => (
                    <TabsTrigger key={meal.key} value={meal.key} className="flex flex-col gap-1 h-16">
                      <meal.icon className="w-4 h-4" />
                      <span className="text-xs">{meal.label}</span>
                      <span className="text-xs text-muted-foreground">{meal.time}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {mealTimes.map(meal => (
                  <TabsContent key={meal.key} value={meal.key} className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Current Meal Items */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg">{meal.label} Plan</h3>
                          <span className="text-sm text-muted-foreground">{meal.time}</span>
                        </div>
                        
                        <div className="space-y-3">
                          {dietPlan.meals[meal.key as keyof DietPlan["meals"]].map((item, index) => (
                            <Card key={index} className="p-3">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <h4 className="text-sm">{item.name}</h4>
                                  <p className="text-xs text-muted-foreground">{item.quantity}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs">{item.calories} kcal</span>
                                    <div className="flex gap-1">
                                      {item.rasa.map((taste, i) => (
                                        <Badge key={i} variant="outline" className="text-xs px-1 py-0">
                                          {taste}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFoodFromMeal(meal.key as keyof DietPlan["meals"], item.id)}
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                              </div>
                            </Card>
                          ))}
                          
                          {dietPlan.meals[meal.key as keyof DietPlan["meals"]].length === 0 && (
                            <div className="text-center p-8 text-muted-foreground">
                              <ChefHat className="w-8 h-8 mx-auto mb-2" />
                              <p>No items added to this meal</p>
                              <p className="text-xs">Add foods from the suggestions</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Food Suggestions */}
                      <div>
                        <h3 className="text-lg mb-4">Suggested Foods</h3>
                        <div className="space-y-3">
                          {suggestedFoods.map((food) => (
                            <Card key={food.id} className="p-3 hover:shadow-sm transition-shadow">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <h4 className="text-sm">{food.name}</h4>
                                  <p className="text-xs text-muted-foreground">{food.quantity}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs">{food.calories} kcal</span>
                                    <div className="flex gap-1">
                                      {food.rasa.map((taste, i) => (
                                        <Badge key={i} variant="secondary" className="text-xs px-1 py-0">
                                          {taste}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="flex gap-1 mt-1">
                                    {Object.entries(food.dosha).map(([dosha, effect]) => (
                                      <span key={dosha} className={`text-xs px-1 py-0.5 rounded ${
                                        effect === "decrease" ? "bg-green-100 text-green-700" :
                                        effect === "increase" ? "bg-red-100 text-red-700" :
                                        "bg-gray-100 text-gray-600"
                                      }`}>
                                        {dosha.charAt(0).toUpperCase()}
                                        {effect === "decrease" ? "↓" : effect === "increase" ? "↑" : "→"}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addFoodToMeal(food)}
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}