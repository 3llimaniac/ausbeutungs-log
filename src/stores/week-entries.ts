import { AbsenceEntry, DayEntry, Entry, type DayEntryType } from "@/types/day-entry";
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
    0: {} as Entry,
    1: {} as Entry,
    2: {} as Entry,
    3: {} as Entry,
    4: {} as Entry
};

export const weekEntries = ref<Record<number, Entry>>(structuredClone(initialWeekEntriesObject));

export const weekNumber = ref(new Date().getWeek());

export const yearNumber = ref(new Date().getFullYear());

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

