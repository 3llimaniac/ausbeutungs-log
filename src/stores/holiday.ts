import apiConfig from "@/config/api-config";
import { defineStore } from "pinia";
import { ref } from "vue";

import '../utilities/date-extensions';

interface HolidayType {
    date: string,
    fname: string;
}

export class HolidayEntry {
    date: Date;
    fname: string;

    constructor(date: string, fname: string) {
        this.date = new Date(date);
        this.fname = fname;
    }

    public static createHolidayEntryByObject(holidayObject: HolidayType) {
        return new HolidayEntry(holidayObject.date, holidayObject.fname);
    }
}

export const useHolidayStore = defineStore("holiday", () => {
    const holidays = ref<Record<string, HolidayEntry>>({});

    function isHoliday(day: Date) {
        return !!holidays.value[day.toLocaleDateString()];
    }

    function getHoliday(day: Date) {
        return holidays.value[day.toLocaleDateString()];
    }

    function getPreviousHolidays(minWeek: number) {
        const holidayList: HolidayEntry[] = [];
        const currentDay = new Date();

        for (const key in holidays.value) {
            const entry = holidays.value[key];

            if (entry.date.getWeek() < minWeek) {
                continue;
            }

            if (entry.date.getWeek() > currentDay.getWeek() || (entry.date.getWeek() === currentDay.getWeek() && currentDay.getDay() < entry.date.getDay())) {
                break;
            } else {
                holidayList.push(holidays.value[key]);
            }
        }

        return holidayList;
    }

    async function getEntries(year: number) {
        const fetchResult = await fetch(apiConfig.HOLIDAY + year, {
            method: 'GET',
            credentials: 'omit',
            headers: {
                "Accept": "application/json",
            },
            mode: 'cors'
        });

        if (fetchResult.ok) {
            const fetchObjects = await fetchResult.json();

            for (const obj of fetchObjects.feiertage) {
                const entry: HolidayEntry = HolidayEntry.createHolidayEntryByObject(obj);
                holidays.value[entry.date.toLocaleDateString()] = entry;
            }
        } else {
            throw "Resource could not be used";
        }
    }

    return {
        holidays,
        getEntries,
        getPreviousHolidays,
        isHoliday,
        getHoliday
    };
});
