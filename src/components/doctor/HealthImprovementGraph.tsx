import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Activity,
  Heart,
  Moon,
  Droplets,
  Scale,
  Zap
} from "lucide-react";

interface HealthMetric {
  date: string;
  energy: number;
  digestion: number;
  sleep: number;
  weight: number;
  stress: number;
  overall: number;
  symptoms: number;
}

interface HealthImprovementGraphProps {
  patientName: string;
  patientId: string;
}

export function HealthImprovementGraph({ patientName, patientId }: HealthImprovementGraphProps) {
  const [timeRange, setTimeRange] = useState("3months");
  const [selectedMetric, setSelectedMetric] = useState("all");

  // Mock health improvement data - in real app this would come from API
  const healthData: HealthMetric[] = [
    { date: "2023-10-01", energy: 4, digestion: 3, sleep: 5, weight: 68.5, stress: 7, overall: 4.2, symptoms: 6 },
    { date: "2023-10-15", energy: 5, digestion: 4, sleep: 6, weight: 68.2, stress: 6, overall: 5.0, symptoms: 5 },
    { date: "2023-11-01", energy: 6, digestion: 6, sleep: 6, weight: 67.8, stress: 5, overall: 6.1, symptoms: 4 },
    { date: "2023-11-15", energy: 6, digestion: 7, sleep: 7, weight: 67.5, stress: 4, overall: 6.8, symptoms: 3 },
    { date: "2023-12-01", energy: 7, digestion: 8, sleep: 7, weight: 67.1, stress: 4, overall: 7.2, symptoms: 3 },
    { date: "2023-12-15", energy: 8, digestion: 8, sleep: 8, weight: 66.8, stress: 3, overall: 7.8, symptoms: 2 },
    { date: "2024-01-01", energy: 8, digestion: 9, sleep: 8, weight: 66.5, stress: 3, overall: 8.1, symptoms: 2 },
    { date: "2024-01-15", energy: 9, digestion: 9, sleep: 9, weight: 66.2, stress: 2, overall: 8.6, symptoms: 1 }
  ];

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'energy': return <Zap className="w-4 h-4" />;
      case 'digestion': return <Heart className="w-4 h-4" />;
      case 'sleep': return <Moon className="w-4 h-4" />;
      case 'stress': return <Activity className="w-4 h-4" />;
      case 'weight': return <Scale className="w-4 h-4" />;
      default: return <TrendingUp className="w-4 h-4" />;
    }
  };

  const getImprovementTrend = (startValue: number, endValue: number, metric: string) => {
    const change = endValue - startValue;
    const isPositive = metric === 'stress' || metric === 'symptoms' ? change < 0 : change > 0;
    const percentage = Math.abs((change / startValue) * 100);
    
    return {
      isPositive,
      percentage: percentage.toFixed(1),
      icon: isPositive ? <TrendingUp className="w-4 h-4" /> : change === 0 ? <Minus className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />
    };
  };

  const metricConfigs = {
    energy: { color: "#22c55e", name: "Energy Level", unit: "/10" },
    digestion: { color: "#f97316", name: "Digestion Quality", unit: "/10" },
    sleep: { color: "#6366f1", name: "Sleep Quality", unit: "/10" },
    weight: { color: "#8b5cf6", name: "Weight", unit: "kg" },
    stress: { color: "#ef4444", name: "Stress Level", unit: "/10" },
    overall: { color: "#8b5a3c", name: "Overall Wellness", unit: "/10" },
    symptoms: { color: "#f59e0b", name: "Symptom Severity", unit: "/10" }
  };

  const getCurrentTrends = () => {
    if (healthData.length < 2) return [];
    
    const latest = healthData[healthData.length - 1];
    const previous = healthData[0];
    
    return Object.keys(metricConfigs).map(metric => {
      const trend = getImprovementTrend(
        previous[metric as keyof HealthMetric] as number, 
        latest[metric as keyof HealthMetric] as number, 
        metric
      );
      
      return {
        metric,
        current: latest[metric as keyof HealthMetric],
        trend,
        config: metricConfigs[metric as keyof typeof metricConfigs]
      };
    });
  };

  const filteredData = selectedMetric === "all" ? healthData : 
    healthData.map(d => ({ 
      date: d.date, 
      [selectedMetric]: d[selectedMetric as keyof HealthMetric] 
    }));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Health Improvement Progress
            </CardTitle>
            <CardDescription>
              {patientName}'s wellness metrics and improvement trends over time
            </CardDescription>
          </div>
          
          <div className="flex gap-2">
            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Metrics</SelectItem>
                <SelectItem value="overall">Overall Wellness</SelectItem>
                <SelectItem value="energy">Energy Level</SelectItem>
                <SelectItem value="digestion">Digestion</SelectItem>
                <SelectItem value="sleep">Sleep Quality</SelectItem>
                <SelectItem value="weight">Weight</SelectItem>
                <SelectItem value="stress">Stress Level</SelectItem>
                <SelectItem value="symptoms">Symptoms</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">1 Month</SelectItem>
                <SelectItem value="3months">3 Months</SelectItem>
                <SelectItem value="6months">6 Months</SelectItem>
                <SelectItem value="1year">1 Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Current Metrics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {getCurrentTrends().map(({ metric, current, trend, config }) => (
            <div key={metric} className="p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-1 mb-1">
                {getMetricIcon(metric)}
                <span className="text-xs font-medium">{config.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">{current}{config.unit}</span>
                <div className={`flex items-center gap-1 text-xs ${
                  trend.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {trend.icon}
                  <span>{trend.percentage}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={healthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0d5c7" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke="#6b5b4d"
              />
              <YAxis 
                domain={selectedMetric === 'weight' ? ['dataMin - 1', 'dataMax + 1'] : [0, 10]}
                stroke="#6b5b4d"
              />
              <Tooltip 
                labelFormatter={(value) => `Date: ${formatDate(value as string)}`}
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e0d5c7',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              
              {selectedMetric === "all" ? (
                <>
                  <Line 
                    type="monotone" 
                    dataKey="overall" 
                    stroke="#8b5a3c" 
                    strokeWidth={3}
                    name="Overall Wellness"
                    dot={{ fill: '#8b5a3c', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="energy" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    name="Energy"
                    dot={{ fill: '#22c55e', strokeWidth: 2, r: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="digestion" 
                    stroke="#f97316" 
                    strokeWidth={2}
                    name="Digestion"
                    dot={{ fill: '#f97316', strokeWidth: 2, r: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sleep" 
                    stroke="#6366f1" 
                    strokeWidth={2}
                    name="Sleep"
                    dot={{ fill: '#6366f1', strokeWidth: 2, r: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="stress" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="Stress (lower is better)"
                    dot={{ fill: '#ef4444', strokeWidth: 2, r: 3 }}
                  />
                </>
              ) : (
                <Line 
                  type="monotone" 
                  dataKey={selectedMetric} 
                  stroke={metricConfigs[selectedMetric as keyof typeof metricConfigs]?.color || "#8b5a3c"} 
                  strokeWidth={3}
                  name={metricConfigs[selectedMetric as keyof typeof metricConfigs]?.name}
                  dot={{ fill: metricConfigs[selectedMetric as keyof typeof metricConfigs]?.color, strokeWidth: 2, r: 5 }}
                />
              )}
              
              {/* Reference lines for optimal ranges */}
              {selectedMetric !== "weight" && selectedMetric !== "all" && (
                <ReferenceLine y={7} stroke="#22c55e" strokeDasharray="5 5" label="Target Range" />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">🎯 Greatest Improvement</h4>
            <p className="text-sm text-green-800">
              Digestion quality improved by 200% over the treatment period, showing excellent response to the Ayurvedic diet plan.
            </p>
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">📈 Overall Progress</h4>
            <p className="text-sm text-blue-800">
              Overall wellness score increased from 4.2/10 to 8.6/10, representing a 105% improvement in health outcomes.
            </p>
          </div>
          
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <h4 className="font-medium text-orange-900 mb-2">🎉 Recent Achievement</h4>
            <p className="text-sm text-orange-800">
              Patient successfully achieved target weight and maintained it for 2 weeks while improving energy levels.
            </p>
          </div>
        </div>

        {/* Treatment Milestones */}
        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">Treatment Milestones</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">Oct 2023:</span>
              <span>Initial consultation and constitution assessment</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-muted-foreground">Nov 2023:</span>
              <span>Customized diet plan implementation, digestive improvement noted</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-muted-foreground">Dec 2023:</span>
              <span>Lifestyle modifications added, sleep quality enhancement</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-muted-foreground">Jan 2024:</span>
              <span>Target weight achieved, overall wellness optimized</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}