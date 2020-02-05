import React from 'react';
import Nouislider from 'nouislider-react';
import "nouislider/distribute/nouislider.css";
import classes from './YearSlider.module.css';

const YearSlider = (props) => {
  return (
    <div className={classes.YearSlider}>
      <Nouislider
        start={[props.fromYear, props.toYear]}
        step={1}
        range={{ min: 1900, max: (new Date()).getFullYear() }}
        connect={[false, true, false]}
        onSet={(_, __, values, ___, ____) => props.sliderChanged(values[0], values[1])}
        onUpdate={(_, __, values, ___, ____) => {
          document.getElementById('year-slider-from').innerHTML = values[0];
          document.getElementById('year-slider-to').innerHTML = values[1];
        }}
      />
      <div className={classes.YearSliderSpan}>
        <span id="year-slider-from">{props.fromYear}</span>
        <span id="year-slider-to">{props.toYear}</span>
      </div>
    </div>  
  );
}

export default YearSlider;