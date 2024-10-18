// app/form/page.tsx

"use client"; // Make this a client component
import React, { useState } from 'react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const page = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    alert('Application Submitted!'); // Replace with your own submission logic
  };

  return (
    <div className="max-w-md mx-auto my-10 p-5 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-lg font-bold mb-4">Loan Application Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="loanAmount">Loan Amount</Label>
          <Input
            id="loanAmount"
            name="loanAmount"
            type="number"
            placeholder="Enter loan amount"
            value={formData.loanAmount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="loanPurpose">Purpose of Loan</Label>
          <Select
            id="loanPurpose"
            name="loanPurpose"
            value={formData.loanPurpose}
            onChange={handleChange}
            required
          >
            <option value="">Select purpose</option>
            <option value="personal">Personal Use</option>
            <option value="business">Business</option>
            <option value="education">Education</option>
            <option value="home_improvement">Home Improvement</option>
            <option value="other">Other</option>
          </Select>
        </div>
        <div className="mb-4">
          <Label htmlFor="employmentStatus">Employment Status</Label>
          <Select
            id="employmentStatus"
            name="employmentStatus"
            value={formData.employmentStatus}
            onChange={handleChange}
            required
          >
            <option value="">Select status</option>
            <option value="employed">Employed</option>
            <option value="unemployed">Unemployed</option>
            <option value="self-employed">Self-Employed</option>
            <option value="retired">Retired</option>
          </Select>
        </div>
        <div className="mb-4">
          <Label htmlFor="income">Monthly Income</Label>
          <Input
            id="income"
            name="income"
            type="number"
            placeholder="Enter your monthly income"
            value={formData.income}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="additionalNotes">Additional Notes</Label>
          <Textarea
            id="additionalNotes"
            name="additionalNotes"
            placeholder="Any additional information"
            value={formData.additionalNotes}
            onChange={handleChange}
          />
        </div>
        <Button type="submit" className="w-full">
          Submit Application
        </Button>
      </form>
    </div>
  );
};

export default page;
