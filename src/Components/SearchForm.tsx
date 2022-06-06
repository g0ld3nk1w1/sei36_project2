import countryCode from "../Data/CountryCode.json";
import { addYears, endOfDay, formatISO, startOfDay, subMonths } from "date-fns";
import { BaseSyntheticEvent, useState } from "react";
import { SearchObjectType } from "../Data/Constants";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";


export const SearchForm = (props: { handleSearch: Function, searchObject: SearchObjectType }) => {
  const [interimObj, setInterimObj] = useState(props.searchObject);

  const minDate = startOfDay(subMonths(Date.now(), 3));
  const maxDate = endOfDay(addYears(Date.now(), 1));

  const handleInput = (id:string, value: string) => {
    setInterimObj({ ...interimObj, [id]: value });
  };
  const handleCountry = (event : SelectChangeEvent) => {
    setInterimObj({ ...interimObj, ["country"]: event.target.value });
  };

  const handleSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    // console.log(Object.values(interimObj));
    if(interimObj.dateFrom === '' || interimObj.dateTo === ''){
      window.alert("Please enter dates!");
      return;
    }
    props.handleSearch(interimObj);
  };


  // console.log("interimObj", interimObj);
  return (
    <Box sx={{display: 'flex', p:1, m:1, backgroundColor:"#009393"}}>
    <form onSubmit={handleSubmit}>
      <FormControl sx={{minWidth: 120 ,pr:4}} required>
        <InputLabel id="country-label" >Country</InputLabel>
        <Select labelId="country-label" onChange={handleCountry} label="Country" id="country" value={interimObj.country}>
          {countryCode.map((ele) => (
            <MenuItem value={ele.code} key={ele.code}>{ele.name}</MenuItem>
          ))}
        </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{display: 'inline', pr:4}}>
        <DatePicker 
          label="Start Date"
          value={interimObj.dateFrom || null}
          minDate={minDate}
          maxDate={maxDate}
          onChange = {(newValue) => handleInput("dateFrom",`${formatISO(newValue || Date.now()).split('+')[0]}Z`)}
          renderInput={(params) => <TextField {...params} />}
           />
        </Box>
        <Box sx={{display: 'inline', pr:4}}>
        <DatePicker
          label="End Date"
          value={interimObj.dateTo || null}
          minDate={new Date(interimObj.dateFrom)}
          maxDate={maxDate}
          onChange = {(newValue) => handleInput("dateTo",`${formatISO(newValue|| Date.now()).split('+')[0]}Z`)}
          disablePast
          renderInput={(params) => <TextField {...params} />}
        />
        </Box>
        </LocalizationProvider>
        <Box sx={{ display: 'inline-flex', pr:4}}>
        <TextField label="Keywords" variant="outlined" id="keywords" onChange={(event) => handleInput("keywords", event?.target.value)} 
        value={interimObj.keywords} />
        </Box>
        <Box sx={{display: 'inline-flex', alignSelf:"center"}}>
        <Button type="submit" size="large"variant="contained" onClick={() => setInterimObj({...interimObj, clickSearch: true})}
        >Search</Button>
        </Box>
      </form>
    </Box>
  );
};
