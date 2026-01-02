import { Check } from "lucide-react";

export default function CheckoutSteps({ currentStep = 1 }) {
  const steps = [
    { id: 1, name: "Cart" },
    { id: 2, name: "Shipping" },
    { id: 3, name: "Payment" },
    { id: 4, name: "Complete" }
  ];

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full py-6 bg-white border-b">
      <div className="max-w-6xl mx-auto px-6">
        {/* Progress Bar */}
        <div className="relative mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-black h-2 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Step Circles */}
          <div className="flex justify-between absolute -top-3 w-full">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    step.id < currentStep
                      ? "bg-green-500 text-white"
                      : step.id === currentStep
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step.id < currentStep ? (
                    <Check size={16} />
                  ) : (
                    step.id
                  )}
                </div>
                <span className={`mt-3 text-sm font-medium ${
                  step.id <= currentStep ? "text-black" : "text-gray-400"
                }`}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}