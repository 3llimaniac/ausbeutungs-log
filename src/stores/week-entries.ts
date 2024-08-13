import { AbsenceEntry, DayEntry, Entry, type DayEntryType } from "@/types/day-entry";
import { computed, ref } from "vue";
import { useUserStore } from "./auth";
import type { UserStats } from "@/types/user-stats";
import { defineStore, setActivePinia } from "pinia";
import apiConfig from "@/config/api-config";
import { useHolidayStore } from "./holiday";
import pinia from "./pinia";
import '../utilities/date-extensions';

const initialWeekEntriesObject = {
    0: {} as Entry,
    1: {} as Entry,
    2: {} as Entry,
    3: {} as Entry,
    4: {} as Entry
};

setActivePinia(pinia);
const userStore = useUserStore();
const holidayStore = useHolidayStore();

export const useEntryStore = defineStore("entry", () => {
    const weekEntries = ref<Record<number, Entry>>(structuredClone(initialWeekEntriesObject));
    const selectedEntry = ref<Entry>(weekEntries.value[0]);
    const weekNumber = ref(new Date().getWeek());
    const yearNumber = ref(new Date().getFullYear());
    const weekGroup = ref(Math.ceil(weekNumber.value / 13));
    const overtimeHours = ref<Number>(0);

    const weekHours = computed(() => {
        let hours: number = Number(userStore.user.hours);

        for (const key in weekEntries.value) {
            if (AbsenceEntry.isAbsenceEntry(weekEntries.value[key]) || holidayStore.isHoliday(weekEntries.value[key].workDay)) {
                hours -= 8;
            }
        }

        return hours;
    });

    const workedHours = computed(() => {
        let hourSum: number = 0;
        let minuteSum: number = 0;

        for (const key in weekEntries.value) {
            if (!DayEntry.isDayEntry(weekEntries.value[key])) {
                continue;
            }

            const currEntry: DayEntry = weekEntries.value[key] as DayEntry;
            const currDeparture: string[] = currEntry.departure.split(':');
            const currArrival: string[] = currEntry.arrival.split(':');

            if (currDeparture.length !== 2 || currArrival.length !== 2) {
                continue;
            }

            const departureHours = Number(currDeparture[0]);
            const departureMinutes = Number(currDeparture[1]);
            const arrivalHours = Number(currArrival[0]);
            const arrivalMinutes = Number(currArrival[1]);

            if (isNaN(departureHours) || isNaN(departureMinutes) || isNaN(arrivalHours) || isNaN(arrivalMinutes)) {
                continue;
            }

            hourSum += departureHours - arrivalHours;
            minuteSum += departureMinutes - arrivalMinutes;

            if (minuteSum < 0) {
                hourSum -= 1;
                minuteSum += 60;
            }
        }

        hourSum += minuteSum / 60;
        return hourSum.toFixed(2);
    });

    async function getEntries() {
        const initialWeekEntries: Record<number, Entry> = structuredClone(initialWeekEntriesObject);
        const currentDate = new Date();

        let initialDate = currentDate.addDays(-(currentDate.getDay() - 1));
        initialDate = initialDate.addDays((weekNumber.value - initialDate.getWeek()) * 7);

        for (let index: number = 0; index < 5; index++) {
            initialWeekEntries[index].workDay = initialDate;
            initialDate = initialDate.addDays(1);
        }

        weekEntries.value = initialWeekEntries;
        const fetchedEntries: DayEntryType[] = await fetchEntriesOfSelectedWeek();

        for (const obj of fetchedEntries) {
            let entry: Entry = Entry.createEntryByObject(obj);

            if ("arrival" in obj) {
                entry = DayEntry.createDayEntryByObject(obj);
            } else if ("reason" in obj) {
                entry = AbsenceEntry.createAbsenceEntryByObject(obj);
            }

            weekEntries.value[entry.workDay.getDay() - 1] = entry;
        }

        await getStats();
    }

    async function updateWeekNumber(newNumber: number) {
        weekNumber.value = newNumber;
        weekGroup.value = Math.ceil(weekNumber.value / 13);
        await getEntries();
    }

    async function updateYearNumber(newNumber: number) {
        yearNumber.value = newNumber;
        await getEntries();
    }

    async function fetchEntriesOfSelectedWeek() {
        const entries: DayEntryType[] = [];

        const entryUrls: string[] = [
            apiConfig.ENTRY + "/week",
            apiConfig.ABSENCE + "/week"
        ];

        for (let fetchUrl of entryUrls) {
            fetchUrl += `?weekNumber=${weekNumber.value}&yearNumber=${yearNumber.value}`;

            const fetchResult = await fetch(fetchUrl, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });

            if (fetchResult.ok) {
                entries.push(...(await fetchResult.json()));
            }
        }

        return entries;
    }

    async function getStats() {
        const fetchResult = await fetch(apiConfig.STATS, {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        if (!fetchResult.ok) {
            throw Error("Could not receive user stats");
        }

        const statObj: UserStats = await fetchResult.json();

        // amount of worked seconds
        statObj.sumSeconds = Number(statObj.sumSeconds || 0);
        console.log(statObj.sumSeconds);

        const currDate: Date = new Date();

        // amount of worked hours
        const workedHours: number = Math.ceil(statObj.sumSeconds / 3600);

        // amount of weeks to be worked
        let workingWeeks: number = statObj.minWeek ? currDate.getWeek() - statObj.minWeek + 1 : 1;

        if (statObj.minYear && currDate.getFullYear() !== statObj.minYear) {
            workingWeeks += 52;
        }

        const hoursToBeWorked: number = (workingWeeks * 5 - (statObj.countAbsences + 5 - currDate.getDay())) * (userStore.user.hours / 5);
        overtimeHours.value = workedHours - hoursToBeWorked;
    }

    return {
        selectedEntry,
        weekEntries,
        weekNumber,
        yearNumber,
        weekGroup,
        weekHours,
        workedHours,
        overtimeHours,
        getEntries,
        updateWeekNumber,
        updateYearNumber,
        getEntriesOfSelectedWeek: fetchEntriesOfSelectedWeek,
        getStats
    };
});

