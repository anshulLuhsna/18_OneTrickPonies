"use client"; // Make this a client component
import React, { useState } from 'react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import PersonalLoan from './PersonalLoan';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';
import { createClient } from '@/utils/supabase/client';



const steps = [
  { title: "Personal Information" },
  { title: "Loan Type" }, // New step for loan type selection
  { title: "Loan Details" },
  { title: "Additional Information" },
];

const LoanApplicationForm = () => {
  const supabase = createClient()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loanType, setLoanType] = useState('');
  const [age, setAge] = useState('');
  const [loanAmount, setLoanAmount] = useState(0);
  const[isDefaulter, setIsDefaulter] = useState(false)
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [income, setIncome] = useState(0);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [monthsEmployed, setMonthsEmployed] = useState(0);
  const [preferredTenure, setPreferredTenure] = useState('');
  const [fixedMonthlyIncome, setFixedMontlyIncome] = useState(0);
  const [creditLines, setCreditLines] = useState(0);
  const [expenditure, setExpenditure] = useState(0);
  //Personal props
  const [creditScore, setCreditScore] = useState("");
  const [yearlyTurnOver, setYearlyTurnOver] = useState(0);
  const [showVisualization, setShowVisualization] = useState(false);
  const [results, setResults] = useState<any>(null);
  // ... other individual state variables ...

  const [currentStep, setCurrentStep] = useState(0);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'age':
        setAge(value);
        break;
      case 'loanAmount':
        setLoanAmount(parseInt(value, 10)); // Parse to number
        break;
      case 'loanPurpose':
        setLoanType(value);
        break;
      case 'employmentStatus':
        setEmploymentStatus(value);
        break;
      case 'income':
        setIncome(parseInt(value, 10)); // Parse to number
        break;
      case 'additionalNotes':
        setAdditionalNotes(value);
        break;
      case 'panNumber':
        setPanNumber(value);
        break;
      case 'monthsEmployed':
        setMonthsEmployed(parseInt(value, 10)); // Parse to number
        break;
      case 'preferredTenure':
        setPreferredTenure(value);
        break;
      default:
        break;
    }
  };

  function checkLoanEligibility(fixedMonthlyIncome: number, yearlyTurnOver: any, age: any, creditScore: number, loanAmount: any, tenureYears: any) {
    let eligible = true; // Start with eligible as true and apply conditions to modify this
    let baseInterestRate = 10.0; // Starting base interest rate
    let interestRate = baseInterestRate; // Final interest rate after applying conditions
    console.log(fixedMonthlyIncome, yearlyTurnOver, age, creditScore, loanAmount, tenureYears)
    // Priority 1: Credit Score (Highest Priority)
    if (creditScore >= 750) {
      // Excellent credit score, reduce interest rate
      interestRate -= 0.5;
    } else if (creditScore >= 600 && creditScore < 750) {
      // Good to moderate credit score, increase interest rate slightly
      interestRate += 1.0;
    } else {
      // Poor credit score, ineligible for loan
      eligible = false;
      return {
        eligible: false,
        reason: "Credit score is too low for loan approval"
      };
    }

    // Priority 2: Fixed Monthly Salary (High Priority)
    const minSalaryThreshold = 25000; // Define minimum salary required for loan
    if (fixedMonthlyIncome >= minSalaryThreshold) {
      // Higher salaries may decrease interest rates, lower salaries increase rates
      if (fixedMonthlyIncome < 30000) {
        interestRate += 1.0; // Higher risk, increase rate
      }
    }


    else {
      // Ineligible due to low salary
      eligible = false;
      return {
        eligible: false,
        reason: "Monthly salary is too low for loan approval"
      };
    }

    // Priority 3: Age (Medium Priority)
    const minAge = 21;
    const maxAge = 60; // Define age range for eligibility
    if (age < minAge || age > maxAge) {
      eligible = false;
      return {
        eligible: false,
        reason: "Age is outside the eligible range (21-60 years)"
      };
    }

    // Priority 4: Loan Amount & Tenure (Medium-Low Priority)
    const maxLoanAmount = fixedMonthlyIncome * 12 * 0.5; // Max loan amount is 50% of annual income
    // if (loanAmount > maxLoanAmount) {
    //   eligible = false;
    //   return {
    //     eligible: false,
    //     reason: `Loan amount exceeds the limit for your salary. Max loan allowed is ${maxLoanAmount}`
    //   };
    // }

    const maxTenureYears = 5; // Maximum tenure is 5 years
    if (tenureYears > maxTenureYears) {
      eligible = false;
      return {
        eligible: false,
        reason: "Requested tenure exceeds the maximum allowed tenure (5 years)"
      };
    }

    // Priority 5: Yearly Turnover (Only applicable for self-employed or business owners)
    const minTurnover = 500000; // Minimum yearly turnover required
    if (yearlyTurnOver && yearlyTurnOver < minTurnover) {
      eligible = false;
      return {
        eligible: false,
        reason: "Yearly turnover is too low for loan approval"
      };
    }

    // If all conditions are satisfied, return eligibility and interest rate range
    let minInterestRate = interestRate - 0.5; // Provide a range for interest rates
    let maxInterestRate = interestRate + 0.5;


    const DTIRatio = 0.25;
    const Education = "Bachelor's";
    const EmploymentType = "Full-time";
    const MaritalStatus = "Married";
    const HasMortgage = "Yes";
    const HasDependents = "No";
    const HasCoSigner = "No";
  
 
    // let loanType = "Home";
    // Make an API call to post the loan application data
    console.log(age, income, loanAmount, creditScore, monthsEmployed, creditLines, interestRate, preferredTenure, DTIRatio, Education, EmploymentType, MaritalStatus, HasMortgage, HasDependents, loanType, HasCoSigner)
    fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      Age: 25,
      Income: Number(fixedMonthlyIncome) ,
      LoanAmount: Number(loanAmount),
      CreditScore: creditScore,
      MonthsEmployed: monthsEmployed,
      NumCreditLines: creditLines,
      InterestRate: interestRate,
      LoanTerm: Number(preferredTenure),
      DTIRatio,
      Education,
      EmploymentType,
      MaritalStatus,
      HasMortgage,
      HasDependents,
      LoanPurpose: loanType,
      HasCoSigner
      }),
    })
      .then(response => response.json())
      .then(data => {
      console.log('Success:', data);
      setIsDefaulter(data.prediction)
      setShowVisualization(true)
      })
      .catch((error) => {
      console.error('Error:', error);
      });

    return {
      eligible: eligible,
      interestRateRange: [minInterestRate, maxInterestRate],
      message: "Loan eligibility and interest rate calculated successfully"
    };
  }



  const handleSelectChange = (name: string, value: string) => {
    switch (name) {
      case 'loanType':
        setLoanType(value);
        break;
      // ... other cases for select fields ...
      default:
        break;
    }
  };

  const handleNext = () => {
    // Validate required fields before moving to the next step


    // Move to the next step
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();


    // Call checkLoanEligibility after form submission
    const eligibilityResult = checkLoanEligibility(
      fixedMonthlyIncome,
      yearlyTurnOver,
      parseInt(age, 10), // Parse age to a number
      parseInt(creditScore, 10), // Parse creditScore to a number
      loanAmount,
      parseInt(preferredTenure, 10) // Parse preferredTenure to a number
    );

    console.log("Loan Eligibility Result:", eligibilityResult);

    // Store data in Supabase regardless of eligibility
    try {
      // Assuming you have Supabase client set up as 'supabase'
      const { data, error } = await supabase
      .from('loan_applications')
      .insert([
        {
          name,
          email,
          phone,
          loan_type: loanType,
          age: age ? parseInt(age, 10) : 0, 
          loan_amount: loanAmount ? loanAmount : 0,
          employment_status: employmentStatus,
          income: income ? income : 0, 
          additional_notes: additionalNotes,
          pan_number: panNumber,
          months_employed: monthsEmployed ? monthsEmployed : 0,
          preferred_tenure: preferredTenure ? parseInt(preferredTenure, 10) : 0, 
          fixed_monthly_income: fixedMonthlyIncome ? fixedMonthlyIncome : 0,
          credit_lines: creditLines ? creditLines : 0,
          expenditure: expenditure ? expenditure : 0,
          credit_score: creditScore ? parseInt(creditScore, 10) : 0, 
          yearly_turnover: yearlyTurnOver ? yearlyTurnOver : 0,
          is_eligible: isDefaulter,
          interest_rate_range: JSON.stringify(eligibilityResult.interestRateRange),
          rejection_reason: eligibilityResult.eligible ? null : eligibilityResult.reason, 
        },
      ]);

      if (error) {
        console.error("Error inserting data into Supabase:", error);
        // Handle the error, e.g., show an error message to the user
      } else {
        console.log("Data inserted successfully into Supabase:", data);
        // Optionally, you can redirect the user or perform other actions

        // Show appropriate message based on eligibility
        if (eligibilityResult.eligible) {
          alert('Application Submitted! You are eligible for a loan.');
        } else {
          alert(`Loan application rejected: ${eligibilityResult.reason}`);
        }
      }
    } catch (error) {
      console.error("Error during Supabase operation:", error);
      // Handle the error
    }

    setResults(eligibilityResult); // Update results state

  };
  console.log(fixedMonthlyIncome, expenditure)
  const total = fixedMonthlyIncome;

  // Create data array with percentages
  const data = [
    { name: 'Income', value: (expenditure / total) * 100 }, // This will always be 100%
    { name: 'Surplus', value: (Math.max(0, fixedMonthlyIncome - expenditure) / total) * 100 },
  ];
  console.log((fixedMonthlyIncome / total) * 100)
  const COLORS = ['#0088FE', '#00C49F'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };


  return (
    <div className="max-w-xl mx-auto my-16 p-10 bg-black border border-gray-700 rounded-2xl shadow-2xl">
      {/* Progress Line */}
      <div className="flex items-center mb-6 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-500" />
        {steps.map((_, index) => (
          <React.Fragment key={index}>
            <div
              className={`flex items-center justify-center rounded-full w-8 h-8 text-white ${
                index <= currentStep ? 'bg-blue-600' : 'bg-gray-700'
              }`}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-1 flex-grow ${
                  index < currentStep ? 'bg-blue-600' : 'bg-gray-500'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <h2 className="text-3xl font-extrabold text-white mb-6 text-center">{steps[currentStep].title}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {currentStep === 0 && (
          <>
            {/* Personal Information fields (same as before) */}
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-white">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={handleChange}
                required
                className="mt-2 block w-full rounded-md border-gray-300 bg-black text-white focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-white">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={handleChange}
                required
                className="mt-2 block w-full rounded-md border-gray-300 bg-black text-white focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="block text-sm font-medium text-white">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={handleChange}
                required
                className="mt-2 block w-full rounded-md border-gray-300 bg-black text-white focus:border-blue-500 focus:ring-blue-500"
              />
              <Label htmlFor="monthsEmployed" className="block mt-4 text-sm font-medium text-white">Months Employed</Label>
              <Input
                id="monthsEmployed"
                name="monthsEmployed"
                type="number"
                placeholder="Enter months employed"
                value={monthsEmployed}
                onChange={handleChange}
                required
                className="mt-2 block w-full rounded-md border-gray-300 bg-black text-white focus:border-blue-500 focus:ring-blue-500"
              />
              <Label htmlFor="monthsEmployed" className="block mt-4 text-sm font-medium text-white">Credit Score</Label>
              <Input
                id="monthsEmployed"
                name="monthsEmployed"
                type="number"
                placeholder="Enter months employed"
                value={creditScore}
                onChange={(e) => setCreditScore(e.target.value)}
                required
                className="mt-2 block w-full rounded-md border-gray-300 bg-black text-white focus:border-blue-500 focus:ring-blue-500"
              />
              <Label htmlFor="monthsEmployed" className="block mt-4 text-sm font-medium text-white">Credit lines</Label>
              <Input
                id="monthsEmployed"
                name="monthsEmployed"
                type="number"
                placeholder="Enter months employed"
                value={creditLines}
                onChange={(e) => setCreditLines(parseInt(e.target.value, 10))}
                required
                className="mt-2 block w-full rounded-md border-gray-300 bg-black text-white focus:border-blue-500 focus:ring-blue-500"
              />
              {/* Loan Details fields (can be customized based on loanType) */}

              <Label htmlFor="panNumber" className="block text-sm font-medium text-white">Pan Number</Label>
              <Input
                id="panNumber"
                name="panNumber"
                type="text"
                placeholder="Enter your pan number"
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value)}
                required
                className="mt-2 block w-full rounded-md border-gray-300 bg-black text-white focus:border-blue-500 focus:ring-blue-500"
              />
              <Label htmlFor="panNumber" className="block text-sm font-medium text-white">Expenditure</Label>
              <Input
                id="panNumber"
                name="panNumber"
                type="number"
                placeholder="Enter your expenditure"
                value={expenditure}
                onChange={(e) => setExpenditure(parseInt(e.target.value, 10))}
                required
                className="mt-2 block w-full rounded-md border-gray-300 bg-black text-white focus:border-blue-500 focus:ring-blue-500"
              />

            </div>
          </>
        )}
        {currentStep === 1 && (
          <>
            {/* Loan Type Selection */}
            <div>
              <Label htmlFor="loanType" className="block text-sm font-medium text-white">Loan Type</Label>
              <select
                id="loanType"
                name="loanType"
                value={loanType}
                onChange={(e) => setLoanType(e.target.value)}
                required
                className="mt-2 block w-full rounded-md border-gray-300 bg-black text-white focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select loan type</option>
                <option value="Other">Personal Loan</option>
                <option value="Home">Home Loan</option>
                <option value="Auto">Auto Loan</option>
                <option value="Education">Student Loan</option>

                {/* Add more loan types as needed */}
              </select>
            </div>
          </>
        )}
        {currentStep === 2 && (
          <>
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-white mb-2">Income vs. Expenditure</h3>
              {showVisualization && (
                <PieChart width={400} height={300}>
                  <Pie
                    data={data}
                    cx={200}
                    cy={150}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              )}

            </div>


            {/* ... other loan details fields ... */}
            {/* You can conditionally render fields here based on loanType */}
            {loanType === 'Other' && (
              <PersonalLoan
                handleChange={handleChange}

                fixedMonthlyIncome={fixedMonthlyIncome}
                setFixedMontlyIncome={setFixedMontlyIncome}
                creditScore={creditScore}

                setCreditScore={setCreditScore}

                yearlyTurnOver={yearlyTurnOver}

                setYearlyTurnOver={setYearlyTurnOver}
                preferredTenure={preferredTenure}
                setPreferredTenure={setPreferredTenure}
                loanAmount={loanAmount}
                setLoanAmount={setLoanAmount}
              />

            )}
            {loanType === 'home' && (
              <div>
                <Label htmlFor="propertyValue" className="block text-sm font-medium text-white">Property Value</Label>
                <Input
                  id="propertyValue"
                  name="propertyValue"
                  type="number"
                  placeholder="Enter property value"
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-md border-gray-300 bg-black text-white focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            )}
            {loanType === 'auto' && (
              <div>
                <Label htmlFor="vehicleMake" className="block text-sm font-medium text-white">Vehicle Make</Label>
                <Input
                  id="vehicleMake"
                  name="vehicleMake"
                  type="text"
                  placeholder="Enter vehicle make"
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-md border-gray-300 bg-black text-white focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            )}
            {/* ... other conditional fields ... */}
          </>
        )}

        <div className="flex justify-between">
          {currentStep > 0 && (
            <Button type="button" onClick={handlePrevious} className="bg-gray-700 text-white hover:bg-gray-600">
              Previous
            </Button>
          )}
          {currentStep != 2 ? (
            <Button type="button" onClick={handleNext} className="bg-blue-600 text-white hover:bg-blue-700">
              Next
            </Button>
          ) : (
            <Button type="submit" className="bg-green-600 text-white hover:bg-green-700">
              Submit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoanApplicationForm;
