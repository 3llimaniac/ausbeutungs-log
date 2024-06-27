export enum Reason {
    Krankheit = 'Krankheit',
    Urlaub = 'Urlaub',
    Termin = 'Termin',
    Sonstiges = 'Sonstiges'
}

export interface EntryType {
    workDay: string
}

export class Entry {
    workDay: Date;

    constructor(workDay: string) {
        this.workDay = new Date(workDay);
    }

    public static createEntryByObject(entryObject: EntryType) {
        return new Entry(entryObject.workDay);
    }
}

export interface DayEntryType {
    workDay: string,
    arrival: string,
    departure: string,
}

export class DayEntry extends Entry {
    arrival: string;
    departure: string;

    constructor(workDay: string, arrival: string, departure: string) {
        super(workDay);
        this.arrival = arrival;
        this.departure = departure;
    }

    public static createDayEntryByObject(entryObject: DayEntryType): DayEntry {
        return new DayEntry(
            entryObject.workDay,
            entryObject.arrival,
            entryObject.departure,
        );
    }

    public static isDayEntry(entry: Entry): boolean {
        return entry instanceof DayEntry;
    }
}

export interface AbsenceEntryType {
    workDay: string,
    reason: string;
}

export class AbsenceEntry extends Entry {
    reason: Reason;

    constructor(workDay: string, reason: Reason) {
        super(workDay);
        this.reason = reason;
    }

    public static createAbsenceEntryByObject(entryObject: AbsenceEntryType) {
        return new AbsenceEntry(
            entryObject.workDay,
            entryObject.reason as Reason
        );
    }

    public static isAbsenceEntry(entry: Entry): boolean {
        return entry instanceof AbsenceEntry;
    }
}