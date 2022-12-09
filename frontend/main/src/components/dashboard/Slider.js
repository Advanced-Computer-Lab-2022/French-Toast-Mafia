import * as React from 'react';
import Slider from '@mui/material/Slider';
import { getMaxCoursePrice } from "../../api/axios";
import {useState, useEffect} from 'react';


function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 5;

const MinimumDistanceSlider = ({setPriceRange, handlePriceChange}) => {

const [initMaxPrice,setInitMaxPrice] = useState([]);
const [value, setValue] = React.useState([]);

useEffect(() => {
    getMaxCoursePrice().then(json => {
      setInitMaxPrice(json)
      setValue([0,json])
    })
  }, []);

const handleChange = (event, newValue, activeThumb) => {

    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue([clamped, clamped + minDistance]);
        setPriceRange(value)
        return handlePriceChange();
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
        setPriceRange(value)
        return handlePriceChange();


      }
    } else {
      setValue(newValue);
      setPriceRange(value);
      return handlePriceChange();

    }
  
  };

  return (
      <Slider
        getAriaLabel={() => 'Minimum distance shift'}
        value={value}
        onChange={handleChange}
        max={initMaxPrice}
        valueLabelDisplay="on"
        getAriaValueText={valuetext}
        disableSwap
      />
  );
}

export default MinimumDistanceSlider;