# AyurNutri - Application Frames Documentation

## Overview
**AyurNutri** is a modern, cloud-based practice management and nutrient analysis software specifically designed for Ayurvedic dietitians and patients. The application balances professional healthcare standards with Ayurveda's holistic principles.

### Key Features
- **Dual Authentication**: Separate interfaces for doctors/dietitians and patients
- **Ayurvedic Integration**: Complete food categorization with Rasa (6 tastes), Guna (qualities), Virya (heating/cooling effects), and Dosha balance
- **Professional Design**: Earth-toned, healthcare-focused UI with visual Ayurvedic cues
- **Comprehensive Management**: Patient management, diet chart creation, progress tracking, and detailed reporting

---

## Application Frames

### 1. Authentication Page
**File**: `/components/auth/AuthPage.tsx`
**Purpose**: Unified login interface for both doctors and patients
**Features**:
- Role-based authentication (Doctor/Patient toggle)
- Modern form design with Ayurvedic theming
- Responsive layout with hover effects
- Earth-tone color scheme (#8b5a3c primary)
- Input field enhancements with dimming hover effects

**Visual Elements**:
- Large "Welcome Back" text (text-3xl, font-bold)
- Role toggle buttons with distinct styling
- Enhanced input fields with primary color borders on hover
- Smooth transitions and micro-interactions

---

### 2. Doctor Dashboard - Overview
**File**: `/components/doctor/DoctorDashboard.tsx`
**Purpose**: Main dashboard for Ayurvedic dietitians and doctors
**Layout**: Tabbed interface with 5 main sections

**Header**:
- AyurNutri branding with leaf icon
- "Doctor Portal" badge
- User profile with avatar
- Logout functionality

**Tabs**:
1. **Overview** - Dashboard statistics and recent activity
2. **Patients** - Patient management interface  
3. **Diet Charts** - Diet chart creation tools
4. **Food Database** - Searchable food database
5. **Reports** - Analytics and reporting

**Overview Tab Features**:
- **Statistics Cards**: Active Patients (124), Diet Charts Created (89), Consultations Today (15), Avg. Dosha Balance (87%)
- **Recent Activity Feed**: Patient interactions with dosha classifications
- **Dosha Distribution Chart**: Vata (42%), Pitta (35%), Kapha (23%)

---

### 3. Patient Management Interface
**File**: `/components/doctor/PatientManagement.tsx`
**Purpose**: Comprehensive patient management for doctors
**Features**:
- Patient registration with Ayurvedic assessment
- Patient list with dosha classifications
- Individual patient profiles
- Health goal tracking
- Appointment scheduling

**Visual Elements**:
- Patient cards with dosha badges
- Quick action buttons
- Search and filter functionality
- Modal dialogs for patient details

---

### 4. Diet Chart Creator
**File**: `/components/doctor/DietChartCreator.tsx`
**Purpose**: Drag-and-drop diet chart creation tool
**Features**:
- Visual meal planning interface
- Ayurvedic food categorization
- Dosha-specific recommendations
- Nutritional analysis
- Meal timing optimization

**Ayurvedic Classifications**:
- **Rasa**: Sweet, Sour, Salty, Pungent, Bitter, Astringent
- **Virya**: Heating (🔥) / Cooling (❄️) indicators
- **Guna**: Heavy/Light, Oily/Dry, Hot/Cold qualities
- **Dosha Effects**: Vata/Pitta/Kapha impact indicators

---

### 5. Food Database
**File**: `/components/doctor/FoodDatabase.tsx`
**Purpose**: Searchable database of 8,000+ foods with complete nutritional and Ayurvedic data
**Features**:
- Advanced search and filtering
- Detailed food profiles
- Ayurvedic classifications
- Nutritional information
- Seasonal recommendations

---

### 6. Reports & Analytics
**File**: `/components/doctor/ReportsAnalytics.tsx`
**Purpose**: Comprehensive reporting and analytics for doctors
**Features**:
- Patient progress tracking
- Dosha balance trends
- Diet compliance reports
- PDF/Excel export functionality
- Visual charts and graphs

---

### 7. Patient Dashboard - Diet Plan
**File**: `/components/patient/PatientDashboard.tsx`
**Purpose**: Personal dashboard for patients
**Layout**: 4-tab interface

**Header**:
- AyurNutri branding
- "Patient Portal" badge
- User profile with dosha constitution
- Logout functionality

**Tabs**:
1. **Diet Plan** - Daily meal tracking
2. **Progress** - Health metrics and goals
3. **Messages** - Communication with doctor
4. **Profile** - Personal information and appointments

**Diet Plan Features**:
- **Today's Meal Plan**: Time-based meal cards with completion status
- **Daily Progress**: Meal completion and water intake tracking
- **Reminders**: Personalized wellness tips
- **Constitution Guide**: Visual dosha representation

---

### 8. Progress Tracking
**Purpose**: Comprehensive health metrics tracking for patients
**Features**:
- Daily progress entry form
- Weight tracking
- Energy levels (1-10 scale)
- Digestion quality assessment
- Sleep quality monitoring
- Water intake tracking
- Symptom logging

**Visual Elements**:
- Progress bars and charts
- Achievement badges
- Trend indicators
- Goal completion status

---

### 9. Communication Interface
**Purpose**: Secure messaging between patients and doctors
**Features**:
- Message history display
- Real-time chat interface
- Attachment support
- Professional consultation notes

---

### 10. Patient Profile Management
**Purpose**: Personal information and appointment management
**Features**:
- Personal details
- Dosha constitution information
- Health goals tracking
- Upcoming appointments
- Medical history

---

## Design System

### Color Palette
- **Primary**: #8b5a3c (Ayurvedic brown)
- **Background**: #faf9f7 (Warm cream)
- **Foreground**: #2d2b26 (Dark brown)
- **Secondary**: #f4f1ed (Light beige)
- **Muted**: #6b5b4d (Medium brown)

### Ayurvedic Theme Colors
- **Vata**: #9faa98 (Green-gray)
- **Pitta**: #d2691e (Orange-red)
- **Kapha**: #8fbc8f (Sea green)
- **Earth**: #8b5a3c (Brown)
- **Fire**: #ff6b35 (Orange)
- **Water**: #4682b4 (Steel blue)

### Typography
- **Base Font Size**: 18px
- **Headings**: Medium weight (500)
- **Body Text**: Normal weight (400)
- **Responsive scaling**: Tailwind CSS v4

### Components
- **Cards**: Rounded corners (0.625rem), subtle shadows
- **Buttons**: Primary and secondary variants with hover effects
- **Inputs**: Transparent background with border focus states
- **Badges**: Role and status indicators
- **Progress Bars**: Visual tracking elements

---

## Technical Implementation

### Framework Stack
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **State Management**: React useState/useEffect hooks

### File Structure
```
components/
├── auth/AuthPage.tsx
├── doctor/
│   ├── DoctorDashboard.tsx
│   ├── PatientManagement.tsx
│   ├── DietChartCreator.tsx
│   ├── FoodDatabase.tsx
│   └── ReportsAnalytics.tsx
├── patient/PatientDashboard.tsx
└── ui/ (Shadcn components)
```

### Responsive Design
- **Mobile-first approach**: All components responsive
- **Breakpoints**: Tailwind standard (sm, md, lg, xl)
- **Flexible layouts**: CSS Grid and Flexbox
- **Touch-friendly**: Appropriate button sizes and spacing

---

## User Experience Features

### Accessibility
- **ARIA labels**: Screen reader support
- **Keyboard navigation**: Tab-friendly interfaces
- **Color contrast**: WCAG compliance
- **Focus indicators**: Clear visual feedback

### Performance
- **Component optimization**: React.memo where appropriate
- **Lazy loading**: Code splitting for large components
- **Image optimization**: Responsive images with fallbacks
- **Efficient re-renders**: Optimized state management

### Ayurvedic Integration
- **Visual cues**: Dosha colors and symbols throughout
- **Educational elements**: Constitution guides and tips
- **Personalization**: Dosha-based recommendations
- **Cultural sensitivity**: Authentic Ayurvedic principles

---

## Application Flow

### Doctor Workflow
1. **Login** → Authentication page
2. **Dashboard** → Overview of patients and statistics
3. **Patient Management** → Add/edit patient profiles
4. **Diet Creation** → Create personalized diet charts
5. **Monitoring** → Track patient progress via reports

### Patient Workflow  
1. **Login** → Authentication page
2. **Diet Plan** → View and track daily meals
3. **Progress Entry** → Log health metrics
4. **Communication** → Message doctor
5. **Profile** → Manage personal information

---

This documentation provides a comprehensive overview of all application frames in the AyurNutri system, showcasing the integration of modern healthcare technology with traditional Ayurvedic principles.