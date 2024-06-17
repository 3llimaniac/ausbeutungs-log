import { DayEntry, type EntryType } from "@/types/day-entry";
import { ref } from "vue";

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
    0: {} as DayEntry,
    1: {} as DayEntry,
    2: {} as DayEntry,
    3: {} as DayEntry,
    4: {} as DayEntry
};

export const weekEntries = ref<Record<number, DayEntry>>(structuredClone(initialWeekEntriesObject));

export const weekNumber = ref(new Date().getWeek());

export const yearNumber = ref(new Date().getFullYear());

function initializeWeekEntries() {
    const initialWeekEntries: Record<number, DayEntry> = structuredClone(initialWeekEntriesObject);
    initialWeekEntries[0].dayOfWeek = 5;
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
    await updateWeekEntries();
}

export async function updateYearNumber(newNumber: number) {
    yearNumber.value = newNumber;
    await updateWeekEntries();
}

export function updateWeekEntry(entry: DayEntry, index: number) {
    weekEntries.value[index] = entry;
}

export async function updateWeekEntries() {
    const fetchedEntries: EntryType[] = await getEntriesOfSelectedWeek();
    weekEntries.value = initializeWeekEntries();

    for (const entry of fetchedEntries) {
        weekEntries.value[entry.dayOfWeek - 2] = DayEntry.createDayEntryByEntryObject(entry);
    }
}

async function getEntriesOfSelectedWeek() {
    let fetchUrl: string = 'http://localhost:3000/api/entry/week';
    fetchUrl += `?weekNumber=${weekNumber.value}&yearNumber=${yearNumber.value}`;

    const fetchResult = await fetch(fetchUrl, {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });

    return await fetchResult.json();
}

