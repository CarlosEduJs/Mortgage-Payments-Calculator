import IconCalculator from "../../../assets/images/icon-calculator.svg"

export const CalculateBtn = ({action}) => {
    return(
        <button onClick={action} className="bg-primary-lime rounded-full py-3 px-3 flex items-center justify-center gap-3 sm:max-w-[250px] transition-all hover:brightness-110">
            <img src={IconCalculator} alt="icon-calculator" className="w-5" />
            <h1 className="text-neutral-slate-900 font-bold text-sm">Calculate Repayments</h1>
        </button>
    )
}