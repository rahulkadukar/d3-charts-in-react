import React, { Component , useState } from 'react'
import ThemeContext from './ThemeContext'
import styled from 'styled-components'

const DivStyled = styled.div`
  color: ${props => props.theme === 'dark' ? '#ECEFF1' : 'black'};
  transition: color 0.5s ease-in-out;
  padding: 2px 0px;
  position: absolute;
  right: 5;
`

const DropDown = styled.div`
  display: flex;
  flex-direction: column;
`

const Option = styled.div`
  padding: 4px;
`

const OuterDiv = styled.div`
  position: relative;
`

const Select = styled.select`
  background-color: ${props => props.theme === 'dark' ? '#202020' : '#ECEFF1'};
  color: ${props => props.theme === 'dark' ? '#ECEFF1' : 'black'};
  transition: * 0.5s ease-in-out;
  padding: 4px 20px;
  font-size: 16px;
`

function formatDateTime(inDate) {
  const myDate = new Date(inDate.getTime() - (60 * 1000 * inDate.getTimezoneOffset())).toISOString().split(`T`)
  return `${myDate[0]} ${myDate[1].slice(0,8)}`
}

const DateRangePicker = (props) => {
  const timeIntervals = [
    { "n": "Last_1_min", "t": "Last 1 min" },
    { "n": "Last_5_mins", "t": "Last 5 mins" },
    { "n": "Last_15_mins", "t": "Last 15 mins" },
    { "n": "Last_30_mins", "t": "Last 30 mins" }
  ]

  const initData = {
    'dateTimeRange': props.dateTimeRange,
    'selectedRange': 'Last_30_mins',
    'selectedText': 'Last 30 mins',
    'timeIntervals': timeIntervals
  }

  if (!(initData.dateTimeRange)) {
    initData.dateTimeRange =
      `${formatDateTime(new Date(new Date().getTime() - 1.8e6))} to ${formatDateTime((new Date()))}`
  }

  const [data, updateData] = useState(initData)

  function onItemSelect(item) {
    const newRange = item.target.value.split(`_`).map((e) => e.toLowerCase())
    const newData = Object.assign({}, data)

    if (newData.selectedRange !== item.target.value) {
      let timeToSubract = 0

      switch (newRange[2]) {
        case 'min':
        case 'mins':
          timeToSubract = newRange[1] * 60 * 1000
          break
        case 'hour':
        case 'hours':
          timeToSubract = newRange[1] * 60 * 60 * 1000
          break
        default:
      }

      newData.selectedRange = item.target.value
      newData.dateTimeRange =
        `${formatDateTime(new Date(new Date().getTime() - timeToSubract))} to ${formatDateTime((new Date()))}`
    }

    console.log(newData)
    updateData(newData)
  }

  return <ThemeContext.Consumer>
    { (value) =>
      <OuterDiv>
        <DivStyled theme={value.theme}>
          <Select theme={value.theme} value={data.selectedRange} onChange={(item) => onItemSelect(item)}>
            <option value="Last_1_min">Last 1 min</option>
            <option value="Last_5_mins">Last 5 mins</option>
            <option value="Last_15_mins">Last 15 mins</option>
            <option value="Last_30_mins">Last 30 mins</option>
          </Select>
        </DivStyled>
      </OuterDiv>
    }
  </ThemeContext.Consumer>
}

export default DateRangePicker;