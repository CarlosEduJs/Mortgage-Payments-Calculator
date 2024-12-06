import { useState } from "react";

import { InputField } from "./common/InputField";

import { CalculateBtn } from "./common/Buttons/CalculateBtn";

import { useMortgage } from "../context/MortgageContext";

export const Calculator = () => {
  const {
    mortgageAmount,
    setMortgageAmount,
    mortgageTerm,
    setMortgageTerm,
    interestRate,
    setInterestRate,
    mortgageType,
    setMortgageType,
    calculateMonthlyPayment,
    setEmpty
  } = useMortgage();

  const [error, setErrors] = useState({});

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const formattedValue = new Intl.NumberFormat("en-UK", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
    }).format(value || 0);
    setMortgageAmount(formattedValue.replace("£", ""));
  };

  const handleClearAll = () => {
    setInterestRate("");
    setMortgageAmount("");
    setMortgageTerm("");
    setMortgageType(null);
    setErrors({});
    setEmpty(true)
  };

  const handleSub = () => {
    let validationErrors = {};

    if (!mortgageAmount) {
      validationErrors.mortgageAmount = "Mortgage Amount is required!";
    }
    if (!mortgageTerm) {
      validationErrors.mortgageTerm = "Mortgage Term is required!";
    }
    if (!interestRate) {
      validationErrors.interestRate = "Interest Rate is required!";
    }
    if (!mortgageType) {
      validationErrors.selectedValue = "Mortgage Type is required!";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      calculateMonthlyPayment();
      
    }
  };
  return (
    <div className="flex flex-col gap-8 min-w-[400px] max-md:w-full py-6 px-6">
      <header className="flex items-center justify-between w-full">
        <h1 className="font-bold text-xl text-neutral-slate-900">
          Mortgage Calculator
        </h1>
        <span
          onClick={handleClearAll}
          className="text-xs text-gray-500 font-light underline cursor-pointer transition-all hover:text-gray-800"
        >
          Clear All
        </span>
      </header>
      <div className="flex flex-col gap-5">
        <InputField
          value={mortgageAmount}
          onChange={handleAmountChange}
          error={error.mortgageAmount}
          label={"Mortgage Amount"}
          content={"£"}
        />
        <div className="flex items-center md:justify-between max-sm:flex-col gap-2">
          <InputField
            value={mortgageTerm}
            onChange={(e) => setMortgageTerm(e.target.value)}
            error={error.mortgageTerm}
            label={"Mortgage Term"}
            content={"years"}
            reverse={true}
          />
          <InputField
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            error={error.interestRate}
            label={"Interest Rate"}
            content={"%"}
            reverse={true}
          />
        </div>
        <InputField
          label="Mortgage Type"
          isRadio={true}
          name="types mortgage"
          error={error.selectedValue}
          value={mortgageType}
          onChange={(val) => setMortgageType(val)}
          options={[
            { label: "Repayment", value: "repayment" },
            { label: "Interest Only", value: "interestOnly" },
          ]}
        />
        <CalculateBtn action={handleSub} />
      </div>
    </div>
  );
};
