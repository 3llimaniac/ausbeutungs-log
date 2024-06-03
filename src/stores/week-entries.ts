import { DayEntry, type EntryType } from "@/types/day-entry";
import { ref } from "vue";

declare global {
    interface Date {
        getWeek(): number;
    }
}

Date.prototype.getWeek = function (): number {
    const onejan = new Date(this.getFullYear(), 0, 1);
    const today = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    const dayOfYear = ((today.getTime() - onejan.getTime() + 86400000) / 86400000);
    return Math.ceil(dayOfYear / 7) - 1;
};

const initialWeekEntries = {
    0: {} as DayEntry,
    1: {} as DayEntry,
    2: {} as DayEntry,
    3: {} as DayEntry,
    4: {} as DayEntry
};

export const weekEntries = ref<Record<number, DayEntry>>({ ...initialWeekEntries });

export const weekNumber = ref(new Date().getWeek());

export async function updateWeekNumber(newNumber: number) {
    weekNumber.value = newNumber;
    await updateWeekEntries();
}

export async function updateWeekEntry(entry: DayEntry, index: number) {
    weekEntries.value[index] = entry;
}

export async function updateWeekEntries() {
    const fetchedEntries: EntryType[] = await getEntriesOfCurrentWeek();
    weekEntries.value = { ...initialWeekEntries };

    for (const entry of fetchedEntries) {
        weekEntries.value[entry.dayOfWeek - 2] = DayEntry.createDayEntryByEntryObject(entry);
    }
}

async function getEntriesOfCurrentWeek() {
    let fetchUrl: string = 'http://localhost:3000/api/entry/week';
    fetchUrl += `?weekNumber=${weekNumber.value}`;

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