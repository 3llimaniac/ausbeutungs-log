const API_BASE_ENTRY_URL: string = "http://localhost:3000/api";
const API_HOLIDAY_URL: string = "https://get.api-feiertage.de/?years=2024&states=by";

interface ApiConfig {
    USER: string
    ENTRY: string
    ABSENCE: string
    ABSENCES: string
    STATS: string,
    HOLIDAY: string
}

const apiConfig: ApiConfig = {
    USER: `${API_BASE_ENTRY_URL}/user`,
    ENTRY: `${API_BASE_ENTRY_URL}/entry`,
    ABSENCE: `${API_BASE_ENTRY_URL}/entry/absence`,
    ABSENCES: `${API_BASE_ENTRY_URL}/entry/absences`,
    STATS: `${API_BASE_ENTRY_URL}/entry/stats`,
    HOLIDAY: API_HOLIDAY_URL
}

export default apiConfig;