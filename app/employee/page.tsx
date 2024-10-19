// employee-dashboard.tsx
"use client"; 
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client'; 

const EmployeeDashboard = () => {
  const supabase = createClient();
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoanApplications = async () => {
      try {
        const { data, error } = await supabase
          .from('loan_applications')
          .select('*'); 

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

    fetchLoanApplications();
  }, []); 

  if (loading) {
    return <div>Loading loan applications...</div>;
  }

  return (
    <div>
      <h1>Loan Applications</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Loan Type</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">Loan Amount</th>
            <th className="px-4 py-2">Employment Status</th>
            <th className="px-4 py-2">Income</th>
            <th className="px-4 py-2">Additional Notes</th>
            <th className="px-4 py-2">PAN Number</th>
            <th className="px-4 py-2">Months Employed</th>
            <th className="px-4 py-2">Preferred Tenure</th>
            <th className="px-4 py-2">Fixed Monthly Income</th>
            <th className="px-4 py-2">Credit Lines</th>
            <th className="px-4 py-2">Expenditure</th>
            <th className="px-4 py-2">Credit Score</th>
            <th className="px-4 py-2">Yearly Turnover</th>
            <th className="px-4 py-2">Is Eligible</th>
            <th className="px-4 py-2">Interest Rate Range</th>
            <th className="px-4 py-2">Rejection Reason</th>
          </tr>
        </thead>
        <tbody>
          {loanApplications.map((application) => (
            <tr key={application.id}>
              <td className="border px-4 py-2">{application.id}</td>
              <td className="border px-4 py-2">{application.name}</td>
              <td className="border px-4 py-2">{application.email}</td>
              <td className="border px-4 py-2">{application.phone}</td>
              <td className="border px-4 py-2">{application.loan_type}</td>
              <td className="border px-4 py-2">{application.age}</td>
              <td className="border px-4 py-2">{application.loan_amount}</td>
              <td className="border px-4 py-2">{application.employment_status}</td>
              <td className="border px-4 py-2">{application.income}</td>
              <td className="border px-4 py-2">{application.additional_notes}</td>
              <td className="border px-4 py-2">{application.pan_number}</td>
              <td className="border px-4 py-2">{application.months_employed}</td>
              <td className="border px-4 py-2">{application.preferred_tenure}</td>
              <td className="border px-4 py-2">{application.fixed_monthly_income}</td>
              <td className="border px-4 py-2">{application.credit_lines}</td>
              <td className="border px-4 py-2">{application.expenditure}</td>
              <td className="border px-4 py-2">{application.credit_score}</td>
              <td className="border px-4 py-2">{application.yearly_turnover}</td>
              <td className="border px-4 py-2">{application.is_eligible ? 'Yes' : 'No'}</td>
              <td className="border px-4 py-2">{application.interest_rate_range}</td>
              <td className="border px-4 py-2">{application.rejection_reason || '-'}</td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDashboard;
