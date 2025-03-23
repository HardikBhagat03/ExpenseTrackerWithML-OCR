import React, { useState } from "react";
import styled from "styled-components";

function Split() {
  const [amount, setAmount] = useState("");
  const [persons, setPersons] = useState("");
  const [result, setResult] = useState(null);

  // Function to handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Parse input values to numbers
    const amountValue = parseFloat(amount);
    const personsValue = parseInt(persons);

    // Check if inputs are valid
    if (isNaN(amountValue) || isNaN(personsValue) || personsValue <= 0) {
      alert("Please enter valid numbers for amount and persons.");
      return;
    }

    // Calculate the split amount
    const splitAmount = amountValue / personsValue;
    setResult(splitAmount.toFixed(2)); // Set result to two decimal places
  };

  return (
    <Splitstyled>
    
      <div className="input-control">
      <br />
    <br />
    <br />
      <h2>Split Among Your Friends</h2>
      {/* Form to collect input */}
      <form onSubmit={handleSubmit}>
        <label>
          Amount:
          <input
            type="text"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)} // Update state on input change
          />
          <br />
          <br />
          Persons:
          <input
            type="text"
            name="persons"
            value={persons}
            onChange={(e) => setPersons(e.target.value)} // Update state on input change
          />
        </label>
        <br /><br />
        <div className="submit-btn">
        <input className="submit-btn" type="submit" value="Submit" />
        </div>
      </form>

      {/* Display the result */}
      {result && (
        <div>
            <br />
          <h3>Each person should pay: ₹{result}</h3>
        </div>
      )}
    </div>
    </Splitstyled>
  );
}

const Splitstyled=styled.div`
    display: flex;
    justify-content:center;
    flex-direction: center;
    gap: 2rem;
    label{
    color: red;
    }
    input, textarea, select{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: Green;
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control{
        input{
            width: 100%;
        }
    }

    .selects{
        display: flex;
        justify-content: flex;
        select{
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    .submit-btn{
            box-radius: 20px;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: rgba(34, 34, 96, .6));
            }
        
    }
`

export default Split;
