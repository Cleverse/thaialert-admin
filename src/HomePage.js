import { css } from '@emotion/core'
import axios from 'axios'
import { BORDER_RADIUS, COLORS, SHEET_HEIGHT } from './const'
import { BottomSheet } from './BottomSheet'
import { GoogleMap } from './GoogleMap'
import React, { useEffect, useState } from 'react'
var qs = require('qs')

const fetchData = async () => {
  const resp = await axios.get(API_URL + '/location/latest', {
    headers: {
      'X-TH-ANONYMOUS-ID': '1'
    }
  })
  return resp.data
}

const API_URL = process.env.API_URL || 'https://api.staging.thaialert.com'

export const HomePage = ({ ...props }) => {
  const [selected, setSelected] = useState(null)
  const [tick, setTick] = useState(1)
  const [datas, setDatas] = useState(null)  
  useEffect(() => {    
    fetchData().then(data => {      
      setDatas(data)
    })
    setTimeout(() => setTick(tick + 1), 60000)
  }, [props.query, tick])
  
  const { coords, battery, timestamp } = selected || {}
  if (!datas) return ''
  return (
    <div className="h-full relative w-screen">
      <div
        className="absolute top-0 w-screen"
        css={css`
          height: calc(100vh - ${SHEET_HEIGHT}px + ${BORDER_RADIUS * 2}px);
        `}
      >
        <GoogleMap
          datas={datas}
          setSelected={setSelected}
          selectedId={selected ? selected.id : null}
        />
      </div>
      <div
        className="absolute bottom-0 w-screen"
        css={css`
          height: ${SHEET_HEIGHT}px;
          border-top-left-radius: ${BORDER_RADIUS}px;
          border-top-right-radius: ${BORDER_RADIUS}px;

          background: ${COLORS.WHITE};
          box-shadow: 0px 4px 35px rgba(0, 0, 0, 0.25);
        `}
      >
        {selected ? (
          <BottomSheet data={{ battery, timestamp }} />
        ) : (
          <div
            className="mt-16 text-center text-xl"
            css={css`
              color: ${COLORS.BLACK};
            `}
          >
            กดที่จุดเพื่อดูรายละเอียด
          </div>
        )}
      </div>
    </div>
  )
}
