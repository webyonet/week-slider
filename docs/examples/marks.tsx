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

const marks = {
  0: {
    className: 'first-mark',
    label: null,
    disabled: true,
    value: 0,
    positionFixer: null,
  },
  1: {
    className: 'month-mark',
    label: 'Ocak',
    value: 1,
    positionFixer: null,
  },
  2: {
    className: 'week-mark',
    label: null,
    value: 2,
    disabled: true,
    positionFixer: 1,
  },
  3: {
    className: 'week-mark',
    label: null,
    value: 3,
    disabled: true,
    positionFixer: 2,
  },
  4: {
    className: 'week-mark',
    label: null,
    value: 4,
    disabled: true,
    positionFixer: 3,
  },
  5: {
    className: 'month-mark',
    label: 'Şubat',
    value: 5,
    positionFixer: null,
  },
  6: {
    className: 'week-mark',
    label: null,
    value: 6,
    positionFixer: 1,
  },
  7: {
    className: 'week-mark',
    label: null,
    value: 7,
    positionFixer: 2,
  },
  8: {
    className: 'week-mark',
    label: null,
    value: 8,
    positionFixer: 3,
  },
  9: {
    className: 'month-mark',
    label: 'Mart',
    value: 9,
    positionFixer: null,
  },
  10: {
    className: 'week-mark',
    label: null,
    value: 10,
    positionFixer: 1,
  },
  11: {
    className: 'week-mark',
    label: null,
    value: 11,
    positionFixer: 2,
  },
  12: {
    className: 'week-mark',
    label: null,
    value: 12,
    positionFixer: 3,
  },
  13: {
    className: 'month-mark',
    label: 'Nisan',
    value: 13,
    positionFixer: null,
  },
  14: {
    className: 'week-mark',
    label: null,
    value: 14,
    positionFixer: 1,
  },
  15: {
    className: 'week-mark',
    label: null,
    value: 15,
    positionFixer: 2,
  },
  16: {
    className: 'week-mark',
    label: null,
    value: 16,
    positionFixer: 3,
  },
  17: {
    className: 'month-mark',
    label: 'Mayıs',
    value: 17,
    positionFixer: null,
  },
  18: {
    className: 'week-mark',
    label: null,
    value: 18,
    positionFixer: 1,
  },
  19: {
    className: 'week-mark',
    label: null,
    value: 19,
    positionFixer: 2,
  },
  20: {
    className: 'week-mark',
    label: null,
    value: 20,
    positionFixer: 3,
  },
  21: {
    className: 'month-mark',
    label: 'Haziran',
    value: 21,
    positionFixer: null,
  },
  22: {
    className: 'week-mark',
    label: null,
    value: 22,
    positionFixer: 1,
  },
  23: {
    className: 'week-mark',
    label: null,
    value: 23,
    positionFixer: 2,
  },
  24: {
    className: 'week-mark',
    label: null,
    value: 24,
    positionFixer: 3,
  },
  25: {
    className: 'month-mark',
    label: 'Temmuz',
    value: 25,
    positionFixer: null,
  },
  26: {
    className: 'week-mark',
    label: null,
    value: 26,
    positionFixer: 1,
  },
  27: {
    className: 'week-mark',
    label: null,
    value: 27,
    positionFixer: 2,
  },
  28: {
    className: 'week-mark',
    label: null,
    value: 28,
    positionFixer: 3,
  },
  29: {
    className: 'month-mark',
    label: 'Ağustos',
    value: 29,
    positionFixer: null,
  },
  30: {
    className: 'week-mark',
    label: null,
    value: 30,
    positionFixer: 1,
  },
  31: {
    className: 'week-mark',
    label: null,
    value: 31,
    positionFixer: 2,
  },
  32: {
    className: 'week-mark',
    label: null,
    value: 32,
    positionFixer: 3,
  },
  33: {
    className: 'month-mark',
    label: 'Eylül',
    value: 33,
    positionFixer: null,
  },
  34: {
    className: 'week-mark',
    label: null,
    value: 34,
    positionFixer: 1,
  },
  35: {
    className: 'week-mark',
    label: null,
    value: 35,
    positionFixer: 2,
  },
  36: {
    className: 'week-mark',
    label: null,
    value: 36,
    positionFixer: 3,
  },
  37: {
    className: 'month-mark',
    label: 'Ekim',
    value: 37,
    positionFixer: null,
  },
  38: {
    className: 'week-mark',
    label: null,
    value: 38,
    positionFixer: 1,
  },
  39: {
    className: 'week-mark',
    label: null,
    value: 39,
    positionFixer: 2,
  },
  40: {
    className: 'week-mark',
    label: null,
    value: 40,
    positionFixer: 3,
  },
  41: {
    className: 'month-mark',
    label: 'Kasım',
    value: 41,
    positionFixer: null,
  },
  42: {
    className: 'week-mark',
    label: null,
    value: 42,
    positionFixer: 1,
  },
  43: {
    className: 'week-mark',
    label: null,
    value: 43,
    positionFixer: 2,
  },
  44: {
    className: 'week-mark',
    label: null,
    value: 44,
    positionFixer: 3,
  },
  45: {
    className: 'week-mark',
    label: null,
    value: 44,
    positionFixer: 3,
  },
  46: {
    className: 'week-mark',
    label: null,
    value: 44,
    positionFixer: 3,
  },
  47: {
    className: 'week-mark',
    label: null,
    value: 44,
    positionFixer: 3,
  },
  48: {
    className: 'month-mark',
    label: 'Aralık',
    value: 45,
    positionFixer: null,
  },
  49: {
    className: 'week-mark',
    label: null,
    value: 46,
    positionFixer: 1,
  },
  50: {
    className: 'week-mark',
    label: null,
    value: 47,
    positionFixer: 2,
  },
  51: {
    className: 'week-mark',
    label: null,
    value: 48,
    positionFixer: 3,
  },
  // 49: {
  //   className: 'week-mark',
  //   label: null,
  //   value: -1,
  //   disabled: true,
  //   positionFixer: 4,
  // },
  // 50: {
  //   className: 'week-mark',
  //   label: null,
  //   value: -1,
  //   disabled: true,
  //   positionFixer: 5,
  // },
  // 51: {
  //   className: 'week-mark',
  //   label: null,
  //   value: -1,
  //   disabled: true,
  //   positionFixer: 6,
  // },
  52: {
    className: 'info-mark',
    label: 'Deneme Zamanı',
    disabled: false,
    value: -1,
    positionFixer: null,
  },
  53: {
    className: 'week-mark',
    label: null,
    value: -1,
    disabled: true,
    positionFixer: 1,
  },
  54: {
    className: 'week-mark',
    label: null,
    value: -1,
    disabled: true,
    positionFixer: 2,
  },
  55: {
    className: 'week-mark',
    label: null,
    value: -1,
    disabled: true,
    positionFixer: 3,
  },
  56: {
    className: 'week-mark',
    label: null,
    value: -1,
    disabled: true,
    positionFixer: 4,
  },
  57: {
    className: 'week-mark',
    label: null,
    value: -1,
    disabled: true,
    positionFixer: 5,
  },
  58: {
    className: 'week-mark',
    label: null,
    value: -1,
    disabled: true,
    positionFixer: 6,
  },
  59: {
    className: 'last-mark',
    label: 'Tercihler',
    disabled: true,
    value: -1,
    positionFixer: null,
  },
  60: {
    className: 'week-mark',
    label: null,
    value: -1,
    disabled: true,
    positionFixer: 1,
  },
  61: {
    className: 'week-mark',
    label: null,
    value: -1,
    disabled: true,
    positionFixer: 2,
  },
  62: {
    className: 'week-mark',
    label: null,
    value: -1,
    disabled: true,
    positionFixer: 3,
  },
  63: {
    className: 'last-mark',
    label: null,
    disabled: true,
    value: -1,
    positionFixer: null,
  },
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

  const markerTemplate = (
    <span className="map-marker">
      <img alt="" src={MarkerMapIcon} draggable={false} />
    </span>
  );

  let marksMap: any = {};

  let monthIndexList: number[] = [];

  weekList.forEach(item => {
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

    for (let i = 1; i <= totalWeeks; i++) {
      const value = (item?.startWeek + i);

      marksMap[weekIndex] = {
        className: 'week-mark',
        value,
        month: item?.month,
        year: item?.year,
        disabled: !(isMarker && currentWeekIndex === weekIndex),
        positionFixer: i,
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

      for (let i = 0; i < 5; i++) {
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
    {
      type: 'month-event',
      label: 'Deneme Zamanı',
      week: null,
      year: 2025,
      month: 7,
      className: 'month-mark yellow-event',
      badgeLabel: 'Denemeler Başlıyor!',
    },
    {
      type: 'month-event',
      label: 'Tercihler',
      week: null,
      year: 2025,
      month: 10,
      className: 'month-mark green-event',
      badgeLabel: (
        <Fragment>
          <img alt="" src={ExamFlagIcon} style={{ width: 18, height: 18, marginRight:5 }} draggable={false} />
          YKS Sınavı
        </Fragment>
      )
    },
  ];

  console.log('marksObject', marksObject?.marksMap);

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
