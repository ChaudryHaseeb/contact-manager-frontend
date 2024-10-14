import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import ApiService from '../config/service/apiConfig';
import { useState, useEffect } from 'react';

export default function DesktopMobileChart() {
  const [chartData, setChartData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { allUsers } = await ApiService.getUsers();
        
        const totalUsernames = allUsers.reduce((acc, user) => acc + (user.username ? 1 : 0), 0);
        const totalEmails = allUsers.reduce((acc, user) => acc + (user.email ? 1 : 0), 0);

        const dataForChart = [
          { name: 'Usernames', count: totalUsernames },
          { name: 'Emails', count: totalEmails },
        ];

        setChartData(dataForChart);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <Card className="w-full h-full shadow-md rounded-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">Usernames & Emails</CardTitle>
        <CardDescription className="text-sm text-gray-500">Comparison of users with usernames and emails.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
              <Tooltip contentStyle={{ backgroundColor: '#f3f4f6', borderColor: '#d1d5db' }} cursor={{ fill: 'rgba(156, 163, 175, 0.1)' }} />
              <Bar dataKey="count" fill="url(#dataGradient)" radius={[4, 4, 0, 0]} />
              <defs>
                <linearGradient id="dataGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0.6} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
