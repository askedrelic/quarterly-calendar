import React from 'react';
import * as _ from "lodash";

const daysInMonthMap = new Map([
    ['January', 4],
    ['Feb', 4], // Leap years not considered for simplicity
    ['March', 5],
    ['April', 4],
    ['May', 4],
    ['June', 4],
    ['July', 31],
    ['August', 31],
    ['September', 30],
    ['October', 31],
    ['November', 30],
    ['December', 31],
]);

const BLANK = "\u00A0";
const Calendar = () => {

    const queryParams = new URLSearchParams(window.location.search);

    // Default to this year
    const year = queryParams.get('year') ?? 2024;
    let month = 0;
    // Default to 1-12 month index when manually entered
    if (queryParams.get('month')) {
        month = queryParams.get('month') + 1;
    }

    const currentDate = new Date(year, month, 1);
    console.log(currentDate);
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


    for (let i = 1; i <= numMonthsToShow; i++) {
        const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
        nextMonth.setDate(nextMonth.getDate() - 1);
        const daysInMonth = nextMonth.getDate();
        const calendarDays = _.range(1, daysInMonth + 1);
        allDays.push(...calendarDays);
    }

    let countWeeks = Array.from({ length: allDays.length / 7 }, (_, index) => index + 1);
    let countMonths = ['Jan', BLANK, BLANK, BLANK, 'Feb', "\u00A0", "\u00A0", "\u00A0", 'March', "\u00A0", "\u00A0", "\u00A0"];
    return (
        <div className="">
            <div className="w-2/5 h-screen text-center text-2xl">

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
                                <div
                                    key={index}
                                    className={day == 1 ? "bg-gray-300" : ""}
                                >
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
