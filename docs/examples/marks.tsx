import WeekSlider from 'rc-slider';
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import '../../assets/index.scss';
// import '../../assets/index.less';
import moment from 'moment';
import 'moment/min/locales';

import MarkerMapIcon from '../../assets/map-marker.svg';
import StartIcon from '../../assets/start.svg';
import FinishIcon from '../../assets/finish.svg';
import ExamFlagIcon from '../../assets/exam-flag.svg';

const style: React.CSSProperties = {
  width: '100%',
  background: 'linear-gradient(180deg, #434343 0%, #2A2E39 100%)',
  paddingTop: 80,
  paddingBottom: 80,
  paddingLeft: 20,
  paddingRight: 20,
};

function getWeeksInMonth(year: number, month: number): any {
  const startOfMonth = moment([year, month - 1]);
  const endOfMonth = moment(startOfMonth).endOf('month');

  const startWeek = startOfMonth.isoWeek();
  const endWeek = endOfMonth.isoWeek();

  // Yıl sonu geçiş kontrolü
  if (endWeek < startWeek) {
    const totalWeeksInYear = moment([year]).endOf('year').isoWeeksInYear();

    return {
      startWeek,
      endWeek,
      totalWeek: (totalWeeksInYear - startWeek + 1 + endWeek),
    };
  }

  return {
    startWeek,
    endWeek,
    totalWeek: (endWeek - startWeek + 1),
  };
}

function listWeeksFromMonth(startYear: number, startMonth: number): any[] {
  const result = [];

  for (let i = 0; i < 13; i++) {
    moment.locale('tr');
    const current = moment([startYear, startMonth - 1]).add(i, 'months');
    const year = current.year();
    const month = current.month() + 1; // moment ayları 0-indexli tutar
    const monthName = current.format('MMMM');

    const weeksObject = getWeeksInMonth(year, month);

    result.push({ month, year, monthName, ...weeksObject });
  }

  return result;
}

function generateWeekMap({ startYear, startMonth, activeWeekIndex = null, currentWeekIndex = null, eventList = [] }): any {
  let weekIndex: number = 5;
  let currentMonthIndex: number = null;

  const eventMap = eventList.reduce(function(map, obj) {
    if (obj?.type === 'event') {
      map[obj.week] = obj;
    } else if (obj?.type === 'month-event') {
      map[`${obj.month}-${obj.year}`] = obj;
    }

    return map;
  }, {});

  const weekList = listWeeksFromMonth(startYear, startMonth);

  const isMarker = activeWeekIndex !== currentWeekIndex;

  const maxWeekCount = Math.max(...weekList.map(o => o.totalWeek)) - 1;

  const markerTemplate = (
    <span className="map-marker">
      <img alt="" src={MarkerMapIcon} draggable={false} />
    </span>
  );

  let marksMap: any = {};

  const monthIndexList: number[] = [];

  weekList.forEach((item, monthIndex) => {
    currentMonthIndex = weekIndex;
    monthIndexList.push(currentMonthIndex);

    marksMap[weekIndex] = {
      className: 'month-mark',
      value: item?.startWeek,
      month: item?.month,
      year: item?.year,
      currentMonthIndex: null,
      positionFixer: null,
      label: (
        <Fragment>
          {
            isMarker && currentWeekIndex === weekIndex && (
              markerTemplate
            )
          }
          {item?.monthName}
          {
            eventMap[item?.startWeek]?.year === item?.year && eventMap[item?.startWeek]?.month === item?.month && eventMap[item?.startWeek]?.type === 'event' && (
              <div className="event-label-wrapper">
                <span className="event-label-separator" />
                <span className="event-label">
                  {eventMap[item?.startWeek]?.label}
                </span>
              </div>
            )
          }
        </Fragment>
      ),
    };

    weekIndex += 1;

    const totalWeeks = (item?.totalWeek - 1);
    const isFixer = totalWeeks < maxWeekCount;

    for (let i = 1; i <= totalWeeks; i++) {
      const value = (item?.startWeek + i);

      marksMap[weekIndex] = {
        className: 'week-mark',
        value,
        month: item?.month,
        year: item?.year,
        disabled: !(isMarker && currentWeekIndex === weekIndex),
        // positionFixer: isFixer ? ((maxWeekCount - totalWeeks) / weekList.length) : null,
        positionFixer: isFixer ? 0.006 : null,
        currentMonthIndex,
        label: (
          <Fragment>
            {
              isMarker && currentWeekIndex === weekIndex && (
                markerTemplate
              )
            }
            {
              eventMap[value]?.year === item?.year && eventMap[value]?.month === item?.month && eventMap[value]?.type === 'event' && (
                <div className="event-label-wrapper">
                  <span className="event-label-separator" />
                  <div className="event-label">
                    {eventMap[value]?.label}
                  </div>
                </div>
              )
            }
          </Fragment>
        ),
      };

      weekIndex++;
    }

    if (totalWeeks < maxWeekCount && monthIndex < (weekList.length - 1)) {
      const diff = (maxWeekCount - totalWeeks);

      for (let j = 0; j < diff; j++) {
        marksMap[weekIndex] = {
          className: 'empty-mark',
          label: null,
          disabled: true,
          value: -1,
          positionFixer: null,
        };

        weekIndex += 1;
      }
    }

    const monthEvent = eventMap[`${item.month}-${item.year}`];

    if (monthEvent) {
      weekIndex += 1;

      marksMap[weekIndex] = {
        className: (monthEvent.className || 'month-event'),
        value: -1,
        disabled: true,
        month: null,
        year: null,
        currentMonthIndex: null,
        positionFixer: null,
        label: (
          <Fragment>
            {
              isMarker && currentWeekIndex === weekIndex && (
                markerTemplate
              )
            }
            {monthEvent?.label}
            {
              monthEvent?.badgeLabel && (
                <div className="event-label-wrapper">
                  <span className="event-label-separator" />
                  <span className="event-label">
                    {monthEvent?.badgeLabel}
                  </span>
                </div>
              )
            }
          </Fragment>
        ),
      };

      weekIndex += 1;

      for (let i = 0; i < maxWeekCount; i++) {
        marksMap[weekIndex] = {
          className: 'empty-mark',
          label: null,
          disabled: true,
          value: -1,
          positionFixer: null,
        };

        weekIndex += 1;
      }
    }
  });

  weekIndex += 1;

  marksMap = {
    0: {
      className: 'first-mark',
      label: (
        <div className="start-mark-wrapper">
          <img alt="" src={StartIcon} />
        </div>
      ),
      disabled: true,
      value: -1,
      positionFixer: null,
    },
    1: {
      className: 'empty-mark',
      label: null,
      disabled: true,
      value: -1,
      positionFixer: null,
    },
    2: {
      className: 'empty-mark',
      label: null,
      disabled: true,
      value: -1,
      positionFixer: null,
    },
    3: {
      className: 'empty-mark',
      label: null,
      disabled: true,
      value: -1,
      positionFixer: null,
    },
    4: {
      className: 'empty-mark',
      label: null,
      disabled: true,
      value: -1,
      positionFixer: null,
    },
    ...marksMap,
    [weekIndex]: {
      className: 'last-mark',
      label: (
        <div className="finish-mark-wrapper">
          <img alt="" src={FinishIcon} />
        </div>
      ),
      disabled: true,
      value: -1,
      positionFixer: null,
    },
  };

  return {
    marksMap,
    maxIndex: weekIndex,
    monthIndexList,
  };
}

function findKeyByWeek(map: any, week: number, month: number, year: number): number {
  let result: number | null = null;

  for (const [key, obj] of Object.entries(map)) {
    if (obj?.value === week && obj?.month === month && obj?.year === year) {
      result = Number(key);

      break;
    }
  }

  return result;
}


export default () => {
  const [activeWeekIndex, setActiveWeekIndex] = useState(null);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(null);
  const [marksObject, setMarksObject] = useState(null);

  const prevNextLockRef = useRef(false);

  const eventList = [
    {
      type: 'event',
      label: 'Sömestr',
      week: 37,
      year: 2025,
      month: 9,
    },
    {
      type: 'event',
      label: 'TYT bu hafta bitiyor',
      week: 46,
      year: 2025,
      month: 11,
    },
    // {
    //   type: 'month-event',
    //   label: 'Deneme Zamanı',
    //   week: null,
    //   year: 2025,
    //   month: 7,
    //   className: 'month-mark yellow-event',
    //   badgeLabel: 'Denemeler Başlıyor!',
    // },
    // {
    //   type: 'month-event',
    //   label: 'Tercihler',
    //   week: null,
    //   year: 2025,
    //   month: 10,
    //   className: 'month-mark green-event',
    //   badgeLabel: (
    //     <Fragment>
    //       <img alt="" src={ExamFlagIcon} style={{ width: 18, height: 18, marginRight:5 }} draggable={false} />
    //       YKS Sınavı
    //     </Fragment>
    //   )
    // },
  ];

  const weekChangeHandler = (index: number) => {
    console.log('Week Count:', marksObject?.marksMap?.[index]?.value, marksObject?.marksMap?.[index]);
  };

  const onWeekChangeComplete = (index: number) => {
    if (!prevNextLockRef.current) {
      weekChangeHandler(index);
    }

    prevNextLockRef.current = false;
  };

  const onPrevMonth = () => {
    prevNextLockRef.current = true;

    const currentMonthIndex = marksObject?.marksMap?.[activeWeekIndex]?.currentMonthIndex;

    if (currentMonthIndex) {
      setActiveWeekIndex(marksObject?.marksMap?.[activeWeekIndex]?.currentMonthIndex);

      weekChangeHandler(marksObject?.marksMap?.[activeWeekIndex]?.currentMonthIndex);
    } else {
      const keys = marksObject?.monthIndexList;
      let index = keys.findIndex(key => key === activeWeekIndex);

      index -= 1;

      if (index >= 0) {
        setActiveWeekIndex(marksObject?.monthIndexList[index]);

        weekChangeHandler(marksObject?.monthIndexList[index]);
      }
    }
  };

  const onNextMonth = () => {
    prevNextLockRef.current = true;

    const currentMonthIndex = marksObject?.marksMap?.[activeWeekIndex]?.currentMonthIndex;

    if (currentMonthIndex) {
      setActiveWeekIndex(marksObject?.marksMap?.[activeWeekIndex]?.currentMonthIndex);

      weekChangeHandler(marksObject?.marksMap?.[activeWeekIndex]?.currentMonthIndex);
    } else {
      const keys = marksObject?.monthIndexList;
      let index = keys.findIndex(key => key === activeWeekIndex);

      index += 1;

      if (index <= (marksObject?.monthIndexList?.length - 1)) {
        setActiveWeekIndex(marksObject?.monthIndexList[index]);

        weekChangeHandler(marksObject?.monthIndexList[index]);
      }
    }
  };

  useEffect(() => {
    if (activeWeekIndex && currentWeekIndex) {
      setMarksObject(
        generateWeekMap({ startYear: 2025, startMonth: 4, activeWeekIndex, currentWeekIndex, eventList }),
      );
    }
  }, [activeWeekIndex, currentWeekIndex]);

  useEffect(() => {
    if (!marksObject) {
      setMarksObject(
        generateWeekMap({ startYear: 2025, startMonth: 4, eventList }),
      );
    }

    if (marksObject && !activeWeekIndex && !currentWeekIndex) {
      const weekIndex = findKeyByWeek(marksObject?.marksMap, 20, 5, 2025);


      setCurrentWeekIndex(weekIndex);
      setActiveWeekIndex(weekIndex);
    }
  }, [marksObject, activeWeekIndex, currentWeekIndex]);

  return (
    <div>
      <div style={style}>
        <WeekSlider
          dots={true}
          min={0}
          max={marksObject?.maxIndex}
          prefixCls="week-slider"
          marks={marksObject?.marksMap}
          step={null}
          included={true}
          keyboard={false}
          value={activeWeekIndex}
          handleInnerComponent={(
            <div style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: '50%', position: 'relative', zIndex: 3 }}>
              <img alt="" src={require('../../assets/avatar.png')} style={{ width: 36, height: 36 }} draggable={false} />
            </div>
          )}
          handleActionComponent={(
            <Fragment>
              <a className="week-slider-handle-prev-button" onMouseUp={onPrevMonth}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M8.75 10.5L5.25 7L8.75 3.5" stroke="#4A4A4A" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a className="week-slider-handle-next-button" onMouseUp={onNextMonth}>
                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="8" viewBox="0 0 6 8" fill="none">
                  <path d="M1.25 7.5L4.75 4L1.25 0.5" stroke="#4A4A4A" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Fragment>
          )}
          onChangeComplete={onWeekChangeComplete}
          onChange={setActiveWeekIndex}
        />
      </div>
    </div>
  );
};
