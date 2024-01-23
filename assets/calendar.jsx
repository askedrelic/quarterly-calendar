import React from 'react';
import { useState } from 'react';
import * as _ from "lodash";

// terrible hack, but mostly works for 2024/2025/2026
const spacesMonth = [3, 3, 4, 3, 3, 4, 3, 3, 4, 3, 3, 3];
const BLANK = "\u00A0";

const Calendar = (props) => {
    const month = props.month;
    const year = props.year;

    const currentDate = new Date(year, month, 1);
    console.log(currentDate, month, year);
    const numMonthsToShow = 3;
    let allDays = [];

    // Get the day of the week (0 - Sunday, 1 - Monday, ..., 6 - Saturday)
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek !== 1) {
        // If it's not Monday, add missing days to get to Monday
        const missingDays = (dayOfWeek - 1 + 7) % 7;
        const lastMonth = new Date(currentDate);
        lastMonth.setDate(currentDate.getDate() - 1);
        for (let i = missingDays; i > 0; i--) {
            lastMonth.setDate(currentDate.getDate() - i);
            allDays.push(lastMonth.getDate());
        }
    }

    // Calculate the days in the month and monthly row spacing
    let countMonths = [];
    for (let i = 1; i <= numMonthsToShow; i++) {
        const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
        nextMonth.setDate(nextMonth.getDate() - 1);
        const daysInMonth = nextMonth.getDate();
        const calendarDays = _.range(1, daysInMonth + 1);
        allDays.push(...calendarDays);

        // hack for spacing out months
        countMonths.push(nextMonth.toLocaleString('default', { month: 'short' }));
        let blanks = new Array(spacesMonth[nextMonth.getMonth()]).fill(BLANK);
        countMonths.push(...blanks);
    }

    // more hacks for finding the calendar week number
    let offset = 1;
    for (let i = 0; i <= currentDate.getMonth() - 1; i++) {
        offset += spacesMonth[i] + 1;
    }
    // TODO reset for dec/jan, but I'm going to leave this broken for now

    // 13 or 14 weeks in a quarter?
    let extraWeek = allDays.length > 91 ? 1 : 0;
    let countWeeks = _.range(offset, offset + countMonths.length + extraWeek);
    return (
        <div className="opacity-30 print:opacity-100" id="calendar">
            <div className="w-2/5 h-screen text-center text-2xl ">

                <div className="grid grid-cols-10 border-b">
                    <div className="col-span-2 text-gray-600">Month</div>
                    <div className="text-gray-600">W#</div>
                    {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat', 'Sun'].map(day => (
                        <div key={day} className="text-gray-600">{day}</div>
                    ))}
                </div>

                <div className="grid grid-cols-10">
                    <div className="col-span-2">
                        <div className="grid gap gap-y-5">
                            {countMonths.map((month, index) => (
                                <div key={index} className={month != BLANK ? "bg-gray-200" : ""}>{month}</div>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="grid gap gap-y-5 bg-gray-200">
                            {countWeeks.map(number => (
                                <div key={number} className="">{number}</div>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-7">
                        <div className="grid grid-cols-7 gap-y-5">
                            {allDays.map((day, index) => (
                                <div key={index} className={day == 1 ? "bg-gray-300" : ""}>
                                    {day}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
