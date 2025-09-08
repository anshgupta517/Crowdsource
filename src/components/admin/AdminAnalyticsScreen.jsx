import React from 'react';
import { TrendingUp, Clock, PieChart as PieIcon, BarChart as BarIcon, LineChart as LineIcon } from 'lucide-react';
import { 
    ResponsiveContainer, 
    PieChart, 
    Pie, 
    Cell, 
    Tooltip, 
    BarChart, 
    CartesianGrid, 
    XAxis, 
    YAxis, 
    Bar, 
    LineChart, 
    Line 
} from 'recharts';

const AdminAnalyticsScreen = ({ issuesByCategory, issuesByStatus, weeklyData }) => (
  <div className="space-y-6">
    {/* KPI Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KpiCard 
        title="Total Issues" 
        value="1,284" 
        change="+12%" 
        icon={<BarIcon className="w-6 h-6 text-blue-500" />} 
      />
      <KpiCard 
        title="Resolution Rate" 
        value="94%" 
        change="+5%"
        changeColor="text-green-600"
        icon={<TrendingUp className="w-6 h-6 text-green-500" />} 
      />
      <KpiCard 
        title="Avg. Response Time" 
        value="2.3h" 
        change="-0.5h"
        changeColor="text-green-600"
        icon={<Clock className="w-6 h-6 text-yellow-500" />} 
      />
      <KpiCard 
        title="New Reports Today" 
        value="58" 
        change="+8"
        icon={<PieIcon className="w-6 h-6 text-indigo-500" />} 
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Issues by Category */}
      <ChartCard title="Issues by Category">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={issuesByCategory}
              cx="50%"
              cy="50%"
              outerRadius={110}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {issuesByCategory.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Status Distribution */}
      <ChartCard title="Issue Status Distribution">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={issuesByStatus}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>

    {/* Weekly Trends */}
    <ChartCard title="Weekly Trends">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={weeklyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="reported" name="Reported" stroke="#ef4444" strokeWidth={2} />
          <Line type="monotone" dataKey="resolved" name="Resolved" stroke="#10b981" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  </div>
);

const KpiCard = ({ title, value, change, icon, changeColor = 'text-gray-500' }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
        <p className={`text-sm mt-1 ${changeColor}`}>{change} from last month</p>
      </div>
      <div className="bg-gray-100 p-3 rounded-full">
        {icon}
      </div>
    </div>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="font-semibold text-lg text-gray-800 mb-4 border-b pb-2">{title}</h3>
    {children}
  </div>
);


export default AdminAnalyticsScreen;