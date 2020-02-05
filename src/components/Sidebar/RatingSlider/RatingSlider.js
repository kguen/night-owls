import React from 'react';
import Nouislider from 'nouislider-react';
import 'nouislider/distribute/nouislider.css';
import classes from './RatingSlider.module.css';

const RatingSlider = (props) => {
  return (
    <div className={classes.RatingSlider}>
      <Nouislider
        start={props.rating}
        range={{ min: 1.0, max: 8.5 }}
        step={0.5}
        onSet={(_, __, value, ___, ____) => props.sliderChanged(value[0])}
        onUpdate={(_, __, value, ___, ____) => {
          const ratingSliderSpan = document.getElementById('ratingFilterDesc');
          ratingSliderSpan.innerHTML = `TMDb score above ${(Math.round(value * 10) / 10).toFixed(1)}`;
        }}
      />
      <div className={classes.Desc}>
        <span id="ratingFilterDesc">
        </span> 
      </div>
    </div>  
  );
}

export default RatingSlider;