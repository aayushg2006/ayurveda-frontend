import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Progress } from "../ui/progress";
import { Checkbox } from "../ui/checkbox";
import { Download, FileText, Loader2 } from "lucide-react";
import { User } from "../../App";
import jsPDF from "jspdf@2.5.2";
import html2canvas from "html2canvas@1.4.1";

interface PDFExporterProps {
  user: User;
}

interface FrameConfig {
  id: string;
  name: string;
  description: string;
  component: React.ReactNode;
  enabled: boolean;
}

export function PDFExporter({ user }: PDFExporterProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [selectedFrames, setSelectedFrames] = useState<string[]>([]);

  // Define all available frames based on user role
  const getAvailableFrames = (): FrameConfig[] => {
    const baseFrames: FrameConfig[] = [
      {
        id: "auth",
        name: "Authentication Page",
        description: "Login interface for doctors and patients",
        component: <div>Auth Frame Preview</div>,
        enabled: true
      }
    ];

    if (user.role === "doctor") {
      return [
        ...baseFrames,
        {
          id: "doctor-dashboard",
          name: "Doctor Dashboard",
          description: "Main dashboard with overview and navigation",
          component: <div>Doctor Dashboard Preview</div>,
          enabled: true
        },
        {
          id: "patient-management",
          name: "Patient Management",
          description: "Patient list and management interface",
          component: <div>Patient Management Preview</div>,
          enabled: true
        },
        {
          id: "diet-chart-creator",
          name: "Diet Chart Creator",
          description: "Drag-and-drop diet chart creation tool",
          component: <div>Diet Chart Creator Preview</div>,
          enabled: true
        },
        {
          id: "food-database",
          name: "Food Database",
          description: "Searchable database with Ayurvedic classifications",
          component: <div>Food Database Preview</div>,
          enabled: true
        },
        {
          id: "reports-analytics",
          name: "Reports & Analytics",
          description: "Patient progress reports and analytics",
          component: <div>Reports & Analytics Preview</div>,
          enabled: true
        }
      ];
    } else {
      return [
        ...baseFrames,
        {
          id: "patient-dashboard",
          name: "Patient Dashboard",
          description: "Patient overview with progress tracking",
          component: <div>Patient Dashboard Preview</div>,
          enabled: true
        },
        {
          id: "meal-tracker",
          name: "Meal Tracker",
          description: "Daily meal logging and tracking",
          component: <div>Meal Tracker Preview</div>,
          enabled: true
        },
        {
          id: "progress-charts",
          name: "Progress Charts",
          description: "Visual progress tracking and goals",
          component: <div>Progress Charts Preview</div>,
          enabled: true
        },
        {
          id: "recommendations",
          name: "AI Recommendations",
          description: "Personalized meal and lifestyle recommendations",
          component: <div>AI Recommendations Preview</div>,
          enabled: true
        }
      ];
    }
  };

  const frames = getAvailableFrames();

  const handleFrameToggle = (frameId: string) => {
    setSelectedFrames(prev => 
      prev.includes(frameId) 
        ? prev.filter(id => id !== frameId)
        : [...prev, frameId]
    );
  };

  const selectAllFrames = () => {
    setSelectedFrames(frames.map(frame => frame.id));
  };

  const deselectAllFrames = () => {
    setSelectedFrames([]);
  };

  const captureElement = async (element: HTMLElement): Promise<string> => {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#faf9f7',
      width: 1200,
      height: 800,
    });
    return canvas.toDataURL('image/png', 0.95);
  };

  const createFrameElement = (frameContent: React.ReactNode): HTMLElement => {
    const container = document.createElement('div');
    container.style.width = '1200px';
    container.style.height = '800px';
    container.style.backgroundColor = '#faf9f7';
    container.style.padding = '24px';
    container.style.fontFamily = 'system-ui, -apple-system, sans-serif';
    container.style.position = 'absolute';
    container.style.top = '-9999px';
    container.style.left = '-9999px';
    
    // Create a mock frame content
    container.innerHTML = `
      <div style="height: 100%; display: flex; flex-direction: column; background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); padding: 32px;">
        <div style="display: flex; align-items: center; margin-bottom: 24px;">
          <div style="width: 48px; height: 48px; background: #8b5a3c; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px;">
            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div>
            <h1 style="margin: 0; font-size: 32px; font-weight: 600; color: #2d2b26;">AyurNutri</h1>
            <p style="margin: 0; color: #6b5b4d; font-size: 16px;">Ayurvedic Practice Management & Nutrition Analysis</p>
          </div>
        </div>
        <div style="flex: 1; display: flex; align-items: center; justify-content: center; background: #f4f1ed; border-radius: 8px; border: 2px dashed #e0d5c7;">
          <div style="text-align: center;">
            <div style="font-size: 48px; margin-bottom: 16px;">🌿</div>
            <h2 style="margin: 0 0 8px 0; font-size: 24px; color: #2d2b26;">Frame Content</h2>
            <p style="margin: 0; color: #6b5b4d;">This represents the exported frame content</p>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(container);
    return container;
  };

  const exportToPDF = async () => {
    if (selectedFrames.length === 0) return;

    setIsExporting(true);
    setExportProgress(0);

    try {
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const totalFrames = selectedFrames.length;

      for (let i = 0; i < selectedFrames.length; i++) {
        const frameId = selectedFrames[i];
        const frame = frames.find(f => f.id === frameId);
        
        if (!frame) continue;

        // Create mock frame element
        const frameElement = createFrameElement(frame.component);
        
        // Wait for fonts and images to load
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Capture the frame
        const imageData = await captureElement(frameElement);
        
        // Remove the temporary element
        document.body.removeChild(frameElement);
        
        // Add page to PDF (except for first page)
        if (i > 0) {
          pdf.addPage();
        }
        
        // Add title page info
        pdf.setFontSize(20);
        pdf.setTextColor(45, 43, 38);
        pdf.text(frame.name, 20, 20);
        
        pdf.setFontSize(12);
        pdf.setTextColor(107, 91, 77);
        pdf.text(frame.description, 20, 30);
        
        // Add the captured image
        const imgWidth = 250;
        const imgHeight = 150;
        pdf.addImage(imageData, 'PNG', 20, 40, imgWidth, imgHeight);
        
        // Add footer
        pdf.setFontSize(10);
        pdf.setTextColor(139, 90, 60);
        pdf.text(`AyurNutri - ${user.role === 'doctor' ? 'Doctor' : 'Patient'} Interface`, 20, 200);
        pdf.text(`Page ${i + 1} of ${totalFrames}`, 250, 200);
        
        // Update progress
        setExportProgress(((i + 1) / totalFrames) * 100);
      }

      // Add cover page at the beginning
      pdf.insertPage(1);
      
      // Cover page content
      pdf.setFontSize(32);
      pdf.setTextColor(139, 90, 60);
      pdf.text('AyurNutri', 20, 40);
      
      pdf.setFontSize(18);
      pdf.setTextColor(45, 43, 38);
      pdf.text('Application Frames Export', 20, 55);
      
      pdf.setFontSize(14);
      pdf.setTextColor(107, 91, 77);
      pdf.text(`${user.role === 'doctor' ? 'Doctor' : 'Patient'} Interface`, 20, 70);
      pdf.text(`Exported on: ${new Date().toLocaleDateString()}`, 20, 80);
      pdf.text(`Total Frames: ${selectedFrames.length}`, 20, 90);
      
      // Add Ayurvedic elements
      pdf.setFontSize(12);
      pdf.text('🌿 Balancing ancient wisdom with modern nutrition science', 20, 160);
      
      // Save the PDF
      const fileName = `ayurnutri-${user.role}-frames-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
    } catch (error) {
      console.error('Error exporting PDF:', error);
    } finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export to PDF
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Export Application Frames to PDF
          </DialogTitle>
          <DialogDescription>
            Select which frames you want to include in your PDF export. Each frame will be captured and saved as a separate page.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Frame Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Available Frames</h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={selectAllFrames}>
                  Select All
                </Button>
                <Button variant="ghost" size="sm" onClick={deselectAllFrames}>
                  Deselect All
                </Button>
              </div>
            </div>
            
            <div className="grid gap-3 max-h-64 overflow-y-auto">
              {frames.map((frame) => (
                <Card key={frame.id} className="p-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id={frame.id}
                      checked={selectedFrames.includes(frame.id)}
                      onCheckedChange={() => handleFrameToggle(frame.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={frame.id}
                        className="font-medium cursor-pointer"
                      >
                        {frame.name}
                      </label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {frame.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Export Progress */}
          {isExporting && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Exporting frames...</span>
                <span>{Math.round(exportProgress)}%</span>
              </div>
              <Progress value={exportProgress} />
            </div>
          )}

          {/* Export Button */}
          <div className="flex justify-end gap-3">
            <DialogTrigger asChild>
              <Button variant="outline" disabled={isExporting}>
                Cancel
              </Button>
            </DialogTrigger>
            <Button 
              onClick={exportToPDF} 
              disabled={selectedFrames.length === 0 || isExporting}
              className="gap-2"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Export {selectedFrames.length} Frame{selectedFrames.length !== 1 ? 's' : ''}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}