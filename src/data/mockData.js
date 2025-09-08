export const ISSUE_CATEGORIES = {
  'Road & Traffic': {
    subcategories: ['Potholes', 'Broken Roads', 'Traffic Signals', 'Illegal Parking'],
    department: 'Public Works Department',
    priority: 'high',
    icon: '🛣️',
    color: '#ef4444'
  },
  'Public Utilities': {
    subcategories: ['Water Supply', 'Drainage', 'Sewerage', 'Power Outage'],
    department: 'Municipal Utilities',
    priority: 'critical',
    icon: '⚡',
    color: '#f97316'
  },
  'Cleanliness': {
    subcategories: ['Garbage Dumping', 'Overflowing Bins', 'Street Cleaning'],
    department: 'Sanitation Department',
    priority: 'medium',
    icon: '🗑️',
    color: '#eab308'
  },
  'Public Safety': {
    subcategories: ['Broken Streetlights', 'Vandalism', 'Unsafe Areas'],
    department: 'Municipal Security',
    priority: 'high',
    icon: '🚨',
    color: '#dc2626'
  },
  'Public Infrastructure': {
    subcategories: ['Parks Maintenance', 'Public Toilets', 'Bus Stops'],
    department: 'Infrastructure Department',
    priority: 'low',
    icon: '🏗️',
    color: '#6366f1'
  }
};

export const MOCK_ISSUES = [
  {
    id: 1,
    title: 'Large Pothole on Main Street',
    category: 'Road & Traffic',
    subcategory: 'Potholes',
    description: 'Deep pothole causing traffic issues near Metro station',
    location: 'Main Street, Sector 15, Noida',
    status: 'reported',
    coreports: 12,
    date: '2025-01-15',
    priority: 'high',
    assignedTo: null,
    coordinates: { lat: 28.5355, lng: 77.3910 }
  },
  {
    id: 2,
    title: 'Overflowing Garbage Bin',
    category: 'Cleanliness',
    subcategory: 'Overflowing Bins',
    description: 'Garbage bin overflowing for 3 days, attracting stray animals',
    location: 'Park Avenue, Sector 12, Gurgaon',
    status: 'assigned',
    coreports: 8,
    date: '2025-01-14',
    priority: 'medium',
    assignedTo: 'Raj Kumar',
    coordinates: { lat: 28.4595, lng: 77.0266 }
  },
  {
    id: 3,
    title: 'Broken Street Light',
    category: 'Public Safety',
    subcategory: 'Broken Streetlights',
    description: 'Street light not working since last week, safety concern',
    location: 'Green Park, Sector 18, Delhi',
    status: 'resolved',
    coreports: 5,
    date: '2025-01-12',
    priority: 'high',
    assignedTo: 'Amit Singh',
    coordinates: { lat: 28.5594, lng: 77.2070 }
  },
  {
    id: 4,
    title: 'Water Leakage',
    category: 'Public Utilities',
    subcategory: 'Water Supply',
    description: 'Major water leakage from pipeline causing waterlogging',
    location: 'MG Road, Sector 28, Gurgaon',
    status: 'in-progress',
    coreports: 15,
    date: '2025-01-16',
    priority: 'critical',
    assignedTo: 'Priya Sharma',
    coordinates: { lat: 28.4672, lng: 77.0291 }
  },
  {
    id: 5,
    title: 'Park Maintenance Required',
    category: 'Public Infrastructure',
    subcategory: 'Parks Maintenance',
    description: 'Broken swings and damaged benches in children park',
    location: 'City Park, Sector 22, Noida',
    status: 'reported',
    coreports: 3,
    date: '2025-01-13',
    priority: 'low',
    assignedTo: null,
    coordinates: { lat: 28.5672, lng: 77.3567 }
  }
];

export const MOCK_WORKERS = [
  { id: 1, name: 'Raj Kumar', department: 'Sanitation Department', tasksAssigned: 3, tasksCompleted: 12, rating: 4.8, status: 'active' },
  { id: 2, name: 'Amit Singh', department: 'Municipal Security', tasksAssigned: 2, tasksCompleted: 8, rating: 4.6, status: 'active' },
  { id: 3, name: 'Priya Sharma', department: 'Municipal Utilities', tasksAssigned: 4, tasksCompleted: 15, rating: 4.9, status: 'busy' },
  { id: 4, name: 'Suresh Gupta', department: 'Public Works Department', tasksAssigned: 1, tasksCompleted: 6, rating: 4.5, status: 'active' },
];

// Analytics data
export const issuesByCategory = Object.entries(ISSUE_CATEGORIES).map(([category, info]) => ({
  name: category.split(' ')[0],
  value: MOCK_ISSUES.filter(issue => issue.category === category).length,
  color: info.color
}));

export const issuesByStatus = [
  { name: 'Reported', value: MOCK_ISSUES.filter(i => i.status === 'reported').length, color: '#fbbf24' },
  { name: 'Assigned', value: MOCK_ISSUES.filter(i => i.status === 'assigned').length, color: '#60a5fa' },
  { name: 'In Progress', value: MOCK_ISSUES.filter(i => i.status === 'in-progress').length, color: '#34d399' },
  { name: 'Resolved', value: MOCK_ISSUES.filter(i => i.status === 'resolved').length, color: '#10b981' }
];

export const weeklyData = [
  { day: 'Mon', reported: 12, resolved: 8 },
  { day: 'Tue', reported: 19, resolved: 12 },
  { day: 'Wed', reported: 15, resolved: 18 },
  { day: 'Thu', reported: 22, resolved: 15 },
  { day: 'Fri', reported: 18, resolved: 20 },
  { day: 'Sat', reported: 8, resolved: 14 },
  { day: 'Sun', reported: 5, resolved: 10 }
];
