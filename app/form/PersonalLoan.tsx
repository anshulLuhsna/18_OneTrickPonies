interface FormData {
  loanAmount: number;
}
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';

interface FormData {
    name: string;
    email: string;
    phone: string;
    loanType: string; // New field for loan type
    age: string; // New field for age
    loanAmount: number;
    loanPurpose: string;
    employmentStatus: string;
    income: string;
    additionalNotes: string;
    panNumber: string; // New field for PAN number
    monthsEmployed: string; // New field for months employed
    preferredTenure: string; // New field for preferred tenure
}

const PersonalLoan = ({fixedMonthlyIncome,setFixedMontlyIncome, creditScore, handleChange, setCreditScore, yearlyTurnOver, setYearlyTurnOver, loanAmount,setLoanAmount, preferredTenure, setPreferredTenure}: { fixedMonthlyIncome: any,setFixedMontlyIncome:any, handleChange: any, creditScore: any, setCreditScore: any, yearlyTurnOver: any, setYearlyTurnOver: any,loanAmount: any,setLoanAmount:any, setPreferredTenure:any, preferredTenure:any  }) => {
    console.log(creditScore)
  return (
    <>
    
              <Label htmlFor="loanAmount" className="block text-sm font-medium text-white">Fixed Monthly Income</Label>
              <Input
                id="loanAmount"
                name="loanAmount"
                type="string"
                placeholder="Enter loan amount"
                value={fixedMonthlyIncome}
                onChange={(e) => setFixedMontlyIncome(e.target.value)}
                required
                className="mt-2 block w-full rounded-md border-gray-300 bg-black text-white focus:border-blue-500 focus:ring-blue-500"
              />
               <Label htmlFor="panNumber" className="block text-sm font-medium text-white">Loan Amount</Label>
            <Input
              id="panNumber"
              name="panNumber"
              type="text" 
              placeholder="Enter your pan number"
              value={loanAmount} 
              onChange={(e) => setLoanAmount(e.target.value)}
              required
              className="mt-2 block w-full rounded-md border-gray-300 bg-black text-white focus:border-blue-500 focus:ring-blue-500"
            />
             <Label htmlFor="panNumber" className="block text-sm font-medium text-white">Preferred Tenure</Label>
            <Input
              id="panNumber"
              name="panNumber"
              type="text" 
              placeholder="Enter your pan number"
              value={preferredTenure} 
              onChange={(e) => setPreferredTenure(e.target.value)}
              required
              className="mt-2 block w-full rounded-md border-gray-300 bg-black text-white focus:border-blue-500 focus:ring-blue-500"
            />
    </>
  )
}

export default PersonalLoan