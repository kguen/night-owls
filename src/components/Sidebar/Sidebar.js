import React from 'react';
import classes from './Sidebar.module.css';
import FilterBox from './FilterBox/FilterBox';
import FilterChecklist from './FilterChecklist/FilterChecklist';
import RatingSlider from './RatingSlider/RatingSlider';
import YearSlider from './YearSlider/YearSlider';
import Dropdown from './Dropdown/Dropdown';

const CHECKLIST_ITEM_HEIGHT = 32,
  RATING_SLIDER_HEIGHT = 74,
  RATING_SYSTEM_DROPDOWN_HEIGHT = 63,
  YEAR_SLIDER_HEIGHT = 137;

const Sidebar = (props) => {
  return (
    <div className={classes.Sidebar}>
      <FilterBox 
        height={props.formatList.length * CHECKLIST_ITEM_HEIGHT + 15} 
        title="Format"
      >
        <FilterChecklist
          firstChecked type='radio' name='format'
          list={props.formatList}
          inputChecked={props.formatFilterChanged}
        />
      </FilterBox>
      <FilterBox 
        title="Rating System"
        height={RATING_SYSTEM_DROPDOWN_HEIGHT}
      >
        <Dropdown
          list={props.ratingSystemList}
          changed={props.ratingSystemDropdownChanged}
        />
      </FilterBox>
      <FilterBox 
        notShowFirst 
        title="Genres"
        height={
          props.genreList &&
          props.genreList.length * CHECKLIST_ITEM_HEIGHT + 15
        }
      >
        <FilterChecklist 
          type='checkbox' name='genre'
          list={props.genreList}
          inputChecked={props.genreFilterChanged}
        />
      </FilterBox>
      <FilterBox 
        title="Mininum Rating"
        height={RATING_SLIDER_HEIGHT}
      >
        <RatingSlider 
          rating={props.minRating}
          sliderChanged={props.minRatingSliderChanged}
        />
      </FilterBox>
      <FilterBox 
        title="Year"
        height={YEAR_SLIDER_HEIGHT}
      >
        <YearSlider 
          fromYear={props.fromYear}
          toYear={props.toYear}
          sliderChanged={props.yearSliderChanged}
        />
        <Dropdown 
          list={props.decadeList}
          changed={props.decadeDropdownChanged}
          reversed
        />
      </FilterBox>
    </div>
  )
}

export default Sidebar;