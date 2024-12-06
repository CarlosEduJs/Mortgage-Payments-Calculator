import { createContext, useState, useContext } from "react";

const MortgageContext = createContext();

export const useMortgage = () => useContext(MortgageContext);

export const MortgageProvider = ({ children }) => {
  const [mortgageAmount, setMortgageAmount] = useState("");
  const [mortgageTerm, setMortgageTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [mortgageType, setMortgageType] = useState(null);
  const [monthlyPaymentFinal, setMonthlyPaymentFinal] = useState("");
  const [totalYouIRepayOverTheTerm, setTotalYouIRepayOverTheTerm] = useState("")

  const [empty, setEmpty] = useState(true);

  const cleanValue = (value) => {
    return parseFloat(value.replace(/[^0-9.]/g, ""));
  };

  const calculateMonthlyPayment = () => {
    const principal = cleanValue(mortgageAmount);
    const termInMonth = cleanValue(mortgageTerm) * 12;
    const monthlyRate = cleanValue(interestRate) / 100 / 12;
    

    if (mortgageType === "repayment") {
      const monthlyPayment =
        (principal * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -termInMonth));
      setEmpty(false);

      const totalWhenPaid = monthlyPayment.toFixed(2) * termInMonth;

      setTotalYouIRepayOverTheTerm(totalWhenPaid.toFixed(2))

      setMonthlyPaymentFinal(monthlyPayment.toFixed(2));

      return monthlyPayment.toFixed(2);
    } else if (mortgageType === "interestOnly") {
      const interestOnlyPayment = principal * monthlyRate;
      setEmpty(false);
      const totalWhenPaid = interestOnlyPayment.toFixed(2) * termInMonth;

      setTotalYouIRepayOverTheTerm(totalWhenPaid.toFixed(2))
      setMonthlyPaymentFinal(interestOnlyPayment.toFixed(2));

      return interestOnlyPayment.toFixed(2);
    }

    return 0;
  };

  return (
    <MortgageContext.Provider
      value={{
        mortgageAmount,
        setMortgageAmount,
        mortgageTerm,
        setMortgageTerm,
        mortgageType,
        setMortgageType,
        interestRate,
        setInterestRate,
        setEmpty,
        empty,
        calculateMonthlyPayment,
        monthlyPaymentFinal,
        totalYouIRepayOverTheTerm
      }}
    >
      {children}
    </MortgageContext.Provider>
  );
};
