import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Calendar } from "../ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";
import { toast } from "sonner@2.0.3";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  FileText, 
  CheckCircle,
  AlertCircle,
  Phone,
  Video,
  MapPin,
  Leaf
} from "lucide-react";

interface AppointmentData {
  date: Date | undefined;
  time: string;
  type: string;
  duration: string;
  reason: string;
  symptoms: string[];
  notes: string;
  mode: string;
  urgency: string;
  followUp: boolean;
}

interface AppointmentSchedulingProps {
  doctorName: string;
  trigger?: React.ReactNode;
}

export function AppointmentScheduling({ doctorName, trigger }: AppointmentSchedulingProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    date: undefined,
    time: "",
    type: "",
    duration: "30",
    reason: "",
    symptoms: [],
    notes: "",
    mode: "in-person",
    urgency: "routine",
    followUp: false
  });

  const appointmentTypes = [
    { value: "consultation", label: "Initial Consultation", duration: "60 min", description: "Comprehensive dosha assessment and treatment plan" },
    { value: "follow-up", label: "Follow-up Visit", duration: "30 min", description: "Progress review and plan adjustments" },
    { value: "diet-review", label: "Diet Plan Review", duration: "30 min", description: "Review and modify dietary recommendations" },
    { value: "wellness-check", label: "Wellness Check", duration: "20 min", description: "General health and lifestyle assessment" },
    { value: "urgent", label: "Urgent Consultation", duration: "45 min", description: "Immediate health concerns requiring attention" }
  ];

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM"
  ];

  const commonSymptoms = [
    "Digestive issues", "Low energy", "Sleep problems", "Stress/Anxiety", 
    "Joint pain", "Headaches", "Skin issues", "Weight concerns",
    "Mood changes", "Irregular appetite", "Bloating", "Constipation"
  ];

  const handleSymptomToggle = (symptom: string) => {
    setAppointmentData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const handleSchedule = () => {
    // Validate required fields
    if (!appointmentData.date || !appointmentData.time || !appointmentData.type || !appointmentData.reason) {
      toast.error("Please fill in all required fields");
      return;
    }

    // In a real app, this would make an API call
    toast.success("Appointment scheduled successfully!", {
      description: `Your appointment with ${doctorName} is confirmed for ${appointmentData.date.toLocaleDateString()} at ${appointmentData.time}`
    });
    
    setOpen(false);
    setStep(1);
    // Reset form
    setAppointmentData({
      date: undefined,
      time: "",
      type: "",
      duration: "30",
      reason: "",
      symptoms: [],
      notes: "",
      mode: "in-person",
      urgency: "routine",
      followUp: false
    });
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Select Date & Time</h3>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Calendar Section */}
          <div className="flex-1">
            <Label className="text-sm font-medium mb-3 block">Preferred Date</Label>
            <div className="flex justify-center">
              <div className="w-fit">
                <Calendar
                  mode="single"
                  selected={appointmentData.date}
                  onSelect={(date) => setAppointmentData(prev => ({ ...prev, date }))}
                  disabled={(date) => date < new Date() || date.getDay() === 0}
                  className="rounded-lg border bg-card shadow-sm"
                />
              </div>
            </div>
            {appointmentData.date && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  Selected: <span className="font-medium">{appointmentData.date.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </p>
              </div>
            )}
          </div>
          
          {/* Time Slots Section */}
          <div className="flex-1">
            <Label className="text-sm font-medium mb-3 block">
              Available Time Slots
              {!appointmentData.date && (
                <span className="text-muted-foreground ml-1">(Select a date first)</span>
              )}
            </Label>
            <div className={`grid grid-cols-2 gap-2 max-h-64 overflow-y-auto p-1 ${
              !appointmentData.date ? 'opacity-50 pointer-events-none' : ''
            }`}>
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={appointmentData.time === time ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAppointmentData(prev => ({ ...prev, time }))}
                  className="justify-start h-10"
                  disabled={!appointmentData.date}
                >
                  <Clock className="w-3 h-3 mr-2" />
                  <span className="text-sm">{time}</span>
                </Button>
              ))}
            </div>
            {appointmentData.time && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  Time: <span className="font-medium">{appointmentData.time}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Appointment Mode Section */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Appointment Mode</Label>
        <RadioGroup
          value={appointmentData.mode}
          onValueChange={(value) => setAppointmentData(prev => ({ ...prev, mode: value }))}
          className="grid grid-cols-1 md:grid-cols-3 gap-3"
        >
          <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="in-person" id="in-person" />
            <Label htmlFor="in-person" className="flex items-center gap-2 cursor-pointer flex-1">
              <MapPin className="w-4 h-4" />
              <div>
                <span className="font-medium">In-Person</span>
                <p className="text-xs text-muted-foreground">Visit our clinic</p>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="video" id="video" />
            <Label htmlFor="video" className="flex items-center gap-2 cursor-pointer flex-1">
              <Video className="w-4 h-4" />
              <div>
                <span className="font-medium">Video Call</span>
                <p className="text-xs text-muted-foreground">Online consultation</p>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="phone" id="phone" />
            <Label htmlFor="phone" className="flex items-center gap-2 cursor-pointer flex-1">
              <Phone className="w-4 h-4" />
              <div>
                <span className="font-medium">Phone Call</span>
                <p className="text-xs text-muted-foreground">Audio consultation</p>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Appointment Details</h3>
        
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">Type of Consultation *</Label>
            <div className="grid gap-3">
              {appointmentTypes.map((type) => (
                <Card 
                  key={type.value}
                  className={`cursor-pointer transition-colors ${
                    appointmentData.type === type.value ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setAppointmentData(prev => ({ ...prev, type: type.value, duration: type.duration.split(' ')[0] }))}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{type.label}</h4>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                      <Badge variant="secondary">{type.duration}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Priority Level</Label>
            <Select value={appointmentData.urgency} onValueChange={(value) => setAppointmentData(prev => ({ ...prev, urgency: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="routine">🌿 Routine - Within 2 weeks</SelectItem>
                <SelectItem value="priority">⚡ Priority - Within 1 week</SelectItem>
                <SelectItem value="urgent">🚨 Urgent - Within 2-3 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Health Information</h3>
        
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">Primary Reason for Visit *</Label>
            <Textarea
              placeholder="Please describe the main reason for your visit..."
              value={appointmentData.reason}
              onChange={(e) => setAppointmentData(prev => ({ ...prev, reason: e.target.value }))}
              className="min-h-[80px]"
            />
          </div>

          <div>
            <Label className="text-sm font-medium mb-3 block">Current Symptoms (Select all that apply)</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {commonSymptoms.map((symptom) => (
                <div key={symptom} className="flex items-center space-x-2">
                  <Checkbox
                    id={symptom}
                    checked={appointmentData.symptoms.includes(symptom)}
                    onCheckedChange={() => handleSymptomToggle(symptom)}
                  />
                  <Label htmlFor={symptom} className="text-sm cursor-pointer">
                    {symptom}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Additional Notes</Label>
            <Textarea
              placeholder="Any additional information about your health, medications, or specific concerns..."
              value={appointmentData.notes}
              onChange={(e) => setAppointmentData(prev => ({ ...prev, notes: e.target.value }))}
              className="min-h-[80px]"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="follow-up"
              checked={appointmentData.followUp}
              onCheckedChange={(checked) => setAppointmentData(prev => ({ ...prev, followUp: checked as boolean }))}
            />
            <Label htmlFor="follow-up" className="text-sm">
              This is a follow-up to a previous consultation
            </Label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">Review Your Appointment</h3>
        <p className="text-muted-foreground">Please review the details before confirming</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-primary" />
            Appointment Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Doctor</Label>
              <p className="font-medium">{doctorName}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Date & Time</Label>
              <p className="font-medium">
                {appointmentData.date?.toLocaleDateString()} at {appointmentData.time}
              </p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Type</Label>
              <p className="font-medium">
                {appointmentTypes.find(t => t.value === appointmentData.type)?.label}
              </p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Duration</Label>
              <p className="font-medium">{appointmentData.duration} minutes</p>
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Mode</Label>
            <p className="font-medium capitalize">{appointmentData.mode.replace('-', ' ')}</p>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Reason</Label>
            <p className="text-sm">{appointmentData.reason}</p>
          </div>

          {appointmentData.symptoms.length > 0 && (
            <div>
              <Label className="text-xs text-muted-foreground">Symptoms</Label>
              <div className="flex flex-wrap gap-1 mt-1">
                {appointmentData.symptoms.map((symptom) => (
                  <Badge key={symptom} variant="secondary" className="text-xs">
                    {symptom}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {appointmentData.notes && (
            <div>
              <Label className="text-xs text-muted-foreground">Additional Notes</Label>
              <p className="text-sm">{appointmentData.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">Important Notes</h4>
            <ul className="text-sm text-blue-800 mt-1 space-y-1">
              <li>• Please arrive 10 minutes early for in-person appointments</li>
              <li>• Bring any recent lab reports or medical documents</li>
              <li>• You'll receive a confirmation email with appointment details</li>
              <li>• For urgent concerns, please call our clinic directly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="w-full">
            <CalendarIcon className="w-4 h-4 mr-2" />
            Schedule New Appointment
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Schedule Appointment with {doctorName}
          </DialogTitle>
          <DialogDescription>
            Book your consultation with our Ayurvedic practitioner
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {stepNumber}
                  </div>
                  {stepNumber < 4 && (
                    <div className={`w-8 h-0.5 ${step > stepNumber ? 'bg-primary' : 'bg-muted'}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              Step {step} of 4
            </div>
          </div>

          {/* Step Content */}
          <div className="min-h-[400px]">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderConfirmation()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
            >
              Previous
            </Button>
            
            <div className="space-x-2">
              {step < 4 ? (
                <Button
                  onClick={() => setStep(Math.min(4, step + 1))}
                  disabled={
                    (step === 1 && (!appointmentData.date || !appointmentData.time)) ||
                    (step === 2 && !appointmentData.type) ||
                    (step === 3 && !appointmentData.reason)
                  }
                >
                  Next
                </Button>
              ) : (
                <Button onClick={handleSchedule} className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Confirm Appointment
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}