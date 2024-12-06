import IllustrationEmpty from "../assets/images/illustration-empty.svg";

import { useMortgage } from "../context/MortgageContext";

export const Results = () => {
  const { empty, monthlyPaymentFinal, totalYouIRepayOverTheTerm } =
    useMortgage();

  const formatNumber = (num) => {
    const formattedValue = new Intl.NumberFormat("en-UK", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
    }).format(num || 0);

    return formattedValue.replace("£", "");
  };

  const msg =
    'Complete the form and click "calculate repayments" to \n see what your monthly repayments would be.';

  const msg2 =
    'Your results are shown below based on the information \n you provided. To adjust the results, edit the form and \n click "calculate repayments" again.';
  return (
    <>
      {empty ? (
        <div className="flex flex-col gap-4 min-w-[400px] py-6 px-6 bg-neutral-slate-900 items-center justify-center md:rounded-bl-[5rem] rounded-r-xl">
          <img src={IllustrationEmpty} alt="empty" className="w-44" />
          <h1 className="text-2xl font-bold text-white">Results shown here</h1>
          <p className="text-sm text-center text-neutral-slate-500 font-medium whitespace-pre-line">
            {msg}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 min-w-[400px] max-md:w-full py-6 px-6 bg-neutral-slate-900 md:rounded-bl-[5rem] rounded-r-xl">
          <h1 className="text-xl font-bold text-white">You results</h1>
          <p className="text-sm text-left text-neutral-slate-500 font-medium whitespace-pre-line">
            {msg2}
          </p>
          <div className="flex flex-col gap-3 p-6 bg-gray-900 rounded-lg border-t-4 border-t-primary-lime">
            <div
              className={`flex flex-col gap-2 border-b pb-4 border-gray-700`}
            >
              <h1 className="text-sm text-left text-neutral-slate-500 font-medium">
                Your monthly repayments
              </h1>
              <span className="text-primary-lime text-4xl font-semibold">
                £{formatNumber(monthlyPaymentFinal)}
              </span>
            </div>
            <div className="flex flex-col gap-2 ">
              <h1 className="text-sm text-left text-neutral-slate-500 font-medium">
                Total you li repay over the term
              </h1>
              <span className="text-white text-xl font-semibold">
                £{formatNumber(totalYouIRepayOverTheTerm)}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
