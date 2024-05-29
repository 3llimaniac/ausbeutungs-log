interface ErrorMapEntry {
    invalidField: 'invalidUsername' | 'invalidPassword';
    message: string;
}

export const errorMap: { [key: string]: ErrorMapEntry } = {
    'User not found': {
        invalidField: 'invalidUsername',
        message: 'Benutzer konnte nicht gefunden werden'
    },
    'User already exists with this username': {
        invalidField: 'invalidUsername',
        message: 'Benutzername bereits vergeben'
    },
    'Invalid password': {
        invalidField: 'invalidPassword',
        message: 'Falsches Passwort'
    }
};