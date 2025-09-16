import { useState } from "react";
import { AuthPage } from "./components/auth/AuthPage";
import { DoctorDashboard } from "./components/doctor/DoctorDashboard";
import { PatientDashboard } from "./components/patient/PatientDashboard";
import { User } from "./App";

// Mock users for demonstration
const mockDoctorUser: User = {
  id: "doc1",
  name: "Dr. Priya Sharma",
  email: "priya.sharma@ayurnutri.com",
  role: "doctor"
};

const mockPatientUser: User = {
  id: "pat1", 
  name: "Anjali Patel",
  email: "anjali.patel@email.com",
  role: "patient"
};

export default function FrameShowcase() {
  const [currentFrame, setCurrentFrame] = useState(0);

  const frames = [
    {
      title: "Authentication Page",
      description: "Unified login interface for doctors and patients with role-based authentication",
      component: <AuthPage onLogin={() => {}} />
    },
    {
      title: "Doctor Dashboard - Overview",
      description: "Main dashboard showing patient statistics, recent activity, and dosha distribution",
      component: <DoctorDashboard user={mockDoctorUser} onLogout={() => {}} />
    },
    {
      title: "Patient Dashboard - Diet Plan",
      description: "Patient interface with daily meal tracking, progress monitoring, and constitutional guidance",
      component: <PatientDashboard user={mockPatientUser} onLogout={() => {}} />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AyurNutri Application Frames</h1>
              <p className="text-gray-600 mt-1">Comprehensive visual documentation of all application interfaces</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Frame {currentFrame + 1} of {frames.length}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentFrame(Math.max(0, currentFrame - 1))}
                  disabled={currentFrame === 0}
                  className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentFrame(Math.min(frames.length - 1, currentFrame + 1))}
                  disabled={currentFrame === frames.length - 1}
                  className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Frame Navigation */}
      <div className="bg-white border-b px-6 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-4">
            {frames.map((frame, index) => (
              <button
                key={index}
                onClick={() => setCurrentFrame(index)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentFrame === index 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {frame.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Current Frame Display */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">{frames[currentFrame].title}</h2>
              <p className="text-gray-600 mt-1">{frames[currentFrame].description}</p>
            </div>
            
            {/* Frame Container */}
            <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-white">
              <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="ml-4 text-sm text-gray-600">ayurnutri.com</span>
                </div>
              </div>
              
              <div className="h-[800px] overflow-hidden">
                {frames[currentFrame].component}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Frames Overview */}
      <div className="bg-white border-t px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">All Application Frames</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {frames.map((frame, index) => (
              <div key={index} className="border rounded-lg overflow-hidden bg-white shadow-sm">
                <div className="p-4 border-b bg-gray-50">
                  <h3 className="font-medium text-gray-900">{frame.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{frame.description}</p>
                </div>
                <div className="h-48 overflow-hidden">
                  <div className="transform scale-50 origin-top-left" style={{ width: '200%', height: '200%' }}>
                    {frame.component}
                  </div>
                </div>
                <div className="p-3 bg-gray-50 border-t">
                  <button
                    onClick={() => setCurrentFrame(index)}
                    className="w-full px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                  >
                    View Full Frame
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Information */}
      <div className="bg-gray-900 text-white px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">About AyurNutri</h3>
              <p className="text-gray-300 mb-4">
                AyurNutri is a modern, cloud-based practice management and nutrient analysis software 
                specifically designed for Ayurvedic dietitians and patients. The application balances 
                professional healthcare standards with Ayurveda's holistic principles.
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>• Dual authentication for doctors and patients</li>
                <li>• 8,000+ foods database with Ayurvedic classifications</li>
                <li>• Dosha-based meal recommendations</li>
                <li>• Progress tracking and analytics</li>
                <li>• Professional healthcare aesthetics</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Technical Stack</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-300">Frontend</h4>
                  <p className="text-gray-400">React 18, TypeScript, Tailwind CSS v4</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-300">UI Components</h4>
                  <p className="text-gray-400">Radix UI, Shadcn/ui, Lucide Icons</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-300">Design System</h4>
                  <p className="text-gray-400">Earth-toned Ayurvedic theme, Responsive design</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-300">Features</h4>
                  <p className="text-gray-400">Role-based access, Real-time updates, PDF exports</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}