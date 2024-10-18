"use client"; // Make this a client component
import React, { useState } from 'react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const steps = [
  { title: "Personal Information" },
  { title: "Loan Details" },
  { title: "Additional Information" },
];

const LoanApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    loanAmount: '',
    loanPurpose: '',
    employmentStatus: '',
    income: '',
    additionalNotes: '',
  });
  const [currentStep, setCurrentStep] = useState(0);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    // Validate required fields before moving to the next step
    if (currentStep === 0) {
      if (!formData.name || !formData.email || !formData.phone) {
        alert("Please fill all required fields in Personal Information.");
        return;
      }
    } else if (currentStep === 1) {
      if (!formData.loanAmount || !formData.loanPurpose || !formData.employmentStatus) {
        alert("Please fill all required fields in Loan Details.");
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.income) {
        alert("Please fill the Monthly Income field.");
        return;
      }
    }
    
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Application Submitted!'); // Replace with your own submission logic
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
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-white">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
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
                value={formData.email}
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
                value={formData.phone}
                onChange={handleChange}
                required
                className="mt-2 block w-full rounded-md border-gray-300 bg-black text-white focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </>
        )}
        {currentStep === 1 && (
          <>
            <div>
              <Label htmlFor="loanAmount" className="block text-sm font-medium text-white">Loan Amount</Label>
              <Input
                id="loanAmount"
                name="loanAmount"
                type="number"
                placeholder="Enter loan amount"
                value={formData.loanAmount}
                onChange={handleChange}
                required
                className="mt-2 block w-full rounded-md border-gray-300 bg-black text-white focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="loanPurpose" className="block text-sm font-medium text-white">Purpose of Loan</Label>
              <select
                id="loanPurpose"
                name="loanPurpose"
                value={formData.loanPurpose}
                onChange={(e) => handleSelectChange('loanPurpose', e.target.value)}
                required
                className="mt-2 block w-full rounded-md border-gray-300 bg-black text-white focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select purpose</option>
                <option value="personal">Personal Use</option>
                <option value="business">Business</option>
                <option value="education">Education</option>
                <option value="home_improvement">Home Improvement</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <Label htmlFor="employmentStatus" className="block text-sm font-medium text-white">Employment Status</Label>
              <select
                id="employmentStatus"
                name="employmentStatus"
                value={formData.employmentStatus}
                onChange={(e) => handleSelectChange('employmentStatus', e.target.value)}
                required
                className="mt-2 block w-full rounded-md border-gray-300 bg-black text-white focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select status</option>
                <option value="employed">Employed</option>
                <option value="unemployed">Unemployed</option>
                <option value="self-employed">Self-Employed</option>
                <option value="retired">Retired</option>
              </select>
            </div>
          </>
        )}
        {currentStep === 2 && (
          <>
            <div>
              <Label htmlFor="income" className="block text-sm font-medium text-white">Monthly Income</Label>
              <Input
                id="income"
                name="income"
                type="number"
                placeholder="Enter your monthly income"
                value={formData.income}
                onChange={handleChange}
                required
                className="mt-2 block w-full rounded-md border-gray-300 bg-black text-white focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="additionalNotes" className="block text-sm font-medium text-white">Additional Notes</Label>
              <Textarea
                id="additionalNotes"
                name="additionalNotes"
                placeholder="Any additional information"
                value={formData.additionalNotes}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-300 bg-black text-white focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </>
        )}
        <div className="flex justify-between">
          {currentStep > 0 && (
            <Button type="button" onClick={handlePrevious} className="bg-gray-700 text-white hover:bg-gray-600">
              Previous
            </Button>
          )}
          {currentStep < steps.length - 1 ? (
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
