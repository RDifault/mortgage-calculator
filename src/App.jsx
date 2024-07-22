/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import calc from "./Calc";
import iconCalculator from "./assets/icon-calculator.svg";

function App() {
  const [error, setError] = useState({
    amount: null,
    term: null,
    rate: null,
    type: null,
  });
  const [result, setResult] = useState(null);
  const [values, setValues] = useState({
    amount: null,
    term: null,
    rate: null,
    type: null,
  });

  const handleClear = () => {

    if(values.type == 0) {
      setValues({
        amount: "",
        term: "",
        rate: "",
        type: "0",
      });
    } else {
      setValues({
        amount: "",
        term: "",
        rate: "",
        type: "1",
      });
    }
    
    setError({
      amount: null,
      term: null,
      rate: null,
      type: null,
    });
    setResult(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (value === "") {
      setValues({
        ...values,
        [name]: "",
      });
      setError({
        ...error,
        [name]: "This field is required",
      });
      return;
    }

    //For Amount
    if (name === "amount") {
      const rawValue = value.replace(/[^0-9.]/g, "");
      const formattedValue = Number(rawValue).toLocaleString("en-GB", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
      setValues({
        ...values,
        [name]: formattedValue,
      });
      setError({
        ...error,
        [name]: null,
      });
      console.log(values);
    } else {
      //For Interest Rate and Mortgage Term
      const regex = /^[0-9]*\.?[0-9]*$/;
      if (regex.test(value)) {
        const rawValue = value.replace(/[^\d.]/g, "");
        setValues({
          ...values,
          [name]: rawValue,
        });
        setError({
          ...error,
          [name]: null,
        });
        console.log(values);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let valid = true;
    let newErrors = {};

    // Field Validation
    if (values.amount == undefined || values.amount == "") {
      newErrors.amount = "This field is required";
      valid = false;
    }
    if (values.term == undefined || values.term == "") {
      newErrors.term = "This field is required";
      valid = false;
    }
    if (values.rate == undefined || values.rate == "") {
      newErrors.rate = "This field is required";
      valid = false;
    }
    if (values.type == undefined || values.type == "") {
      newErrors.type = "This field is required";
      valid = false;
    }

    if (!valid) {
      setError(newErrors);
      return;
    }

    setError({});

    console.log("error" + error.type);

    const rawAmount = values.amount.replace(/,/g, "");
    const rawTerm = values.term.replace(/,/g, "");
    const rawRate = values.rate.replace(/,/g, "");
    setResult(calc(rawAmount, rawTerm, rawRate, values.type));
  };

  function noResult() {
    return (
      <div className=" bg-cslate-900 mx-auto items-center justify-center flex flex-col h-[calc(100vh-350px)] md:h-auto md:w-[400px] md:rounded-xl md:rounded-tl-none md:rounded-bl-[3rem] ">
        <img
          src="./src/assets/illustration-empty.svg"
          alt=""
          className="w-[150px] h-[150px]"
        />
        <p className=" text-md font-bold text-white mt-2">
          Results are shown here
        </p>
        <p className="text-xs text-center text-cslate-300 mx-4 mt-2">
          Complete the form and click "Calculate Repayments" to see what your
          monthly repayments would be.
        </p>
      </div>
    );
  }

  function showResult() {
    return (
      <div className=" bg-cslate-900 px-8 py-4 flex flex-col h-[55vh] md:h-auto md:w-[400px] md:rounded-xl md:rounded-tl-none md:rounded-bl-[3rem] ">
        <p className=" text-md font-bold text-white mt-2">Your Results</p>
        <p className="text-xs font-medium text-cslate-300 mt-2">
          Your results are shown below based on the information you provided. To
          adjust the results, edit the form and click "Calculate Repayments"
          again.
        </p>
        <div className="mt-8 flex flex-col align-center bg-[#0E2431] rounded-md border-t-2 border-clime">
          <div className="text-xs text-cslate-300 font-medium mx-6 mt-4 mb-3">
            Your monthly repayments
          </div>
          <div className="mx-6 text-5xl font-bold text-clime border-b-[2px] border-cslate-900 pb-4">
            £{result[0]}
          </div>
          <div className="text-xs text-cslate-300 font-medium mx-6 mt-4 mb-2">
            Total you'll repay over the term
          </div>
          <div className="mx-6 text-xl font-bold text-white mb-4">
            £{result[1]}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className=" bg-white rounded-xl w-[100vw] h-[100vh] md:flex md:w-[800px] md:h-fit justify-center">
        <div className="mx-4 md:m-4">
          <div className="justify-between items-center py-4 md:py-0 md:pb-8 md:flex">
            <p className="text-xl text-cslate-900 font-bold">
              Mortgage Calculator
            </p>
            <p onClick={handleClear} className="text-sm text-cslate-700 underline hover:text-slate-700 cursor-pointer pt-2 md:pt-0">
              Clear All
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="md:max-w-sm mx-auto flex flex-col"
          >
            <label className="block mb-2 text-sm font-medium text-slate-500 text-left">
              Mortgage Amount
            </label>
            <div className="flex flex-row-reverse">
              <input
                type="text"
                id="amount"
                name="amount"
                value={values.amount}
                onChange={handleChange}
                inputMode="decimal"
                className={
                  error.amount
                    ? "cursor-pointer peer rounded-none rounded-e-md border-l-0 bg-white border border-cred font-bold text-cslate-900 hover:border-cslate-900 focus:outline-none focus:ring-[#d7da2f] focus:border-[#d7da2f] block flex-1 min-w-0 w-full text-sm p-2.5"
                    : "cursor-pointer peer rounded-none rounded-e-md border-l-0 bg-white border border-cslate-500 font-bold text-cslate-900 hover:border-cslate-900 focus:outline-none focus:ring-[#d7da2f] focus:border-[#d7da2f] block flex-1 min-w-0 w-full text-sm p-2.5"
                }
              />
              <span
                className={
                  error.amount
                    ? "inline-flex items-center px-3 text-sm font-bold text-white bg-cred border border-e-0 border-r-0 border-cred rounded-s-md peer-hover:border-cslate-900 peer-focus:border-[#d7da2f] peer-focus:bg-[#d7da2f] peer-focus:text-cslate-900"
                    : "inline-flex items-center px-3 text-sm font-bold text-cslate-700 bg-cslate-100 border border-e-0 border-r-0 border-cslate-500 rounded-s-md peer-hover:border-cslate-900 peer-focus:border-[#d7da2f] peer-focus:bg-[#d7da2f] peer-focus:text-cslate-900"
                }
              >
                £
              </span>
            </div>
            {error.amount && <p className="text-red-500">{error.amount}</p>}

            <div className="flex pt-4">
              <div className="pr-4 w-full">
                <label className="block mb-2 text-sm font-medium text-slate-500 text-left">
                  Mortgage Term
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="term"
                    name="term"
                    value={values.term}
                    onChange={handleChange}
                    inputMode="decimal"
                    className={
                      error.term
                        ? "cursor-pointer peer rounded-none rounded-s-md border-r-0 bg-white border border-cred font-bold text-cslate-900 hover:border-cslate-900 focus:outline-none focus:ring-[#d7da2f] focus:border-[#d7da2f] block flex-1 min-w-0 w-full text-sm p-2.5"
                        : "cursor-pointer peer rounded-none rounded-s-md border-r-0 bg-white border border-cslate-500 font-bold text-cslate-900 hover:border-cslate-900 focus:outline-none focus:ring-[#d7da2f] focus:border-[#d7da2f] block flex-1 min-w-0 w-full text-sm p-2.5"
                    }
                  />
                  <span
                    className={
                      error.term
                        ? "inline-flex items-center px-3 text-sm font-bold text-white bg-cred border border-s-0 border-l-0 border-cred rounded-e-md peer-hover:border-cslate-900  peer-focus:border-[#d7da2f] peer-focus:bg-[#d7da2f] peer-focus:text-cslate-900"
                        : "inline-flex items-center px-3 text-sm font-bold text-cslate-700 bg-cslate-100 border border-s-0 border-l-0 border-cslate-500 rounded-e-md peer-hover:border-cslate-900  peer-focus:border-[#d7da2f] peer-focus:bg-[#d7da2f] peer-focus:text-cslate-900"
                    }
                  >
                    years
                  </span>
                </div>
                {error.term && <p className="text-red-500">{error.term}</p>}
              </div>

              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-slate-500 text-left">
                  Interest Rate
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="rate"
                    name="rate"
                    value={values.rate}
                    onChange={handleChange}
                    inputMode="decimal"
                    className={
                      error.rate
                        ? "cursor-pointer peer rounded-none rounded-s-md border-r-0 bg-white border border-cred font-bold text-cslate-900 hover:border-cslate-900 focus:outline-none focus:ring-[#d7da2f] focus:border-[#d7da2f] block flex-1 min-w-0 w-full text-sm p-2.5"
                        : "cursor-pointer peer rounded-none rounded-s-md border-r-0 bg-white border border-cslate-500 font-bold text-cslate-900 hover:border-cslate-900 focus:outline-none focus:ring-[#d7da2f] focus:border-[#d7da2f] block flex-1 min-w-0 w-full text-sm p-2.5"
                    }
                  />
                  <span
                    className={
                      error.rate
                        ? "inline-flex items-center px-3 text-sm font-bold text-white bg-cred border border-s-0 border-l-0 border-cred rounded-e-md peer-hover:border-cslate-900  peer-focus:border-[#d7da2f] peer-focus:bg-[#d7da2f] peer-focus:text-cslate-900"
                        : "inline-flex items-center px-3 text-sm font-bold text-cslate-700 bg-cslate-100 border border-s-0 border-l-0 border-cslate-500 rounded-e-md peer-hover:border-cslate-900  peer-focus:border-[#d7da2f] peer-focus:bg-[#d7da2f] peer-focus:text-cslate-900"
                    }
                  >
                    %
                  </span>
                </div>
                {error.rate && <p className="text-red-500">{error.rate}</p>}
              </div>
            </div>

            <label className="block mb-2 text-sm font-medium text-slate-500 text-left pt-4">
              Mortgage Type
            </label>
            <label className="cursor-pointer p-2 flex items-center font-bold text-cslate-900 text-sm mb-2 rounded-md bg-white border border-cslate-500 hover:border-clime has-[:checked]:border-clime has-[:checked]:bg-clime has-[:checked]:bg-opacity-20">
              <input
                id="mortgage-type-1"
                type="radio"
                name="type"
                value="0"
                onChange={handleChange}
                className="cursor-pointer w-4 h-4 border-cslate-300 focus:outline-none accent-clime mr-2 checked:bg-clime"
              />
              Repayment
            </label>

            <label className="cursor-pointer p-2 flex items-center font-bold text-cslate-900 text-sm mb-2 rounded-md bg-white border border-cslate-500 hover:border-clime has-[:checked]:border-clime has-[:checked]:bg-clime has-[:checked]:bg-opacity-20">
              <input
                id="mortgage-type-2"
                type="radio"
                name="type"
                value="1"
                onChange={handleChange}
                className="cursor-pointer w-4 h-4 border-cslate-300 focus:outline-none accent-clime mr-2 checked:bg-clime"
              />
              Interest Only
            </label>
            {error.type && <p className="text-red-500">{error.type}</p>}

            <button
              type="submit"
              className="text-cslate-900 font-bold mt-2 mb-8 md:mb-0 md:max-w-[250px]"
            >
              <div className="flex items-center justify-center">
                <img
                  src={iconCalculator}
                  alt=""
                  className="mr-2"
                />
                <p className="text-sm">Calculate Repayments</p>
              </div>
            </button>
          </form>
        </div>
        {/* h-[calc(100vh-469px)] */}
        {result ? showResult() : noResult()}
      </div>
    </>
  );
}

export default App;
