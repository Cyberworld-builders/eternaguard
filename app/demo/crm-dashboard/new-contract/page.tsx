"use client";

import { useState } from "react";
import Link from "next/link";

export default function NewContractPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Deceased Information
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    dateOfDeath: "",
    ssn: "",
    
    // Contact Information
    nextOfKinName: "",
    relationship: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    
    // Service Selection
    serviceType: "",
    plotLocation: "",
    markerType: "",
    ceremonyDate: "",
    
    // Payment
    paymentAmount: 0
  });

  const totalSteps = 4;

  const servicePackages = [
    { id: "traditional", name: "Traditional Burial", price: 8500, description: "Includes burial plot, marker, and ceremony" },
    { id: "cremation", name: "Cremation Memorial", price: 4500, description: "Cremation with memorial plot and marker" },
    { id: "preplanning", name: "Pre-Planning Package", price: 6500, description: "Advance planning with reserved plot" },
    { id: "full-service", name: "Full Service Package", price: 12500, description: "Complete care including all services" }
  ];

  const plotLocations = [
    { id: "garden-a", name: "Garden of Peace - Section A", available: 45 },
    { id: "garden-b", name: "Garden of Peace - Section B", available: 32 },
    { id: "memorial-grove", name: "Memorial Grove", available: 18 },
    { id: "veterans-section", name: "Veterans Memorial Section", available: 27 },
    { id: "family-estate", name: "Family Estate Area", available: 12 }
  ];

  const markerTypes = [
    { id: "flat", name: "Flat Marker", price: 800 },
    { id: "upright", name: "Upright Monument", price: 2500 },
    { id: "bench", name: "Memorial Bench", price: 3500 },
    { id: "custom", name: "Custom Design", price: 5000 }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // In a real app, this would submit to your backend
    alert("Contract submitted successfully! Payment processing would be handled by Stripe.");
  };

  const calculateTotal = () => {
    const service = servicePackages.find(s => s.id === formData.serviceType);
    const marker = markerTypes.find(m => m.id === formData.markerType);
    return (service?.price || 0) + (marker?.price || 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/demo/crm-dashboard" className="flex items-center space-x-3">
              <img 
                src="/images/eternaguard-logo-wide.png" 
                alt="EternaGuard - Secure. Maintain. Innovate." 
                className="h-12 w-auto"
              />
              <span className="text-xl font-bold text-slate-600">| New Contract</span>
            </Link>
            <Link
              href="/demo/crm-dashboard"
              className="text-slate-600 hover:text-emerald-600 transition-colors"
            >
              ← Back to CRM
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step <= currentStep ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"
                } font-semibold`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    step < currentStep ? "bg-emerald-600" : "bg-slate-200"
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-slate-600">
            <span>Deceased Info</span>
            <span>Services</span>
            <span>Location</span>
            <span>Payment</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
          {/* Step 1: Deceased Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Deceased Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Middle Name</label>
                  <input
                    type="text"
                    value={formData.middleName}
                    onChange={(e) => handleInputChange("middleName", e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Date of Birth *</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Date of Death *</label>
                  <input
                    type="date"
                    value={formData.dateOfDeath}
                    onChange={(e) => handleInputChange("dateOfDeath", e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Social Security Number</label>
                <input
                  type="text"
                  value={formData.ssn}
                  onChange={(e) => handleInputChange("ssn", e.target.value)}
                  placeholder="XXX-XX-XXXX"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <hr className="my-6" />

              <h3 className="text-xl font-bold text-slate-900 mb-4">Next of Kin / Contact</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.nextOfKinName}
                    onChange={(e) => handleInputChange("nextOfKinName", e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Relationship *</label>
                  <select
                    value={formData.relationship}
                    onChange={(e) => handleInputChange("relationship", e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="spouse">Spouse</option>
                    <option value="child">Child</option>
                    <option value="parent">Parent</option>
                    <option value="sibling">Sibling</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Street Address *</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">State *</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">ZIP Code *</label>
                  <input
                    type="text"
                    value={formData.zip}
                    onChange={(e) => handleInputChange("zip", e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Service Selection */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Select Service Package</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {servicePackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => handleInputChange("serviceType", pkg.id)}
                    className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.serviceType === pkg.id
                        ? "border-emerald-600 bg-emerald-50"
                        : "border-slate-200 hover:border-emerald-300"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-slate-900">{pkg.name}</h3>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        formData.serviceType === pkg.id
                          ? "border-emerald-600 bg-emerald-600"
                          : "border-slate-300"
                      }`}>
                        {formData.serviceType === pkg.id && (
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm mb-3">{pkg.description}</p>
                    <p className="text-2xl font-bold text-emerald-600">${pkg.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Marker Type</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {markerTypes.map((marker) => (
                  <div
                    key={marker.id}
                    onClick={() => handleInputChange("markerType", marker.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.markerType === marker.id
                        ? "border-emerald-600 bg-emerald-50"
                        : "border-slate-200 hover:border-emerald-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-slate-900">{marker.name}</h4>
                        <p className="text-sm text-emerald-600 font-bold">+${marker.price.toLocaleString()}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData.markerType === marker.id
                          ? "border-emerald-600 bg-emerald-600"
                          : "border-slate-300"
                      }`}>
                        {formData.markerType === marker.id && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Plot Location & Ceremony */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Select Plot Location</h2>
              
              <div className="space-y-3">
                {plotLocations.map((plot) => (
                  <div
                    key={plot.id}
                    onClick={() => handleInputChange("plotLocation", plot.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.plotLocation === plot.id
                        ? "border-emerald-600 bg-emerald-50"
                        : "border-slate-200 hover:border-emerald-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900">{plot.name}</h3>
                        <p className="text-sm text-slate-600">{plot.available} plots available</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        formData.plotLocation === plot.id
                          ? "border-emerald-600 bg-emerald-600"
                          : "border-slate-300"
                      }`}>
                        {formData.plotLocation === plot.id && (
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Ceremony Date</h3>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Ceremony Date</label>
                <input
                  type="date"
                  value={formData.ceremonyDate}
                  onChange={(e) => handleInputChange("ceremonyDate", e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <p className="text-sm text-slate-500 mt-2">Our team will confirm availability and coordinate all details</p>
              </div>
            </div>
          )}

          {/* Step 4: Payment Summary & Stripe Checkout */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Payment & Contract Summary</h2>
              
              {/* Summary */}
              <div className="bg-slate-50 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">Service Package:</span>
                  <span className="font-semibold text-slate-900">
                    {servicePackages.find(s => s.id === formData.serviceType)?.name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">Base Price:</span>
                  <span className="font-semibold text-slate-900">
                    ${servicePackages.find(s => s.id === formData.serviceType)?.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">Marker Type:</span>
                  <span className="font-semibold text-slate-900">
                    {markerTypes.find(m => m.id === formData.markerType)?.name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">Marker Price:</span>
                  <span className="font-semibold text-slate-900">
                    ${markerTypes.find(m => m.id === formData.markerType)?.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">Plot Location:</span>
                  <span className="font-semibold text-slate-900">
                    {plotLocations.find(p => p.id === formData.plotLocation)?.name}
                  </span>
                </div>
                <hr className="border-slate-300" />
                <div className="flex justify-between items-center text-lg">
                  <span className="font-bold text-slate-900">Total Amount:</span>
                  <span className="font-bold text-emerald-600 text-2xl">
                    ${calculateTotal().toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Stripe Checkout Simulation */}
              <div className="border-2 border-slate-300 rounded-lg p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Secure Payment via Stripe
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">CVC</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                    <p className="text-sm text-blue-900">
                      <strong>Demo Mode:</strong> This is a demonstration. In production, payment would be securely processed through Stripe&apos;s API.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Options */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-900 mb-2">Payment Options Available:</h4>
                <ul className="text-sm text-emerald-800 space-y-1">
                  <li>• Full payment today</li>
                  <li>• Payment plan (12-24 months available)</li>
                  <li>• Pre-need payment arrangements</li>
                </ul>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-semibold ${
                currentStep === 1
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              Back
            </button>
            
            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-gradient-to-r from-slate-700 to-emerald-600 text-white rounded-lg font-semibold hover:from-slate-800 hover:to-emerald-700 transition-all"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg"
              >
                Complete Contract & Pay
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

