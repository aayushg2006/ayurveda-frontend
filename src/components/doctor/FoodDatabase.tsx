import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { 
  Search, 
  Filter, 
  Plus,
  Thermometer,
  Droplets,
  Zap,
  Eye,
  Edit,
  Flame,
  Snowflake,
  Weight,
  Feather
} from "lucide-react";

interface FoodItem {
  id: string;
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  rasa: string[]; // 6 tastes
  guna: string[]; // qualities
  virya: "hot" | "cold"; // heating/cooling
  dosha: {
    vata: "increase" | "decrease" | "neutral";
    pitta: "increase" | "decrease" | "neutral";
    kapha: "increase" | "decrease" | "neutral";
  };
  description: string;
}

export function FoodDatabase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [doshaFilter, setDoshaFilter] = useState("all");
  const [rasaFilter, setRasaFilter] = useState("all");

  const foodItems: FoodItem[] = [
    {
      id: "1",
      name: "Basmati Rice",
      category: "Grains",
      calories: 130,
      protein: 2.7,
      carbs: 28,
      fat: 0.3,
      fiber: 0.4,
      rasa: ["Sweet"],
      guna: ["Heavy", "Oily", "Smooth"],
      virya: "cold",
      dosha: {
        vata: "decrease",
        pitta: "decrease", 
        kapha: "increase"
      },
      description: "Easily digestible grain, good for all constitutions when prepared properly"
    },
    {
      id: "2",
      name: "Turmeric",
      category: "Spices",
      calories: 24,
      protein: 0.9,
      carbs: 4.4,
      fat: 0.3,
      fiber: 1.4,
      rasa: ["Bitter", "Pungent"],
      guna: ["Light", "Dry", "Rough"],
      virya: "hot",
      dosha: {
        vata: "neutral",
        pitta: "increase",
        kapha: "decrease"
      },
      description: "Powerful anti-inflammatory spice, excellent for healing and digestion"
    },
    {
      id: "3",
      name: "Ghee",
      category: "Fats",
      calories: 112,
      protein: 0,
      carbs: 0,
      fat: 12.8,
      fiber: 0,
      rasa: ["Sweet"],
      guna: ["Heavy", "Oily", "Smooth"],
      virya: "cold",
      dosha: {
        vata: "decrease",
        pitta: "decrease",
        kapha: "increase"
      },
      description: "Sacred food in Ayurveda, enhances digestion and nourishes all tissues"
    },
    {
      id: "4",
      name: "Ginger",
      category: "Spices",
      calories: 4,
      protein: 0.1,
      carbs: 0.9,
      fat: 0,
      fiber: 0.1,
      rasa: ["Pungent", "Sweet"],
      guna: ["Light", "Oily"],
      virya: "hot",
      dosha: {
        vata: "decrease",
        pitta: "increase",
        kapha: "decrease"
      },
      description: "Universal digestive aid, excellent for stimulating agni (digestive fire)"
    },
    {
      id: "5",
      name: "Mung Dal",
      category: "Legumes",
      calories: 105,
      protein: 7.0,
      carbs: 19,
      fat: 0.4,
      fiber: 7.6,
      rasa: ["Sweet", "Astringent"],
      guna: ["Light", "Dry"],
      virya: "cold",
      dosha: {
        vata: "neutral",
        pitta: "decrease",
        kapha: "decrease"
      },
      description: "Most digestible of all legumes, ideal for detoxification and recovery"
    },
    {
      id: "6",
      name: "Coconut",
      category: "Fruits",
      calories: 354,
      protein: 3.3,
      carbs: 15,
      fat: 33,
      fiber: 9,
      rasa: ["Sweet"],
      guna: ["Heavy", "Oily", "Cool"],
      virya: "cold",
      dosha: {
        vata: "decrease",
        pitta: "decrease",
        kapha: "increase"
      },
      description: "Cooling and nourishing, excellent for pitta constitution and hot climates"
    },
    {
      id: "7",
      name: "Cumin Seeds",
      category: "Spices",
      calories: 22,
      protein: 1.1,
      carbs: 2.6,
      fat: 1.3,
      fiber: 0.6,
      rasa: ["Pungent", "Bitter"],
      guna: ["Light", "Dry", "Sharp"],
      virya: "hot",
      dosha: {
        vata: "decrease",
        pitta: "increase",
        kapha: "decrease"
      },
      description: "Digestive spice that enhances absorption and reduces gas formation"
    },
    {
      id: "8",
      name: "Almonds",
      category: "Nuts",
      calories: 161,
      protein: 6.0,
      carbs: 6.1,
      fat: 14,
      fiber: 3.5,
      rasa: ["Sweet"],
      guna: ["Heavy", "Oily", "Smooth"],
      virya: "hot",
      dosha: {
        vata: "decrease",
        pitta: "increase",
        kapha: "increase"
      },
      description: "Nourishing and strengthening, good for building ojas (vital essence)"
    }
  ];

  const filteredFoods = foodItems.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         food.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || food.category.toLowerCase() === categoryFilter;
    const matchesDosha = doshaFilter === "all" || 
                        food.dosha[doshaFilter as keyof typeof food.dosha] === "decrease";
    const matchesRasa = rasaFilter === "all" || food.rasa.includes(rasaFilter);
    
    return matchesSearch && matchesCategory && matchesDosha && matchesRasa;
  });

  const categories = ["all", "grains", "legumes", "vegetables", "fruits", "spices", "nuts", "fats"];
  const rasas = ["all", "Sweet", "Sour", "Salty", "Pungent", "Bitter", "Astringent"];
  const doshas = ["all", "vata", "pitta", "kapha"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">Food Database</h2>
          <p className="text-muted-foreground">8,000+ foods with complete nutritional and Ayurvedic analysis</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Food Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Food Item</DialogTitle>
              <DialogDescription>
                Add a new food with nutritional and Ayurvedic properties
              </DialogDescription>
            </DialogHeader>
            {/* Add form would go here */}
            <div className="p-4 text-center text-muted-foreground">
              Form to add new food items would be implemented here
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search foods by name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={rasaFilter} onValueChange={setRasaFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Rasa" />
            </SelectTrigger>
            <SelectContent>
              {rasas.map(rasa => (
                <SelectItem key={rasa} value={rasa}>
                  {rasa === "all" ? "All Tastes" : rasa}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={doshaFilter} onValueChange={setDoshaFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Balances Dosha" />
            </SelectTrigger>
            <SelectContent>
              {doshas.map(dosha => (
                <SelectItem key={dosha} value={dosha}>
                  {dosha === "all" ? "All Doshas" : `Balances ${dosha.charAt(0).toUpperCase() + dosha.slice(1)}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Food Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFoods.map((food) => (
          <Card key={food.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{food.name}</CardTitle>
                <Badge variant="outline">{food.category}</Badge>
              </div>
              <CardDescription className="text-sm line-clamp-2">
                {food.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Nutritional Info */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Calories: {food.calories}</div>
                <div>Protein: {food.protein}g</div>
                <div>Carbs: {food.carbs}g</div>
                <div>Fat: {food.fat}g</div>
              </div>

              {/* Rasa (Tastes) */}
              <div>
                <p className="text-sm text-muted-foreground mb-1">Rasa (Tastes):</p>
                <div className="flex gap-1 flex-wrap">
                  {food.rasa.map((taste, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {taste}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Virya (Energy) */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Virya:</span>
                <div className="flex items-center gap-1">
                  {food.virya === "hot" ? (
                    <>
                      <Flame className="w-3 h-3 text-red-500" />
                      <span className="text-sm">Heating</span>
                    </>
                  ) : (
                    <>
                      <Snowflake className="w-3 h-3 text-blue-500" />
                      <span className="text-sm">Cooling</span>
                    </>
                  )}
                </div>
              </div>

              {/* Dosha Effects */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Dosha Effects:</p>
                <div className="grid grid-cols-3 gap-1 text-xs">
                  <div className={`text-center p-1 rounded ${
                    food.dosha.vata === "decrease" ? "bg-green-100 text-green-700" :
                    food.dosha.vata === "increase" ? "bg-red-100 text-red-700" :
                    "bg-gray-100 text-gray-600"
                  }`}>
                    V: {food.dosha.vata === "decrease" ? "↓" : food.dosha.vata === "increase" ? "↑" : "→"}
                  </div>
                  <div className={`text-center p-1 rounded ${
                    food.dosha.pitta === "decrease" ? "bg-green-100 text-green-700" :
                    food.dosha.pitta === "increase" ? "bg-red-100 text-red-700" :
                    "bg-gray-100 text-gray-600"
                  }`}>
                    P: {food.dosha.pitta === "decrease" ? "↓" : food.dosha.pitta === "increase" ? "↑" : "→"}
                  </div>
                  <div className={`text-center p-1 rounded ${
                    food.dosha.kapha === "decrease" ? "bg-green-100 text-green-700" :
                    food.dosha.kapha === "increase" ? "bg-red-100 text-red-700" :
                    "bg-gray-100 text-gray-600"
                  }`}>
                    K: {food.dosha.kapha === "decrease" ? "↓" : food.dosha.kapha === "increase" ? "↑" : "→"}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-3 h-3 mr-1" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <FoodDetailView food={food} />
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="sm">
                  <Edit className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFoods.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg mb-2">No foods found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function FoodDetailView({ food }: { food: FoodItem }) {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center justify-between">
          {food.name}
          <Badge variant="outline">{food.category}</Badge>
        </DialogTitle>
        <DialogDescription>{food.description}</DialogDescription>
      </DialogHeader>

      <Tabs defaultValue="nutrition" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="ayurvedic">Ayurvedic</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="nutrition" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Nutritional Information</CardTitle>
              <CardDescription>Per 100g serving</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Calories:</span>
                    <span>{food.calories} kcal</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Protein:</span>
                    <span>{food.protein}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Carbohydrates:</span>
                    <span>{food.carbs}g</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Fat:</span>
                    <span>{food.fat}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fiber:</span>
                    <span>{food.fiber}g</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ayurvedic" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rasa (6 Tastes)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-1 flex-wrap">
                  {food.rasa.map((taste, index) => (
                    <Badge key={index} variant="default" className="mb-1">
                      {taste}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Guna (Qualities)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-1 flex-wrap">
                  {food.guna.map((quality, index) => (
                    <Badge key={index} variant="secondary" className="mb-1">
                      {quality}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Virya & Dosha Effects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span>Energy (Virya):</span>
                <div className="flex items-center gap-2">
                  {food.virya === "hot" ? (
                    <>
                      <Flame className="w-4 h-4 text-red-500" />
                      <span>Heating</span>
                    </>
                  ) : (
                    <>
                      <Snowflake className="w-4 h-4 text-blue-500" />
                      <span>Cooling</span>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h4>Effects on Doshas:</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className={`text-center p-3 rounded-lg ${
                    food.dosha.vata === "decrease" ? "bg-green-100" :
                    food.dosha.vata === "increase" ? "bg-red-100" : "bg-gray-100"
                  }`}>
                    <div className="text-sm">Vata</div>
                    <div className="text-lg">
                      {food.dosha.vata === "decrease" ? "↓" : food.dosha.vata === "increase" ? "↑" : "→"}
                    </div>
                    <div className="text-xs">
                      {food.dosha.vata === "decrease" ? "Decreases" : 
                       food.dosha.vata === "increase" ? "Increases" : "Neutral"}
                    </div>
                  </div>
                  <div className={`text-center p-3 rounded-lg ${
                    food.dosha.pitta === "decrease" ? "bg-green-100" :
                    food.dosha.pitta === "increase" ? "bg-red-100" : "bg-gray-100"
                  }`}>
                    <div className="text-sm">Pitta</div>
                    <div className="text-lg">
                      {food.dosha.pitta === "decrease" ? "↓" : food.dosha.pitta === "increase" ? "↑" : "→"}
                    </div>
                    <div className="text-xs">
                      {food.dosha.pitta === "decrease" ? "Decreases" : 
                       food.dosha.pitta === "increase" ? "Increases" : "Neutral"}
                    </div>
                  </div>
                  <div className={`text-center p-3 rounded-lg ${
                    food.dosha.kapha === "decrease" ? "bg-green-100" :
                    food.dosha.kapha === "increase" ? "bg-red-100" : "bg-gray-100"
                  }`}>
                    <div className="text-sm">Kapha</div>
                    <div className="text-lg">
                      {food.dosha.kapha === "decrease" ? "↓" : food.dosha.kapha === "increase" ? "↑" : "→"}
                    </div>
                    <div className="text-xs">
                      {food.dosha.kapha === "decrease" ? "Decreases" : 
                       food.dosha.kapha === "increase" ? "Increases" : "Neutral"}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Usage Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="text-sm">Best for constitutions:</h4>
                <div className="flex gap-2 mt-1">
                  {Object.entries(food.dosha).map(([dosha, effect]) => 
                    effect === "decrease" && (
                      <Badge key={dosha} variant="default">
                        {dosha.charAt(0).toUpperCase() + dosha.slice(1)} imbalance
                      </Badge>
                    )
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm">Preparation suggestions:</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Best consumed warm, with appropriate spices for your constitution. 
                  Avoid if you have excess {Object.entries(food.dosha)
                    .filter(([, effect]) => effect === "increase")
                    .map(([dosha]) => dosha)
                    .join(" or ")} dosha.
                </p>
              </div>

              <div>
                <h4 className="text-sm">Seasonal recommendations:</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {food.virya === "hot" 
                    ? "Best consumed in cold seasons (autumn/winter) and by those with cold constitution."
                    : "Best consumed in warm seasons (spring/summer) and by those with hot constitution."
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}