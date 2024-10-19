// employee-dashboard.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const EmployeeDashboard = () => {
  const [supabase, setSupabase] = useState<ReturnType<typeof createClient> | null>(null);

  useEffect(() => {
    const client = createClient();
    setSupabase(client);
  }, []);

  interface LoanApplication {
    id: number;
    name: string;
    email: string;
    phone: string;
    loan_type: string;
    age: number;
    loan_amount: number;
    employment_status: string;
    income: number;
    additional_notes: string;
    pan_number: string;
    months_employed: number;
    preferred_tenure: number;
    fixed_monthly_income: number;
    credit_lines: number;
    expenditure: number;
    credit_score: number;
    yearly_turnover: number;
    is_eligible: boolean;
    interest_rate_range: string;
    rejection_reason: string | null;
  }

  const [loanApplications, setLoanApplications] = useState<LoanApplication[]>([]);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [selectedPhone, setSelectedPhone] = useState<string | null>(null);
  const [selectedPAN, setSelectedPAN] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoanApplications = async () => {
      try {
        if (!supabase) {
          console.error('Supabase client is not initialized');
          return;
        }
        const { data, error } = await supabase.from('loan_applications').select('*');
        if (error) {
          console.error('Error fetching loan applications:', error);
        } else {
          setLoanApplications(data);
        }
      } catch (error) {
        console.error('Error during Supabase operation:', error);
      } finally {
        setLoading(false);
      }
    };

    if (supabase) {
      fetchLoanApplications();
    }
  }, [supabase]);

  const handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedName(event.target.value);
    setSelectedPhone(null);
    setSelectedPAN(null);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPhone(event.target.value);
    setSelectedName(null);
    setSelectedPAN(null);
  };

  const handlePANChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPAN(event.target.value);
    setSelectedName(null);
    setSelectedPhone(null);
  };

  const selectedUser = loanApplications.find(
    (app) => 
      app.name === selectedName || 
      app.phone === selectedPhone || 
      app.pan_number === selectedPAN
  );

  const prepareChartData = (field: keyof LoanApplication) => {
    return loanApplications.map((app) => ({
      name: app.name,
      value: app[field],
    }));
  };

  if (loading) {
    return <div>Loading loan applications...</div>;
  }

  return (
    <div className="space-y-6 p-4">

<table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            {/* <th className="px-4 py-2">Email</th> */}
            {/* <th className="px-4 py-2">Phone</th> */}
            <th className="px-4 py-2">Loan Type</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">Loan Amount</th>
            <th className="px-4 py-2">Employment Status</th>
            <th className="px-4 py-2">Income</th>
            {/* <th className="px-4 py-2">Additional Notes</th> */}
            {/* <th className="px-4 py-2">PAN Number</th> */}
            <th className="px-4 py-2">Months Employed</th>
            <th className="px-4 py-2">Preferred Tenure</th>
            <th className="px-4 py-2">Fixed Monthly Income</th>
            <th className="px-4 py-2">Credit Lines</th>
            <th className="px-4 py-2">Expenditure</th>
            <th className="px-4 py-2">Credit Score</th>
            <th className="px-4 py-2">Yearly Turnover</th>
            <th className="px-4 py-2">Is Eligible</th>
            <th className="px-4 py-2">Interest Rate Range</th>
            {/* <th className="px-4 py-2">Rejection Reason</th> */}
          </tr>
        </thead>
        <tbody>
          {loanApplications.map((application) => (
            <tr key={application.id}>
              <td className="border px-4 py-2">{application.id}</td>
              <td className="border px-4 py-2">{application.name}</td>
              {/* <td className="border px-4 py-2">{application.email}</td> */}
              {/* <td className="border px-4 py-2">{application.phone}</td> */}
              <td className="border px-4 py-2">{application.loan_type}</td>
              <td className="border px-4 py-2">{application.age}</td>
              <td className="border px-4 py-2">{application.loan_amount}</td>
              <td className="border px-4 py-2">{application.employment_status}</td>
              <td className="border px-4 py-2">{application.income}</td>
              {/* <td className="border px-4 py-2">{application.additional_notes}</td> */}
              {/* <td className="border px-4 py-2">{application.pan_number}</td> */}
              <td className="border px-4 py-2">{application.months_employed}</td>
              <td className="border px-4 py-2">{application.preferred_tenure}</td>
              <td className="border px-4 py-2">{application.fixed_monthly_income}</td>
              <td className="border px-4 py-2">{application.credit_lines}</td>
              <td className="border px-4 py-2">{application.expenditure}</td>
              <td className="border px-4 py-2">{application.credit_score}</td>
              <td className="border px-4 py-2">{application.yearly_turnover}</td>
              <td className="border px-4 py-2">{application.is_eligible ? 'Yes' : 'No'}</td>
              <td className="border px-4 py-2">{application.interest_rate_range}</td>
              {/* <td className="border px-4 py-2">{application.rejection_reason || '-'}</td>  */}
            </tr>
          ))}
        </tbody>
      </table>


      
      <h1 className="text-2xl font-bold mb-4">Loan Applications</h1>
      
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-xl">Filter Users</h2>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block mb-2">Select by Name:</label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={selectedName || ''}
                onChange={handleNameChange}
              >
                <option value="">Select Name</option>
                {loanApplications.map((app) => (
                  <option key={app.id} value={app.name}>
                    {app.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block mb-2">Select by Phone:</label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={selectedPhone || ''}
                onChange={handlePhoneChange}
              >
                <option value="">Select Phone</option>
                {loanApplications.map((app) => (
                  <option key={app.id} value={app.phone}>
                    {app.phone}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block mb-2">Select by PAN:</label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={selectedPAN || ''}
                onChange={handlePANChange}
              >
                <option value="">Select PAN</option>
                {loanApplications.map((app) => (
                  <option key={app.id} value={app.pan_number}>
                    {app.pan_number}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg">Loan Amount Distribution</h2>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={prepareChartData('loan_amount')}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg">Income Distribution</h2>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={prepareChartData('income')}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg">Credit Score Distribution</h2>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={prepareChartData('credit_score')}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Line type="monotone" dataKey="value" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg">Monthly Expenditure Distribution</h2>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={prepareChartData('expenditure')}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Line type="monotone" dataKey="value" stroke="#387908" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg">Preferred Loan Tenure</h2>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={prepareChartData('preferred_tenure')}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* <Card>
  <CardHeader>
    <h2 className="text-lg">Fixed Monthly Income</h2>
  </CardHeader>
  <CardBody>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={prepareChartData('fixed_monthly_income')}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          fill="#82ca9d"
        >
          {prepareChartData('fixed_monthly_income').map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index % 2 === 0 ? '#82ca9d' : '#8884d8'}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  </CardBody>
</Card> */}
</div>
</div>
);
};

export default EmployeeDashboard;
