import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { User, UserRole } from "../../App";
import { Leaf, Users, User as UserIcon } from "lucide-react";

interface AuthPageProps {
  onLogin: (user: User) => void;
}

type AuthMode = "login" | "signup";

export function AuthPage({ onLogin }: AuthPageProps) {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (role: UserRole, email: string, name: string, password: string, mode: AuthMode) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: name || (role === "doctor" ? "Dr. Priya Sharma" : "Anjali Patel"),
      email: email || (role === "doctor" ? "dr.priya@ayurveda.com" : "anjali@patient.com"),
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`
    };
    
    onLogin(user);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <Leaf className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl text-primary mb-2">AyurNutri</h1>
          <p className="text-muted-foreground">Ayurvedic Practice Management & Nutrition Analysis</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="font-bold text-3xl">
              {authMode === "login" ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <CardDescription>
              {authMode === "login" 
                ? "Sign in to access your holistic healthcare dashboard"
                : "Join our Ayurvedic healthcare community"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="doctor" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="doctor" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Doctor
                </TabsTrigger>
                <TabsTrigger value="patient" className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4" />
                  Patient
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="doctor" className="space-y-4 mt-6">
                <AuthForm 
                  role="doctor" 
                  onAuth={handleAuth} 
                  isLoading={isLoading}
                  authMode={authMode}
                />
              </TabsContent>
              
              <TabsContent value="patient" className="space-y-4 mt-6">
                <AuthForm 
                  role="patient" 
                  onAuth={handleAuth} 
                  isLoading={isLoading}
                  authMode={authMode}
                />
              </TabsContent>
            </Tabs>

            {/* Mode Switch Button */}
            <div className="text-center mt-6">
              <Button 
                variant="ghost" 
                onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {authMode === "login" 
                  ? "Create an account" 
                  : "Already have an account? Login here.."
                }
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>🌿 Balancing ancient wisdom with modern nutrition science</p>
        </div>
      </div>
    </div>
  );
}

function AuthForm({ role, onAuth, isLoading, authMode }: { 
  role: UserRole; 
  onAuth: (role: UserRole, email: string, name: string, password: string, mode: AuthMode) => void;
  isLoading: boolean;
  authMode: AuthMode;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuth(role, email, name, password, authMode);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`${role}-email`}>Email</Label>
        <Input
          id={`${role}-email`}
          type="email"
          placeholder={role === "doctor" ? "doctor@ayurveda.com" : "patient@email.com"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-input-background hover:border-primary hover:shadow-sm hover:bg-opacity-80 hover:backdrop-blur-sm transition-all duration-200"
          required
        />
      </div>
      
      {authMode === "signup" && (
        <div className="space-y-2">
          <Label htmlFor={`${role}-name`}>Full Name</Label>
          <Input
            id={`${role}-name`}
            type="text"
            placeholder={role === "doctor" ? "Dr. Your Name" : "Your Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-input-background hover:border-primary hover:shadow-sm hover:bg-opacity-80 hover:backdrop-blur-sm transition-all duration-200"
            required
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor={`${role}-password`}>Password</Label>
        <Input
          id={`${role}-password`}
          type="password"
          placeholder={authMode === "login" ? "Enter your password" : "Create a secure password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-input-background hover:border-primary hover:shadow-sm hover:bg-opacity-80 hover:backdrop-blur-sm transition-all duration-200"
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading 
          ? (authMode === "login" ? "Signing in..." : "Creating account...") 
          : (authMode === "login" 
              ? `Login as ${role === "doctor" ? "Doctor" : "Patient"}` 
              : `Sign up as ${role === "doctor" ? "Doctor" : "Patient"}`
            )
        }
      </Button>
    </form>
  );
}