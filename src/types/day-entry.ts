export interface EntryType {
    workDay: string,
    arrival: string,
    departure: string,
    week: number,
    dayOfWeek: number;
}

export class DayEntry {
    workDay: Date;
    arrival: string;
    departure: string;
    week: number;
    dayOfWeek: number;

    constructor(workDay: string, arrival: string, departure: string, week: number, dayOfWeek: number) {
        this.workDay = new Date(workDay);
        this.arrival = arrival;
        this.departure = departure;
        this.week = week;
        this.dayOfWeek = dayOfWeek;
    }

    public static createDayEntryByEntryObject(entryObject: EntryType): DayEntry {
        return new DayEntry(
            entryObject.workDay,
            entryObject.arrival,
            entryObject.departure,
            entryObject.week,
            entryObject.dayOfWeek
        );
    }
}