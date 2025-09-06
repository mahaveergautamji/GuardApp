import type { AnalyzeRiskInput } from "@/ai/flows/ai-risk-assessment";

export const incidentDataByHour = [
  { hour: "12am", incidents: 5 },
  { hour: "3am", incidents: 2 },
  { hour: "6am", incidents: 8 },
  { hour: "9am", incidents: 15 },
  { hour: "12pm", incidents: 12 },
  { hour: "3pm", incidents: 14 },
  { hour: "6pm", incidents: 25 },
  { hour: "9pm", incidents: 30 },
];

export const recentIncidents = [
  { id: 1, type: "Theft", location: "Central Station", time: "15 mins ago" },
  { id: 2, type: "Harassment", location: "Maple Avenue", time: "1 hour ago" },
  { id: 3, type: "Overcrowding", location: "Route 12 Bus", time: "3 hours ago" },
  { id: 4, type: "Theft", location: "Downtown Metro", time: "Yesterday" },
];

export const mockAnalyzeRiskInput: AnalyzeRiskInput = {
  incidentReports: [
    { location: "Central Station", time: "9:30 PM", incidentType: "Theft", description: "Phone was stolen from a pocket." },
    { location: "Maple Avenue", time: "8:00 PM", incidentType: "Harassment", description: "Verbal harassment at bus stop." },
    { location: "Downtown Metro", time: "10:15 PM", incidentType: "Theft" },
    { location: "Central Station", time: "10:00 PM", incidentType: "Theft", description: "Wallet snatched from a bag." },
    { location: "Oak Street", time: "7:00 AM", incidentType: "Reckless Driving", description: "Bus ran a red light." },
  ],
  transitRoutes: [
    { routeName: "42A", stops: ["Uptown", "Oak Street", "Central Station", "Maple Avenue", "Downtown Metro"] },
    { routeName: "12B", stops: ["Westside", "City Park", "Central Station", "Eastside Mall"] },
  ],
};

export const routeStops = [
    "Uptown",
    "Oak Street",
    "Central Station",
    "Maple Avenue",
    "Downtown Metro",
    "Westside",
    "City Park",
    "Eastside Mall",
    "University Campus",
    "Hospital"
];
