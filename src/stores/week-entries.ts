import { AbsenceEntry, DayEntry, Entry, type DayEntryType } from "@/types/day-entry";
import { computed, ref } from "vue";
import { authState } from "./auth";
import type { UserStats } from "@/types/user-stats";

declare global {
    interface Date {
        getWeek(): number;

        addDays(days: number): Date;
    }
}

Date.prototype.getWeek = function (): number {
    const onejan = new Date(this.getFullYear(), 0, 1);
    const today = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    const dayOfYear = ((today.getTime() - onejan.getTime() + 86400000) / 86400000);
    return Math.ceil(dayOfYear / 7) - 1;
};

Date.prototype.addDays = function (days: number) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

const initialWeekEntriesObject = {
    0: {} as Entry,
    1: {} as Entry,
    2: {} as Entry,
    3: {} as Entry,
    4: {} as Entry
};

export const weekEntries = ref<Record<number, Entry>>(structuredClone(initialWeekEntriesObject));

export const weekNumber = ref(new Date().getWeek());

export const yearNumber = ref(new Date().getFullYear());

export const weekGroup = ref(Math.ceil(weekNumber.value / 13));

export const weekHours = computed(() => {
    let hours: number = Number(authState.value.user.hours);

    for (const key in weekEntries.value) {
        if (AbsenceEntry.isAbsenceEntry(weekEntries.value[key])) {
            hours -= 8;
        }
    }

    return hours;
});

export const workedHours = computed(() => {
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

export const overtimeHours = ref<Number>(0);

function initializeWeekEntries() {
    const initialWeekEntries: Record<number, Entry> = structuredClone(initialWeekEntriesObject);
    const currentDate = new Date();

    let initialDate = currentDate.addDays(-(currentDate.getDay() - 1));
    initialDate = initialDate.addDays((weekNumber.value - initialDate.getWeek()) * 7);

    for (let index: number = 0; index < 5; index++) {
        initialWeekEntries[index].workDay = initialDate;
        initialDate = initialDate.addDays(1);
    }

    return initialWeekEntries;
}

export async function updateWeekNumber(newNumber: number) {
    weekNumber.value = newNumber;
    weekGroup.value = Math.ceil(weekNumber.value / 13);
    await updateWeekEntries();
}

export async function updateYearNumber(newNumber: number) {
    yearNumber.value = newNumber;
    await updateWeekEntries();
}

export function updateWeekEntry(entry: Entry) {
    weekEntries.value[entry.workDay.getDay() - 1] = entry;
}

export async function updateWeekEntries() {
    const fetchedEntries: DayEntryType[] = await getEntriesOfSelectedWeek();
    weekEntries.value = initializeWeekEntries();

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

async function getEntriesOfSelectedWeek() {
    const entries: DayEntryType[] = [];

    const entryUrls: string[] = [
        "http://localhost:3000/api/entry/week",
        "http://localhost:3000/api/entry/absence/week"
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
    const fetchUrl: string = 'http://localhost:3000/api/entry/stats';

    const fetchResult = await fetch(fetchUrl, {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });

    const statObj: UserStats = await fetchResult.json();
    statObj.sumSeconds = Number(statObj.sumSeconds);
    const currDate: Date = new Date();

    const workedHours: number = Math.ceil(statObj.sumSeconds / 3600); 
    let workingWeeks: number = currDate.getWeek() - statObj.minWeek + 1;

    if (currDate.getFullYear() !== statObj.minYear) {
        workingWeeks += 52;
    }

    const hoursToBeWorked: number = (workingWeeks * 5 - statObj.countAbsences) * (authState.value.user.hours / 5);
    overtimeHours.value = workedHours - hoursToBeWorked;
}

