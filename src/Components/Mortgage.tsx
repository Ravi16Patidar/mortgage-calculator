import React,{useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { InputAdornment, Typography } from '@mui/material';
import Button from '@mui/material/Button';


export default function SelectLabels() {
  const [loanTerm, setLoanTerm] = useState<number | null>(0);
  const [loanAmount, setLoanAmount] = useState<number | null>(0);
  const [loanInterest, setLoanInterest] = useState<number | null>(0);
  const[monthlyPayment,setMonthyPayment]=useState<number | null | String>(null);

  const handleLoanTerm = (e:any) => {
    setLoanTerm(e.target.value);
  };
 
  const handleLoanAmount = (e:any) => {
    setLoanAmount(e.target.value);
  };
 
  const handleLoanInterest = (e:any) => {
    setLoanInterest(e.target.value);
  };
  const handleCalculate = (e:any) => {
    const principal = loanAmount ?? 0; // Default to 0 if null
  const term = loanTerm ?? 0; // Default to 0 if null
  const interestRate = loanInterest ?? 0; // Default to 0 if null

  const monthlyInterest = interestRate / 12 / 100;
  const totalMonths = term * 12;

  // Check for valid input to avoid division by zero
  if (principal > 0 && monthlyInterest > 0 && totalMonths > 0) {
    // EMI formula
    let emi =
      (principal * monthlyInterest * Math.pow(1 + monthlyInterest, totalMonths)) /
      (Math.pow(1 + monthlyInterest, totalMonths) - 1);

    
    setMonthyPayment(emi.toFixed(2));
  } else {
    setMonthyPayment(0); // Handle invalid cases
  }
  };
 

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'90vh'}}>
        <Box 
        sx={{
          width: 700,
          height: 300,
          borderRadius: 1,
          padding:'50px',
        //   border:'1px solid black',
          boxShadow: '1px 5px 40px 3px rgba(65,57,57,0.75)'
          //   bgcolor: '',
        //   '&:hover': {
        //     bgcolor: 'primary.dark',
        //   },
        }}
      >
        {/*  loan amount input field */}
        <TextField  id="outlined-basic" label="Loan-amount" variant="outlined" autoComplete='off' fullWidth InputProps={{
          startAdornment: (
            <InputAdornment position="start">₹</InputAdornment>
          ),
        }} onChange={handleLoanAmount} />
 
    {/* loan term drop down */}
    <Box sx={{ display: "flex",
            alignItems: "center",
            margin: "0px 0 0 20px",}}>
      <FormControl sx={{ m: 1, minWidth: 120,margin:'0px 20px 100px -20px', }}>
        <InputLabel id="demo-simple-select-helper-label">Loan-term</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={loanTerm}
          label="Loan-term"
          onChange={handleLoanTerm}
        >
          <MenuItem value="">
            {/* <em>None</em> */}    
          </MenuItem>
          <MenuItem value={5}>5-yr</MenuItem>
          <MenuItem value={10}>10-yr</MenuItem>
          <MenuItem value={15}>15-yr</MenuItem>
          <MenuItem value={20}>20-yr</MenuItem>
          <MenuItem value={25}>25-yr</MenuItem>
          <MenuItem value={30}>30-yr</MenuItem>
          <MenuItem value={35}>35-yr</MenuItem>
          <MenuItem value={40}>40-yr</MenuItem>
          <MenuItem value={45}>45-yr</MenuItem>
          <MenuItem value={50}>50-yr</MenuItem>
        </Select>
      </FormControl>
       {/*  loan amountinterest input field */}
       <TextField  sx={{
        margin:'0px 20px 100px 30px',
        }}  id="outlined-basic" label="Interest" variant="outlined" autoComplete='off'  InputProps={{
        endAdornment: (
            <InputAdornment position="end">%</InputAdornment>
          ),
        }} onChange={handleLoanInterest} />
               {/*result screen  */}
<Box  sx={{
          width: 160,
          height: 100,
          borderRadius: 1,
          padding:'50px',
          boxShadow: '1px 5px 20px 1px rgba(65,57,57,0.75)',
         margin:'20px 0 0 0'
        }}>
    <Typography>Monthly Payments</Typography>
    <Typography>₹{monthlyPayment}</Typography>
</Box>  
</Box>
<Button variant="contained" onClick={handleCalculate}>Calculate</Button>

        </Box>
    </div>
  );
}
